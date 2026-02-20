import React, { useState, useCallback, useRef } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { getTaraweehDay, getPhaseInfo, getJuzProgress } from '../data/taraweehPlanData';
import SawabBadge from './SawabBadge';
import { getSawab } from '../data/sawabData';
import { useToast } from './Toast';
import {
    Moon, BookOpen, Sparkles, CheckCircle, ChevronDown, ChevronUp,
    Target, MessageCircle, Pen, Star, Flame, Heart
} from 'lucide-react';

/**
 * TaraweehGuide — 30-day guided Taraweeh experience
 * Preview: tonight's juz themes, keywords, ayah, small amol
 * Reflect: post-taraweeh reflection + tomorrow's niyyah
 */
const TaraweehGuide = ({ ramadanDay, taraweehData, tarawihRakats, onUpdate, onTarawihUpdate }) => {
    const { language } = useApp();
    const { showToast } = useToast();
    const t = (key) => translations[language][key] || key;

    const [previewOpen, setPreviewOpen] = useState(true);
    const [reflectOpen, setReflectOpen] = useState(true);

    const dayPlan = getTaraweehDay(ramadanDay);
    const phaseInfo = dayPlan ? getPhaseInfo(dayPlan.phase, language) : null;
    const juzProgress = getJuzProgress(ramadanDay);

    const data = {
        previewSeen: taraweehData?.previewSeen || false,
        reflectionDone: taraweehData?.reflectionDone || false,
        reflectionNote: taraweehData?.reflectionNote || '',
        tomorrowNiyyah: taraweehData?.tomorrowNiyyah || '',
        amolDone: taraweehData?.amolDone || false,
        selectedTheme: taraweehData?.selectedTheme || ''
    };

    const saveTimerRef = useRef(null);

    const handleUpdate = useCallback((field, value) => {
        onUpdate({ ...taraweehData, [field]: value });

        // Visual feedback for functional tasks
        if (field === 'selectedTheme' && value) {
            showToast(language === 'bn' ? 'ইবাদতের ফোকাস সেট করা হয়েছে! +২ পয়েন্ট' : 'Focus set! +2 progress pts', 'success');
        } else if (field === 'previewSeen' && value) {
            showToast(language === 'bn' ? 'প্রিভিউ সম্পন্ন! +১ পয়েন্ট' : 'Preview seen! +1 progress pt', 'success');
        } else if (field === 'amolDone' && value) {
            showToast(language === 'bn' ? 'আমল কবুল হোক! ইনশাআল্লাহ' : 'Deed recorded! InshaAllah', 'success');
        }
    }, [taraweehData, onUpdate, language, showToast]);

    const handleTextChange = useCallback((field, value) => {
        onUpdate({ ...taraweehData, [field]: value });
    }, [taraweehData, onUpdate]);

    if (!dayPlan) return null;

    const lang = language;
    const themes = dayPlan.themes[lang] || dayPlan.themes.en;
    const keyWords = dayPlan.keyWords[lang] || dayPlan.keyWords.en;
    const ayah = dayPlan.featuredAyah[lang] || dayPlan.featuredAyah.en;
    const amol = dayPlan.smallAmol[lang] || dayPlan.smallAmol.en;
    const reflQ = dayPlan.reflectionQ[lang] || dayPlan.reflectionQ.en;
    const uxTask = dayPlan.uxTask[lang] || dayPlan.uxTask.en;

    const juzSummary = dayPlan.juzSummary ? (dayPlan.juzSummary[lang] || dayPlan.juzSummary.en) : null;
    const extraAyats = dayPlan.extraAyats || [];

    const phaseColors = {
        intensive: { bg: 'from-orange-500 to-amber-600', badge: 'bg-orange-100 text-orange-700', border: 'border-orange-200' },
        steady: { bg: 'from-indigo-500 to-blue-600', badge: 'bg-blue-100 text-blue-700', border: 'border-blue-200' },
        buffer: { bg: 'from-purple-500 to-violet-600', badge: 'bg-purple-100 text-purple-700', border: 'border-purple-200' }
    };
    const pc = phaseColors[dayPlan.phase] || phaseColors.steady;

    const tarawihSawab = getSawab('tarawih', language);

    return (
        <section className="card !p-0 overflow-hidden border-transparent bg-white shadow-xl shadow-indigo-100/50">

            {/* ── HEADER ── */}
            <div className={`bg-gradient-to-r ${pc.bg} p-6 sm:p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Moon className="w-5 h-5" />
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight">{t('taraweehGuide')}</h2>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
                                {phaseInfo?.emoji} {phaseInfo?.label}
                            </span>
                            <span className="text-white/70 text-xs font-medium">{phaseInfo?.desc}</span>
                        </div>
                    </div>

                    {/* Juz Badge */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="min-h-[4.5rem] min-w-[5rem] px-5 py-3 rounded-3xl bg-white/20 backdrop-blur-md flex flex-col items-center justify-center shadow-xl border border-white/10 text-center">
                            <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1.5 leading-none">
                                {t('tonightsJuz')}
                            </span>
                            <span className={`
                                ${dayPlan.juz.length > 12 ? 'text-xs' : dayPlan.juz.length > 6 ? 'text-sm' : 'text-3xl'} 
                                font-black leading-tight tracking-tight
                            `}>
                                {(() => {
                                    if (lang !== 'bn') return dayPlan.juz.replace(' to ', '–');

                                    // Translate to Pure Bangla
                                    const bnNums = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
                                    let juzBn = dayPlan.juz
                                        .replace(/Juz/g, 'পারা')
                                        .replace(/to/g, 'থেকে')
                                        .replace(/mid-/g, 'অর্ধেক-')
                                        .replace(/\d/g, m => bnNums[m]);

                                    // Clean up common patterns for better readability in Bengali
                                    if (juzBn.includes('অর্ধেক-পারা')) {
                                        juzBn = juzBn.replace(/অর্ধেক-পারা (\S+)/g, 'পারা $1 (অর্ধেক)');
                                    }

                                    return juzBn.replace(' থেকে ', '–');
                                })()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Mini Progress Tracker */}
                <div className="mt-8 relative z-10">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-white/80">{t('juzProgress')}</span>
                        <span className="font-black">{juzProgress.completed}/{juzProgress.total}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white/80 rounded-full transition-all duration-700"
                            style={{ width: `${juzProgress.percent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="p-5 sm:p-8 space-y-5">

                {/* ── TARAWIH RAKAT SLIDER ── */}
                <div className={`p-5 sm:p-6 rounded-2xl transition-all border-2 ${tarawihRakats > 0
                    ? 'bg-indigo-50 border-indigo-100 shadow-inner'
                    : 'bg-slate-50 border-slate-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🕌</span>
                            <div>
                                <h3 className="font-black text-slate-800 text-sm sm:text-base">{t('tarawih')}</h3>
                                <p className="text-xs text-slate-400 font-medium">
                                    {tarawihRakats > 0
                                        ? `${tarawihRakats} ${t('rakats')}`
                                        : (lang === 'bn' ? 'আজ রাতে তারাবীহ পড়েছেন?' : 'Did you pray Taraweeh tonight?')}
                                </p>
                            </div>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl ${tarawihRakats > 0 ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-300 border-2 border-slate-100'}`}>
                            {tarawihRakats}
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0" max="20" step="2"
                        value={tarawihRakats}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            onTarawihUpdate(val);
                            if (val > 0) showToast(language === 'bn' ? `${val} রাকাত তারাবীহ সেট করা হয়েছে! +১০ পয়েন্ট` : `Set ${val} Rakats! +10 progress pts`, 'success');
                        }}
                        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-1 px-0.5">
                        <span>0</span><span>8</span><span>12</span><span>20</span>
                    </div>

                    {tarawihRakats > 0 && tarawihSawab && (
                        <SawabBadge reward={tarawihSawab.reward} source={tarawihSawab.source} detail={tarawihSawab.detail} color="indigo" />
                    )}
                </div>

                {/* ── UX TASK ── */}
                <div className={`p-4 rounded-xl ${pc.badge} flex items-start gap-3`}>
                    <Target className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5 opacity-60">
                            {lang === 'bn' ? 'আজকের টাস্ক' : 'Today\'s Task'}
                        </p>
                        <p className="text-xs sm:text-sm font-bold">{uxTask}</p>
                    </div>
                </div>

                {/* ── PREVIEW CARD ── */}
                <div className="rounded-2xl border-2 border-indigo-100 overflow-hidden">
                    <button
                        onClick={() => {
                            setPreviewOpen(!previewOpen);
                            if (!data.previewSeen) handleUpdate('previewSeen', true);
                        }}
                        className="w-full flex items-center justify-between p-4 sm:p-5 bg-indigo-50/50 hover:bg-indigo-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-200">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-black text-slate-800 text-sm">{t('tonightsPreview')}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    {lang === 'bn' ? '৫ মিনিটে জানুন' : '5 min overview'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {data.previewSeen && (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                            {previewOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                        </div>
                    </button>

                    {previewOpen && (
                        <div className="p-4 sm:p-5 space-y-6 bg-white border-t border-indigo-50">

                            {/* Juz Summary */}
                            {juzSummary && (
                                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5" /> {t('juzSummaryLabel')}
                                    </h4>
                                    <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic">
                                        "{juzSummary}"
                                    </p>
                                </div>
                            )}

                            {/* Themes */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                                        <Flame className="w-3.5 h-3.5" /> {t('themes')}
                                    </h4>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                        {t('themeFocusLabel')}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {themes.map((theme, i) => {
                                        const isSelected = data.selectedTheme === theme;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleUpdate('selectedTheme', isSelected ? '' : theme)}
                                                className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 border-2 ${isSelected
                                                    ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-200 scale-105 active:scale-95'
                                                    : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 active:scale-95'
                                                    }`}
                                            >
                                                {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                                <span>{theme}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Key Words */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5" /> {t('keyWordsLabel')}
                                </h4>
                                <div className="flex gap-2">
                                    {keyWords.map((word, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Ayah */}
                            <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl p-5 border border-emerald-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <BookOpen className="w-12 h-12" />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-3 flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5" /> {t('featuredAyah')}
                                </h4>
                                <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed mb-3 relative z-10">
                                    ❝ {ayah.text} ❞
                                </p>
                                <p className="text-[11px] font-black text-emerald-600">
                                    — {ayah.surah} ({ayah.ayahNum})
                                </p>
                            </div>

                            {/* Extra Ayats */}
                            {extraAyats.length > 0 && (
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3 flex items-center gap-1.5">
                                        <Target className="w-3.5 h-3.5" /> {t('extraAyatsLabel')}
                                    </h4>
                                    <div className="space-y-3">
                                        {extraAyats.map((ex, i) => {
                                            const exAyah = ex[lang] || ex.en;
                                            return (
                                                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-white transition-colors">
                                                    <p className="text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                                                        {exAyah.text}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400">
                                                        {exAyah.surah} ({exAyah.ayahNum})
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Small Amol */}
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-100">
                                <Heart className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">{t('smallAmol')}</h4>
                                    <p className="text-xs font-bold text-rose-700">{amol}</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleUpdate('amolDone', !data.amolDone); }}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${data.amolDone
                                        ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                                        : 'bg-white border-2 border-rose-200 text-rose-300'}`}
                                >
                                    <CheckCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── REFLECT CARD ── (shows when tarawih > 0) */}
                {tarawihRakats > 0 && (
                    <div className="rounded-2xl border-2 border-purple-100 overflow-hidden">
                        <button
                            onClick={() => setReflectOpen(!reflectOpen)}
                            className="w-full flex items-center justify-between p-4 sm:p-5 bg-purple-50/50 hover:bg-purple-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-md shadow-purple-200">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-slate-800 text-sm">{t('reflectTitle')}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        {lang === 'bn' ? 'তারাবীহের পর ২ মিনিট' : '2 min after Taraweeh'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {data.reflectionDone && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                {reflectOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            </div>
                        </button>

                        {reflectOpen && (
                            <div className="p-4 sm:p-5 space-y-4 bg-white border-t border-purple-50">

                                {/* Reflection Question */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5" /> {t('reflectionQuestion')}
                                    </h4>
                                    <p className="text-sm font-bold text-purple-700 bg-purple-50 p-3 rounded-xl border border-purple-100 mb-3">
                                        {reflQ}
                                    </p>

                                    {/* Show Selected Theme as reminder */}
                                    {data.selectedTheme && (
                                        <div className="flex items-center gap-2 mb-4 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                                            <Flame className="w-4 h-4 text-indigo-500" />
                                            <span className="text-xs font-black text-indigo-700 uppercase tracking-wide">{t('themeSelectionReflection')}</span>
                                            <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-black rounded-lg shadow-sm">{data.selectedTheme}</span>
                                        </div>
                                    )}

                                    <textarea
                                        value={data.reflectionNote}
                                        onChange={(e) => handleTextChange('reflectionNote', e.target.value)}
                                        onBlur={() => { if (data.reflectionNote.trim()) handleUpdate('reflectionDone', true); }}
                                        placeholder={t('reflectionNotePlaceholder')}
                                        className="w-full p-3 rounded-xl border-2 border-purple-100 text-sm font-medium text-slate-700 placeholder:text-slate-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                                        rows={2}
                                    />
                                </div>

                                {/* Tomorrow's Niyyah */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-1.5">
                                        <Pen className="w-3.5 h-3.5" /> {t('tomorrowNiyyah')}
                                    </h4>
                                    <textarea
                                        value={data.tomorrowNiyyah}
                                        onChange={(e) => handleTextChange('tomorrowNiyyah', e.target.value)}
                                        placeholder={t('niyyahPlaceholder')}
                                        className="w-full p-3 rounded-xl border-2 border-amber-100 text-sm font-medium text-slate-700 placeholder:text-slate-300 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── 30-DAY JUZ PILLS ── */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" />
                        {lang === 'bn' ? '৩০ দিনের জুজ ট্র্যাকার' : '30-Day Juz Tracker'}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
                            const isToday = d === ramadanDay;
                            const isPast = d < ramadanDay;
                            const isBuffer = d >= 28;
                            return (
                                <div
                                    key={d}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${isToday
                                        ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200 scale-110 ring-2 ring-indigo-300'
                                        : isPast
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : isBuffer
                                                ? 'bg-purple-50 text-purple-400 border border-purple-100'
                                                : 'bg-slate-50 text-slate-300 border border-slate-100'
                                        }`}
                                    title={`Day ${d}`}
                                >
                                    {d}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TaraweehGuide;
