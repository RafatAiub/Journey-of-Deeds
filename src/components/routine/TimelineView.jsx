import React from 'react';
import { timeToMinutes } from '../../utils/routineAnalytics';
import { useApp } from '../../utils/AppContext';
import { translations } from '../../utils/language';

const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
};

const TimelineView = ({ blocks, gaps, onEditBlock, onToggleComplete }) => {
    const { language } = useApp();
    const t = (key) => translations[language]?.[key] || translations['en'][key] || key;

    const getCategoryLabel = (cat) => {
        if (!cat) return '';
        return t('cat' + cat.charAt(0).toUpperCase() + cat.slice(1));
    };

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
                                <div className="w-12 flex flex-col items-end text-rose-400/80 shrink-0">
                                    <span className="text-[11px] font-medium">{item.startTime}</span>
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

                    return (
                        <div key={item.id} className="flex gap-3 group">
                            <div className="w-12 flex flex-col items-end pt-3 shrink-0">
                                <span className={`text-sm font-bold ${isDone ? 'text-slate-500' : 'text-slate-200'}`}>{item.startTime}</span>
                                <span className="text-[10px] text-slate-500 mt-0.5">{item.endTime}</span>
                            </div>

                            <div className="flex-1 relative">
                                {!isLast && (
                                    <div className={`absolute left-[-19px] top-8 bottom-[-20px] w-0.5 ${isDone ? 'bg-emerald-500/30' : 'bg-slate-700/50'} transition-colors`}></div>
                                )}
                                <div className={`absolute left-[-22px] top-4 w-2 h-2 rounded-full ring-2 ring-[#020617] ${isDone ? 'bg-emerald-400' : colorClass}`}></div>

                                <div
                                    className={`p-3.5 rounded-xl transition-all bg-slate-800/80 border flex flex-col gap-1.5 relative overflow-hidden ${isDone ? 'border-emerald-500/20 opacity-75' : 'border-slate-700/50'
                                        }`}
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isDone ? 'bg-emerald-500/50' : colorClass}`}></div>

                                    <div className="flex justify-between items-start pl-2">
                                        <div className="flex-1 cursor-pointer" onClick={() => onEditBlock(item)}>
                                            <h4 className={`font-bold text-[15px] leading-tight pr-2 ${isDone ? 'text-slate-400 line-through' : 'text-slate-100'}`}>{item.title}</h4>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-[11px] font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700">
                                                {formatDuration(item.duration)}
                                            </span>
                                            {/* Complete checkbox */}
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
                                        <p className={`text-xs italic pl-2 leading-snug ${isDone ? 'text-slate-500' : 'text-slate-400'}`}>"{item.intention}"</p>
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
