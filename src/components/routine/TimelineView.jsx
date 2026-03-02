import React, { useState, useEffect } from 'react';
import { timeToMinutes, formatTime12h, getCurrentBlock } from '../../utils/routineAnalytics';
import { useApp } from '../../utils/AppContext';
import { translations } from '../../utils/language';

const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
};

const TimelineView = ({ blocks, gaps, onEditBlock, onToggleComplete, onDeleteBlock }) => {
    const { language } = useApp();
    const t = (key) => translations[language]?.[key] || translations['en'][key] || key;
    const [currentBlockId, setCurrentBlockId] = useState(null);

    const getCategoryLabel = (cat) => {
        if (!cat) return '';
        return t('cat' + cat.charAt(0).toUpperCase() + cat.slice(1));
    };

    // Update current block every 30 seconds
    useEffect(() => {
        const update = () => {
            const current = getCurrentBlock(blocks);
            setCurrentBlockId(current?.block?.id || null);
        };
        update();
        const interval = setInterval(update, 30000);
        return () => clearInterval(interval);
    }, [blocks]);

    const timelineItems = [];

    blocks.forEach(block => {
        timelineItems.push({
            ...block,
            type: 'block',
            startMin: timeToMinutes(block.startTime),
        });
    });

    gaps.forEach(gap => {
        timelineItems.push({
            id: `gap-${gap.start}`,
            type: 'gap',
            startMin: timeToMinutes(gap.start),
            duration: gap.duration,
            startTime: gap.start,
            endTime: gap.end
        });
    });

    timelineItems.sort((a, b) => a.startMin - b.startMin);

    if (timelineItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 max-w-xs">
                    <span className="text-4xl block mb-3">🕌</span>
                    <p className="text-slate-300 font-medium text-sm mb-1">{t('designPerfectDay')}</p>
                    <p className="text-slate-500 text-xs">{t('quickStartTemplates')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-y-auto pr-1 pb-10">
            <div className="space-y-3 mt-1 mb-8">
                {timelineItems.map((item, index) => {
                    if (item.type === 'gap') {
                        return (
                            <div
                                key={item.id}
                                onClick={() => onEditBlock(item)}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="w-[70px] flex flex-col items-end text-rose-400/80 shrink-0">
                                    <span className="text-[11px] font-medium">{formatTime12h(item.startTime)}</span>
                                </div>
                                <div className="flex-1 relative">
                                    <div className="absolute left-[-19px] top-1/2 bottom-[-50%] w-0.5 border-l-2 border-dotted border-rose-500/30"></div>
                                    <div className="absolute left-[-22px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-rose-500/50 bg-[#020617] group-hover:bg-rose-500/50 transition-colors"></div>

                                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-2.5 flex justify-between items-center group-hover:bg-rose-500/20 transition-all">
                                        <span className="text-rose-400 text-xs font-semibold">{t('unplannedTime')}</span>
                                        <span className="text-rose-400/90 text-[11px] font-medium">{formatDuration(item.duration)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    const colorClass = item.colorTag || 'bg-emerald-500';
                    const isLast = index === timelineItems.length - 1;
                    const isDone = item.isCompleted;
                    const isCurrent = item.id === currentBlockId;

                    return (
                        <div key={item.id} className={`flex gap-3 group ${isCurrent ? 'relative' : ''}`} id={isCurrent ? 'current-block' : undefined}>
                            <div className="w-[70px] flex flex-col items-end pt-3 shrink-0">
                                <span className={`text-[13px] font-bold ${isCurrent ? 'text-emerald-400' : isDone ? 'text-slate-500' : 'text-slate-200'}`}>
                                    {formatTime12h(item.startTime)}
                                </span>
                                <span className="text-[10px] text-slate-500 mt-0.5">{formatTime12h(item.endTime)}</span>
                            </div>

                            <div className="flex-1 relative">
                                {!isLast && (
                                    <div className={`absolute left-[-19px] top-8 bottom-[-20px] w-0.5 ${isCurrent ? 'bg-emerald-500/50' : isDone ? 'bg-emerald-500/30' : 'bg-slate-700/50'} transition-colors`}></div>
                                )}
                                <div className={`absolute left-[-22px] top-4 w-2.5 h-2.5 rounded-full ring-2 ring-[#020617] ${isCurrent ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse' : isDone ? 'bg-emerald-400' : colorClass}`}></div>

                                <div
                                    className={`p-3.5 rounded-xl transition-all flex flex-col gap-1.5 relative overflow-hidden ${isCurrent
                                        ? 'bg-emerald-500/10 border-2 border-emerald-500/40 shadow-[0_0_20px_rgba(52,211,153,0.15)]'
                                        : isDone
                                            ? 'bg-slate-800/80 border border-emerald-500/20 opacity-75'
                                            : 'bg-slate-800/80 border border-slate-700/50'
                                        }`}
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isCurrent ? 'bg-emerald-400' : isDone ? 'bg-emerald-500/50' : colorClass}`}></div>

                                    {isCurrent && (
                                        <div className="absolute top-2 right-2">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-start pl-2">
                                        <div className="flex-1 cursor-pointer" onClick={() => onEditBlock(item)}>
                                            <h4 className={`font-bold text-[15px] leading-tight pr-2 ${isCurrent ? 'text-emerald-100' : isDone ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
                                                {item.title}
                                            </h4>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${isCurrent ? 'text-emerald-300 bg-emerald-900/50 border-emerald-500/30' : 'text-slate-400 bg-slate-900/80 border-slate-700'}`}>
                                                {formatDuration(item.duration)}
                                            </span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onToggleComplete(item.id); }}
                                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isDone
                                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                                    : 'border-slate-600 hover:border-emerald-500/50 text-transparent hover:text-emerald-500/50'
                                                    }`}
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {item.intention && (
                                        <p className={`text-xs italic pl-2 leading-snug ${isCurrent ? 'text-emerald-300/80' : isDone ? 'text-slate-500' : 'text-slate-400'}`}>"{item.intention}"</p>
                                    )}

                                    <div className="pl-2 flex items-center gap-2 flex-wrap">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md text-white/90 ${isDone ? 'bg-slate-600/50' : colorClass}`}>
                                            {getCategoryLabel(item.category)}
                                        </span>
                                        {item.focusLevel && (
                                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md border ${item.focusLevel === 'high' ? 'text-emerald-400 border-emerald-500/30' :
                                                item.focusLevel === 'medium' ? 'text-amber-400 border-amber-500/30' :
                                                    'text-slate-400 border-slate-600'
                                                }`}>
                                                {t('focus' + item.focusLevel.charAt(0).toUpperCase() + item.focusLevel.slice(1))}
                                            </span>
                                        )}
                                        {item.isFlexible && (
                                            <span className="text-[10px] text-slate-500 uppercase font-bold">⏳ {t('flexibleLbl')}</span>
                                        )}
                                    </div>

                                    {item.notes && (
                                        <p className="text-[11px] text-slate-500 pl-2 mt-0.5">📝 {item.notes}</p>
                                    )}

                                    {/* Action buttons */}
                                    <div className="pl-2 pt-1 flex items-center gap-1.5 border-t border-slate-700/30 mt-1.5">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEditBlock(item); }}
                                            className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            {t('editBlock')}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDeleteBlock(item.id); }}
                                            className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            {t('delete')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TimelineView;
