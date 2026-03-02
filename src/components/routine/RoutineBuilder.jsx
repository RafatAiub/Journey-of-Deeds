import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRoutineManager } from '../../hooks/useRoutineManager';
import TimelineView from './TimelineView';
import { routineTemplates } from '../../data/routineTemplates';
import { useApp } from '../../utils/AppContext';
import { translations } from '../../utils/language';
import { getCurrentBlock, formatTime12h } from '../../utils/routineAnalytics';

const CATEGORIES = [
    { id: 'ibadah', labelKey: 'catIbadah', color: 'bg-emerald-500' },
    { id: 'work', labelKey: 'catWork', color: 'bg-amber-500' },
    { id: 'sleep', labelKey: 'catSleep', color: 'bg-slate-600' },
    { id: 'family', labelKey: 'catFamily', color: 'bg-pink-500' },
    { id: 'personal', labelKey: 'catPersonal', color: 'bg-purple-500' },
    { id: 'study', labelKey: 'catStudy', color: 'bg-blue-500' },
    { id: 'other', labelKey: 'catOther', color: 'bg-gray-500' }
];

const FOCUS_LEVELS = [
    { id: 'high', labelKey: 'focusHigh' },
    { id: 'medium', labelKey: 'focusMedium' },
    { id: 'low', labelKey: 'focusLow' }
];

const RoutineBuilder = ({ dateStr, onClose }) => {
    const { language } = useApp();
    const t = (key) => translations[language]?.[key] || translations['en'][key] || key;

    const actualDateStr = dateStr || new Date().toISOString().split('T')[0];
    const {
        routine,
        analytics,
        loadTemplate,
        addBlock,
        updateBlock,
        deleteBlock,
        toggleComplete,
        clearAll
    } = useRoutineManager(actualDateStr);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlock, setEditingBlock] = useState(null);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'ibadah',
        startTime: '08:00',
        endTime: '09:00',
        intention: '',
        focusLevel: 'high',
        isFlexible: false,
        notes: ''
    });
    const [errorMsg, setErrorMsg] = useState('');

    // Completion stats
    const completionStats = useMemo(() => {
        if (routine.blocks.length === 0) return { completed: 0, total: 0, pct: 0 };
        const completed = routine.blocks.filter(b => b.isCompleted).length;
        return {
            completed,
            total: routine.blocks.length,
            pct: Math.round((completed / routine.blocks.length) * 100)
        };
    }, [routine.blocks]);

    // Current task tracking with live countdown
    const [currentTask, setCurrentTask] = useState(null);
    const [countdown, setCountdown] = useState('');
    const timelineRef = useRef(null);

    useEffect(() => {
        const update = () => {
            const result = getCurrentBlock(routine.blocks);
            setCurrentTask(result);
            if (result) {
                const h = Math.floor(result.remainingMinutes / 60);
                const m = result.remainingMinutes % 60;
                setCountdown(h > 0 ? `${h}h ${m}m` : `${m}m`);
            } else {
                setCountdown('');
            }
        };
        update();
        const interval = setInterval(update, 30000); // update every 30s
        return () => clearInterval(interval);
    }, [routine.blocks]);

    // Auto-scroll to current block on load
    useEffect(() => {
        if (currentTask) {
            setTimeout(() => {
                const el = document.getElementById('current-block');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }, [currentTask?.block?.id]);

    const openAddModal = (defaultTime = null) => {
        setFormData({
            title: '', category: 'ibadah',
            startTime: defaultTime?.start || '08:00',
            endTime: defaultTime?.end || '09:00',
            intention: '', focusLevel: 'high', isFlexible: false, notes: ''
        });
        setEditingBlock(null);
        setErrorMsg('');
        setIsModalOpen(true);
    };

    const openEditModal = (block) => {
        if (block.type === 'gap') {
            openAddModal({ start: block.startTime, end: block.endTime });
            return;
        }
        setFormData({ ...block });
        setEditingBlock(block);
        setErrorMsg('');
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.startTime || !formData.endTime) {
            setErrorMsg(t('fillAllFields'));
            return;
        }
        const colorTag = CATEGORIES.find(c => c.id === formData.category)?.color || 'bg-gray-500';
        const payload = { ...formData, colorTag };

        let result;
        if (editingBlock) {
            result = updateBlock(editingBlock.id, payload);
        } else {
            result = addBlock(payload);
        }

        if (result.success) {
            setIsModalOpen(false);
        } else {
            setErrorMsg(result.error === 'Time block overlaps with an existing block.' ? t('overlapError') : result.error);
        }
    };

    const handleDelete = () => {
        if (editingBlock) {
            deleteBlock(editingBlock.id);
            setIsModalOpen(false);
        }
    };

    const handleReset = () => {
        clearAll();
        setShowResetConfirm(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-white p-4 max-w-lg mx-auto relative pb-28">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                        {t('planner24h')}
                    </h2>
                    <p className="text-slate-400 text-sm">{t('designPerfectDay')}</p>
                </div>
                <div className="flex items-center gap-2">
                    {routine.blocks.length > 0 && (
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="p-2 bg-slate-800/50 hover:bg-rose-500/20 rounded-full text-slate-400 hover:text-rose-400 transition-colors text-xs"
                            title={t('resetRoutine')}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                    )}
                    {onClose && (
                        <button onClick={onClose} className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-slate-300 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{t('ibadahTime')}</p>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold text-emerald-400">{analytics.totalHours.ibadah || 0}h</span>
                        <span className="text-[10px] font-bold text-emerald-900 bg-emerald-400 px-1.5 py-0.5 rounded-full">{analytics.ibadahPercentage}%</span>
                    </div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{t('unplanned')}</p>
                    <span className={`text-xl font-bold ${analytics.unplannedHours > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                        {analytics.unplannedHours}h
                    </span>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{t('completionPct')}</p>
                    <div className="flex items-baseline gap-1.5">
                        <span className={`text-xl font-bold ${completionStats.pct >= 80 ? 'text-emerald-400' : completionStats.pct >= 50 ? 'text-amber-400' : 'text-slate-300'}`}>
                            {completionStats.pct}%
                        </span>
                        <span className="text-[10px] text-slate-500">{completionStats.completed}/{completionStats.total}</span>
                    </div>
                </div>
            </div>

            {/* Current Task Focus Banner */}
            {currentTask && !currentTask.block.isCompleted && (
                <div className="mb-5 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
                    <div className="flex items-start gap-3">
                        <div className="relative mt-0.5">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest mb-1">{t('currentlyDoing')}</p>
                            <h3 className="text-white font-bold text-lg leading-tight truncate">{currentTask.block.title}</h3>
                            {currentTask.block.intention && (
                                <p className="text-emerald-300/70 text-xs italic mt-0.5">"{currentTask.block.intention}"</p>
                            )}
                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-slate-400">
                                    {formatTime12h(currentTask.block.startTime)} — {formatTime12h(currentTask.block.endTime)}
                                </span>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                                    ⏱ {countdown} {t('remaining')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Breakdown Bar */}
            {routine.blocks.length > 0 && (
                <div className="mb-5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">{t('categoryBreakdown')}</p>
                    <div className="flex h-3 rounded-full overflow-hidden bg-slate-800">
                        {CATEGORIES.filter(c => analytics.totalHours[c.id] > 0).map(c => {
                            const pct = ((analytics.totalHours[c.id] || 0) / 24) * 100;
                            return (
                                <div
                                    key={c.id}
                                    className={`${c.color} transition-all`}
                                    style={{ width: `${pct}%` }}
                                    title={`${t(c.labelKey)}: ${analytics.totalHours[c.id]}h`}
                                />
                            );
                        })}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                        {CATEGORIES.filter(c => analytics.totalHours[c.id] > 0).map(c => (
                            <div key={c.id} className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${c.color}`}></div>
                                <span className="text-[10px] text-slate-400">{t(c.labelKey)} {analytics.totalHours[c.id]}h</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Gamification Badge */}
            {analytics.focusedDayAchieved && (
                <div className="mb-5 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/20 rounded-xl p-3.5 flex items-center gap-3 shadow-lg">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                        <span className="text-lg block">🌟</span>
                    </div>
                    <div>
                        <h4 className="text-amber-400 font-bold text-sm">{t('focusedDayAchieved')}</h4>
                        <p className="text-xs text-slate-300 mt-0.5">{t('focusedDayMsg')}</p>
                    </div>
                </div>
            )}

            {!analytics.focusedDayAchieved && (analytics.totalHours.ibadah < 1) && routine.blocks.length > 0 && (
                <div className="mb-4 bg-slate-800/50 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-3">
                    <span className="text-lg">🌿</span>
                    <p className="text-xs text-slate-400">{t('addMoreIbadah')}</p>
                </div>
            )}

            {/* Templates Quick Load */}
            {routine.blocks.length === 0 && (
                <div className="mb-5 animate-fade-in">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">{t('quickStartTemplates')}</p>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.values(routineTemplates).map(tpl => (
                            <button
                                key={tpl.id}
                                onClick={() => loadTemplate(tpl.id)}
                                className="px-3 py-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm hover:bg-slate-700 hover:border-emerald-500/50 transition-all font-medium text-slate-200 text-left"
                            >
                                <span className="block text-sm font-bold">{t(tpl.id + 'Template') || tpl.name}</span>
                                <span className="block text-[10px] text-slate-500 mt-0.5">{tpl.blocks.length} blocks</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Timeline */}
            <div className="flex-1 min-h-0">
                <TimelineView
                    blocks={routine.blocks}
                    gaps={analytics.gaps}
                    onEditBlock={openEditModal}
                    onToggleComplete={toggleComplete}
                    onDeleteBlock={deleteBlock}
                />
            </div>

            {/* FAB */}
            <button
                onClick={() => openAddModal()}
                className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white hover:scale-105 active:scale-95 transition-transform z-30 border border-emerald-400/50"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
            </button>

            {/* Reset Confirm */}
            {showResetConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#0f172a] w-full max-w-sm rounded-2xl p-6 border border-slate-800 text-center shadow-2xl">
                        <p className="text-white font-bold mb-1">{t('resetRoutine')}</p>
                        <p className="text-slate-400 text-sm mb-5">{t('resetConfirm')}</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowResetConfirm(false)} className="flex-1 bg-slate-800 text-slate-300 py-3 rounded-xl font-medium">{t('no')}</button>
                            <button onClick={handleReset} className="flex-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 py-3 rounded-xl font-medium">{t('yes')}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-[#0f172a] w-full max-w-md rounded-3xl p-6 border border-slate-800 relative shadow-2xl pb-8 max-h-[85vh] overflow-y-auto">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 transition-colors p-1 bg-slate-800/50 rounded-full">
                            ✕
                        </button>
                        <h3 className="text-xl font-bold text-white mb-5">
                            {editingBlock ? t('editBlock') : t('addTimeBlock')}
                        </h3>

                        {errorMsg && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-sm mb-4 font-medium flex items-center gap-2">
                                <span>⚠️</span> {errorMsg}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{t('activityTitle')}</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-[#1e293b] border border-slate-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                                    placeholder={t('titlePlaceholder')}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{t('categoryLbl')}</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {CATEGORIES.map(c => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, category: c.id })}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${formData.category === c.id
                                                ? `${c.color} text-white border-transparent shadow-lg`
                                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                                                }`}
                                        >
                                            {t(c.labelKey)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Times */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{t('startTime')}</label>
                                    <input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                        className="w-full bg-[#1e293b] border border-slate-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{t('endTime')}</label>
                                    <input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                                        className="w-full bg-[#1e293b] border border-slate-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            {/* Intention */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{t('intentionOpt')}</label>
                                <input
                                    type="text"
                                    value={formData.intention}
                                    onChange={e => setFormData({ ...formData, intention: e.target.value })}
                                    className="w-full bg-[#1e293b] border border-slate-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                                    placeholder={t('intentionPlaceholder')}
                                />
                            </div>

                            {/* Focus Level */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{t('focusLevelLbl')}</label>
                                <div className="flex gap-2">
                                    {FOCUS_LEVELS.map(fl => (
                                        <button
                                            key={fl.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, focusLevel: fl.id })}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${formData.focusLevel === fl.id
                                                ? fl.id === 'high' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                                                    : fl.id === 'medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                                                        : 'bg-slate-600/20 text-slate-300 border-slate-500/50'
                                                : 'bg-slate-800 text-slate-500 border-slate-700'
                                                }`}
                                        >
                                            {t(fl.labelKey)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Flexible toggle */}
                            <div className="flex items-center justify-between bg-[#1e293b] rounded-xl p-3 border border-slate-700/50">
                                <span className="text-xs font-medium text-slate-300">{t('flexibleLbl')}</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isFlexible: !formData.isFlexible })}
                                    className={`relative w-10 h-5 rounded-full transition-colors ${formData.isFlexible ? 'bg-emerald-500' : 'bg-slate-600'}`}
                                >
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.isFlexible ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                </button>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{t('notesLbl')}</label>
                                <textarea
                                    value={formData.notes || ''}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    rows={2}
                                    className="w-full bg-[#1e293b] border border-slate-700/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-600 resize-none text-sm"
                                    placeholder={t('notesPlaceholder')}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                {editingBlock && (
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 bg-rose-500/10 text-rose-500 border border-rose-500/30 py-3 rounded-xl font-medium hover:bg-rose-500/20 transition-all"
                                    >
                                        {t('delete')}
                                    </button>
                                )}
                                <button
                                    onClick={handleSave}
                                    className={`${editingBlock ? 'flex-[2]' : 'w-full'} bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-all`}
                                >
                                    {t('saveBlock')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoutineBuilder;
