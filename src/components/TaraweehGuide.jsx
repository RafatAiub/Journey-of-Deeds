import React, { useState, useCallback, useRef } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { getTaraweehDay, getPhaseInfo, getJuzProgress } from '../data/taraweehPlanData';
import SawabBadge from './SawabBadge';
import { getSawab } from '../data/sawabData';
import { useToast } from './Toast';
import {
    Moon, BookOpen, Sparkles, CheckCircle, ChevronDown, ChevronUp,
    Target, MessageCircle, Pen, Star, Flame, Heart, FileText, ExternalLink, Info, Calendar as CalendarIcon
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
    const lang = language;

    const [previewOpen, setPreviewOpen] = useState(true);
    const [reflectOpen, setReflectOpen] = useState(true);

    // Exact page mapping from Shaykh Ahmadullah's TOC photos
    const taraweehPdfPages = {
        1: 7, 2: 12, 3: 18, 4: 24, 5: 29, 6: 34, 7: 39, 8: 43, 9: 47, 10: 52,
        11: 56, 12: 62, 13: 68, 14: 73, 15: 80, 16: 87, 17: 92, 18: 97, 19: 103, 20: 109,
        21: 114, 22: 120, 23: 125, 24: 133, 25: 140, 26: 147, 27: 153
    };

    const getTargetPdfPage = (day) => {
        // ramadanDay in the app is 1-indexed for the component logic usually, 
        // but let's be careful. if ramadanDay=1 is 1st Taraweeh...
        return taraweehPdfPages[day] || (7 + (day - 1) * 5); // Fallback to formula
    };

    const targetPage = getTargetPdfPage(ramadanDay);

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


    const themes = dayPlan.themes[lang] || dayPlan.themes.en;
    const keyWords = dayPlan.keyWords[lang] || dayPlan.keyWords.en;
    const ayah = dayPlan.featuredAyah[lang] || dayPlan.featuredAyah.en;
    const amol = dayPlan.smallAmol[lang] || dayPlan.smallAmol.en;
    const reflQ = dayPlan.reflectionQ[lang] || dayPlan.reflectionQ.en;
    const uxTask = dayPlan.uxTask[lang] || dayPlan.uxTask.en;

    const juzSummary = dayPlan.juzSummary ? (dayPlan.juzSummary[lang] || dayPlan.juzSummary.en) : null;
    const extraAyats = dayPlan.extraAyats || [];

    const phaseStyles = {
        intensive: {
            header: 'from-amber-900 via-orange-900 to-stone-900',
            accent: 'text-amber-400',
            badge: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
            glow: 'shadow-amber-500/20',
            iconBg: 'bg-amber-500',
            button: 'border-amber-100 bg-amber-50/50 hover:bg-amber-50',
            pills: {
                current: 'bg-amber-500 shadow-amber-200 ring-amber-300',
                past: 'bg-amber-100 text-amber-700',
                future: 'bg-stone-50 text-stone-300 border-stone-100'
            }
        },
        steady: {
            header: 'from-teal-950 via-emerald-900 to-slate-900',
            accent: 'text-emerald-400',
            badge: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
            glow: 'shadow-emerald-500/20',
            iconBg: 'bg-emerald-600',
            button: 'border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50',
            pills: {
                current: 'bg-emerald-500 shadow-emerald-200 ring-emerald-300',
                past: 'bg-teal-100 text-teal-700',
                future: 'bg-slate-50 text-slate-300 border-slate-100'
            }
        },
        buffer: {
            header: 'from-indigo-950 via-purple-900 to-slate-950',
            accent: 'text-purple-300',
            badge: 'bg-purple-400/10 text-purple-200 border-purple-400/20',
            glow: 'shadow-purple-500/20',
            iconBg: 'bg-purple-600',
            button: 'border-purple-100 bg-purple-50/50 hover:bg-purple-50',
            pills: {
                current: 'bg-purple-600 shadow-purple-200 ring-purple-300',
                past: 'bg-indigo-100 text-indigo-700',
                future: 'bg-slate-50 text-slate-300 border-slate-100'
            }
        }
    };
    const ps = phaseStyles[dayPlan.phase] || phaseStyles.steady;

    const tarawihSawab = getSawab('tarawih', language);

    return (
        <section className={`card !p-0 overflow-hidden border-transparent bg-white shadow-2xl ${ps.glow} transition-all duration-700`}>

            {/* ── SACRED HEADER ── */}
            <div className={`bg-gradient-to-br ${ps.header} p-7 sm:p-10 text-white relative overflow-hidden group`}>
                {/* Decorative Holy Patterns */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <pattern id="holy-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="0.5" fill="white" fillOpacity="0.2" />
                        </pattern>
                        <rect x="0" y="0" width="100" height="100" fill="url(#holy-grid)" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <Moon className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">{t('taraweehGuide')}</h2>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <span className={`px-4 py-1.5 rounded-full backdrop-blur-xl border font-bold text-xs uppercase tracking-widest ${ps.badge} animate-pulse`}>
                                {phaseInfo?.emoji} {phaseInfo?.label}
                            </span>
                            <span className="text-white/60 text-[10px] sm:text-xs font-bold bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                                {phaseInfo?.desc}
                            </span>
                        </div>
                    </div>

                    {/* Juz Medallion */}
                    <div className="relative group/juz">
                        <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] blur-xl group-hover/juz:bg-white/30 transition-all duration-500" />
                        <div className="relative min-h-[5.5rem] min-w-[7rem] px-6 py-4 rounded-[2.5rem] bg-stone-900/40 backdrop-blur-2xl flex flex-col items-center justify-center shadow-2xl border-2 border-white/20 text-center ring-4 ring-white/5 mx-auto">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 leading-none drop-shadow-sm ${ps.accent}`}>
                                {t('tonightsJuz')}
                            </span>
                            <span className={`
                                ${dayPlan.juz.length > 20 ? 'text-[10px]' : dayPlan.juz.length > 12 ? 'text-xs' : dayPlan.juz.length > 6 ? 'text-base' : 'text-3xl sm:text-4xl'} 
                                font-black leading-tight tracking-tighter text-white drop-shadow-lg
                            `}>
                                {(() => {
                                    if (lang !== 'bn') return dayPlan.juz.replace(' to ', '–');
                                    const bnNums = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
                                    let juzBn = dayPlan.juz.replace(/Juz/g, 'পারা').replace(/to/g, 'থেকে').replace(/mid-/g, 'অর্ধেক-').replace(/\d/g, m => bnNums[m]);
                                    if (juzBn.includes('অর্ধেক-পারা')) juzBn = juzBn.replace(/অর্ধেক-পারা (\S+)/g, 'পারা $1 (অর্ধেক)');
                                    return juzBn.replace(' থেকে ', '–');
                                })()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar with Glow */}
                <div className="mt-10 relative z-10 px-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-2 px-1">
                        <span className="text-white/70">{t('juzProgress')}</span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-emerald-300">{juzProgress.completed}/{juzProgress.total}</span>
                        </div>
                    </div>
                    <div className="h-2.5 bg-black/30 rounded-full p-0.5 overflow-hidden backdrop-blur-sm border border-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                            style={{ width: `${juzProgress.percent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-10 space-y-8 bg-gradient-to-b from-white to-slate-50/50">

                {/* ── TARAWIH RAKAT CONTROLLER ── */}
                <div className={`p-6 sm:p-8 rounded-[2.5rem] transition-all duration-500 border-2 ${tarawihRakats > 0
                    ? 'bg-gradient-to-br from-indigo-50/50 to-white border-indigo-100 shadow-xl shadow-indigo-100/20'
                    : 'bg-slate-50/40 border-slate-100/50'}`}>
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner transition-all transform hover:rotate-12 ${tarawihRakats > 0 ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                                🕌
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 text-base sm:text-lg tracking-tight">{t('tarawih')}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                                    {tarawihRakats > 0
                                        ? `${tarawihRakats} ${t('rakats')}`
                                        : (lang === 'bn' ? 'আজ রাতের ইবাদত' : 'Tonight\'s Worship')}
                                </p>
                            </div>
                        </div>
                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center font-black text-4xl transition-all duration-500 ${tarawihRakats > 0 ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200' : 'bg-white text-slate-300 border-2 border-slate-100'}`}>
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
                            if (val > 0) showToast(language === 'bn' ? `${val} রাকাত তারাবীহ সেট করা হয়েছে! মাশাআল্লাহ` : `Set ${val} Rakats! MashaAllah`, 'success');
                        }}
                        className="w-full h-2.5 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2 shadow-inner"
                    />
                    <div className="flex justify-between text-[11px] font-black text-slate-300 mt-2 px-1 tracking-widest">
                        <span>0</span><span>8</span><span>12</span><span>20</span>
                    </div>

                    {tarawihRakats > 0 && tarawihSawab && (
                        <div className="mt-5 transform hover:scale-[1.02] transition-transform">
                            <SawabBadge reward={tarawihSawab.reward} source={tarawihSawab.source} detail={tarawihSawab.detail} color="indigo" />
                        </div>
                    )}
                </div>

                {/* ── DAILY MISSION ── */}
                <div className={`p-5 rounded-3xl ${ps.badge} border flex items-center gap-4 hover:scale-[1.01] transition-all cursor-default`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${ps.iconBg} text-white shadow-lg`}>
                        <Target className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 opacity-60">
                            {lang === 'bn' ? 'আজকের লক্ষ্য' : 'Today\'s Mission'}
                        </p>
                        <p className="text-sm sm:text-base font-black text-slate-800 tracking-tight">{uxTask}</p>
                    </div>
                </div>

                {/* ── PREVIEW INTERACTIVE ── */}
                <div className="rounded-[2.5rem] border-2 border-slate-100 overflow-hidden bg-white hover:border-indigo-100 transition-all shadow-sm">
                    <button
                        onClick={() => {
                            setPreviewOpen(!previewOpen);
                            if (!data.previewSeen) handleUpdate('previewSeen', true);
                        }}
                        className={`w-full flex items-center justify-between p-6 sm:p-7 transition-all ${previewOpen ? 'bg-indigo-50/30' : 'bg-white'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${previewOpen ? 'bg-indigo-600 text-white rotate-6' : 'bg-indigo-100 text-indigo-600'}`}>
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-black text-slate-800 text-base">{t('tonightsPreview')}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                                    {lang === 'bn' ? 'কুরআনের মূল থিম ও সারাংশ' : 'Quranic Themes & Summary'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {data.previewSeen && (
                                <div className="bg-emerald-100 p-1.5 rounded-full animate-fade-in">
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                </div>
                            )}
                            {previewOpen ? <ChevronUp className="w-6 h-6 text-slate-300" /> : <ChevronDown className="w-6 h-6 text-slate-300" />}
                        </div>
                    </button>

                    {previewOpen && (
                        <div className="p-6 sm:p-8 space-y-8 bg-white border-t border-slate-50 animate-fade-in">

                            {/* Juz Summary Medallion */}
                            {juzSummary && (
                                <div className="p-6 rounded-[2rem] bg-indigo-50/40 border-2 border-indigo-100/50 relative overflow-hidden">
                                    <Sparkles className="absolute top-4 right-4 w-6 h-6 text-indigo-200 opacity-50" />
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-3 flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4" /> {t('juzSummaryLabel')}
                                    </h4>
                                    <p className="text-sm sm:text-base font-bold text-slate-700 leading-relaxed italic border-l-4 border-indigo-400 pl-4">
                                        "{juzSummary}"
                                    </p>
                                </div>
                            )}

                            {/* Interactive Themes Selection */}
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-6 rounded-full ${ps.iconBg}`} />
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">
                                            {t('themes')}
                                        </h4>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Sparkles className="w-3 h-3 text-amber-400" />
                                        {t('themeFocusLabel')}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {themes.map((theme, i) => {
                                        const isSelected = data.selectedTheme === theme;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleUpdate('selectedTheme', isSelected ? '' : theme)}
                                                className={`group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-[1.2rem] sm:rounded-[1.5rem] text-xs sm:text-sm font-black transition-all duration-500 border-2 ${isSelected
                                                    ? `${ps.iconBg} text-white border-transparent shadow-2xl scale-105 z-10`
                                                    : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:text-slate-800'
                                                    }`}
                                            >
                                                {isSelected ? (
                                                    <div className="bg-white/20 p-1 rounded-lg">
                                                        <CheckCircle className="w-4 h-4 text-white" />
                                                    </div>
                                                ) : (
                                                    <div className={`w-2.5 h-2.5 rounded-full bg-slate-200 group-hover:scale-125 transition-transform`} />
                                                )}
                                                <span className="tracking-tight">{theme}</span>
                                                {isSelected && (
                                                    <span className="absolute -top-2 -right-2 flex h-4 w-4">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-white/30"></span>
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* PDF Summary Feature - SMART LINK (NEW TAB) */}
                            <div className="space-y-3">
                                <a
                                    href={`${import.meta.env.BASE_URL}taraweeh_master.pdf#page=${targetPage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full group relative p-6 rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden shadow-2xl hover:scale-[1.02] transition-all cursor-pointer block text-left border border-white/5 no-underline"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform">
                                        <FileText className="w-24 h-24" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                                    <FileText className="w-5 h-5 text-amber-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
                                                        {t('pdfSummaryLabel')}
                                                    </h4>
                                                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-0.5">
                                                        {lang === 'bn' ? 'শায়খ আহমাদুল্লাহ' : 'by Shaykh Ahmadullah'}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Explicit Page Badge for Mobile Users */}
                                            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md">
                                                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest mr-1.5">{t('pdfPageLabel')}</span>
                                                <span className="text-sm font-black text-white">{targetPage}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-base sm:text-xl font-black mb-4 pr-12 leading-tight">
                                            {t('viewChapterPdf')}
                                        </h3>

                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-indigo-600 group-hover:bg-indigo-500 w-fit px-5 py-2.5 rounded-full shadow-lg shadow-indigo-900/50 transition-all">
                                            {t('openPdfSummary')} <ExternalLink className="w-3.5 h-3.5 ml-1" />
                                        </div>
                                    </div>
                                </a>
                                <p className="text-[10px] sm:text-xs text-slate-400 font-bold text-center px-4 leading-relaxed">
                                    <Info className="w-3 h-3 inline mr-1 mb-0.5" />
                                    {t('pdfInstruction')}
                                </p>
                            </div>

                            {/* Keywords Grid */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-3 flex items-center gap-2">
                                    <Star className="w-4 h-4" /> {t('keyWordsLabel')}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {keyWords.map((word, i) => (
                                        <span key={i} className="px-4 py-2 rounded-xl bg-amber-50/50 text-amber-700 text-xs font-black border border-amber-100/50 shadow-sm">
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Ayah - High Design */}
                            <div className="bg-stone-50 rounded-[2rem] p-7 border-2 border-stone-100 relative group/ayah">
                                <div className="absolute top-0 right-0 p-5 opacity-[0.03] group-hover/ayah:scale-110 transition-transform">
                                    <Moon className="w-24 h-24" />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-5 flex items-center gap-2">
                                    {t('featuredAyah')}
                                </h4>
                                <div className="relative z-10">
                                    <p className="text-lg sm:text-xl font-serif font-bold text-stone-800 leading-snug mb-5 tracking-tight">
                                        “{ayah.text}”
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center font-black text-[10px]">
                                            📖
                                        </div>
                                        <p className="text-xs font-black text-stone-500 uppercase tracking-widest">
                                            {ayah.surah} • {ayah.ayahNum}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Extra Ayats Accordion-style */}
                            {extraAyats.length > 0 && (
                                <div className="pt-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mb-4 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                                        {t('extraAyatsLabel')}
                                    </h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {extraAyats.map((ex, i) => {
                                            const exAyah = ex[lang] || ex.en;
                                            return (
                                                <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-lg hover:shadow-indigo-50 transition-all group">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-indigo-200 mt-2 group-hover:bg-indigo-500 transition-colors" />
                                                        <div>
                                                            <p className="text-xs sm:text-sm font-bold text-slate-700 mb-2 leading-relaxed">
                                                                {exAyah.text}
                                                            </p>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                                {exAyah.surah} • {exAyah.ayahNum}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Actionable Deed Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-[2rem] bg-rose-50 border-2 border-rose-100 shadow-xl shadow-rose-100/20">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center text-4xl shadow-inner flex-shrink-0 border border-rose-100">
                                    ❤️
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-1">{t('smallAmol')}</h4>
                                    <p className="text-sm sm:text-base font-black text-rose-900 tracking-tight">{amol}</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleUpdate('amolDone', !data.amolDone); }}
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95 ${data.amolDone
                                        ? 'bg-rose-500 text-white shadow-rose-200'
                                        : 'bg-white border-2 border-rose-200 text-rose-300'}`}
                                >
                                    <CheckCircle className="w-7 h-7" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── REFLECTION HIGHLIGHT ── */}
                {tarawihRakats > 0 && (
                    <div className="rounded-[2.5rem] border-2 border-slate-100 overflow-hidden bg-white hover:border-purple-200 transition-all shadow-sm">
                        <button
                            onClick={() => setReflectOpen(!reflectOpen)}
                            className={`w-full flex items-center justify-between p-6 sm:p-7 transition-all ${reflectOpen ? 'bg-purple-50/30' : 'bg-white'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${reflectOpen ? 'bg-purple-600 text-white -rotate-6' : 'bg-purple-100 text-purple-600'}`}>
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-slate-800 text-base">{t('reflectTitle')}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                                        {lang === 'bn' ? 'তারাবীহের পর ২ মিনিট আক্ষেপ' : '2 min post-prayer reflection'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {data.reflectionDone && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                {reflectOpen ? <ChevronUp className="w-6 h-6 text-slate-300" /> : <ChevronDown className="w-6 h-6 text-slate-300" />}
                            </div>
                        </button>

                        {reflectOpen && (
                            <div className="p-6 sm:p-8 space-y-6 bg-white border-t border-purple-50 animate-fade-in">

                                {/* Sacred Question */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-3 flex items-center gap-2">
                                        <Pen className="w-4 h-4" /> {t('reflectionQuestion')}
                                    </h4>
                                    <p className="text-base font-black text-purple-950 bg-purple-50 p-5 rounded-[1.5rem] border border-purple-100 mb-5 relative group/q">
                                        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-purple-300 animate-pulse" />
                                        {reflQ}
                                    </p>

                                    {/* Focus Reminder */}
                                    {data.selectedTheme && (
                                        <div className="flex items-center gap-3 mb-5 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl border-dotted font-bold text-xs text-slate-600">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                            {t('themeSelectionReflection')}: <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-black">{data.selectedTheme}</span>
                                        </div>
                                    )}

                                    <textarea
                                        value={data.reflectionNote}
                                        onChange={(e) => handleTextChange('reflectionNote', e.target.value)}
                                        onBlur={() => { if (data.reflectionNote.trim()) handleUpdate('reflectionDone', true); }}
                                        placeholder={t('reflectionNotePlaceholder')}
                                        className="w-full p-4 rounded-2xl border-2 border-purple-100 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all resize-none shadow-inner"
                                        rows={3}
                                    />
                                </div>

                                {/* Next Day Intent */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                                        <Flame className="w-4 h-4" /> {t('tomorrowNiyyah')}
                                    </h4>
                                    <textarea
                                        value={data.tomorrowNiyyah}
                                        onChange={(e) => handleTextChange('tomorrowNiyyah', e.target.value)}
                                        placeholder={t('niyyahPlaceholder')}
                                        className="w-full p-4 rounded-2xl border-2 border-amber-100 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:border-amber-300 focus:ring-4 focus:ring-amber-100 transition-all resize-none shadow-inner"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── SACRED 30-DAY JOURNEY MAP ── */}
                <div className="pt-4 px-2">
                    <div className="flex items-center justify-between mb-5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" /> {lang === 'bn' ? '৩০ দিনের পবিত্র সফর' : 'The 30-Day Journey'}
                        </h4>
                        <div className="h-0.5 flex-1 mx-4 bg-slate-100 rounded-full" />
                    </div>
                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 sm:gap-3">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
                            const isToday = d === ramadanDay;
                            const isPast = d < ramadanDay;
                            const isBuffer = d >= 28;
                            return (
                                <div
                                    key={d}
                                    className={`relative aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-[11px] font-black transition-all group overflow-hidden border-2 cursor-default ${isToday
                                        ? `bg-gradient-to-br ${ps.header} text-white border-transparent shadow-xl scale-110 ring-4 ring-white ring-inset`
                                        : isPast
                                            ? 'bg-white text-emerald-600 border-emerald-100 shadow-sm'
                                            : isBuffer
                                                ? 'bg-white text-slate-300 border-purple-50 border-dotted'
                                                : 'bg-white text-slate-200 border-slate-50'
                                        }`}
                                >
                                    {isPast && (
                                        <div className="absolute top-0 right-0 p-0.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                        </div>
                                    )}
                                    <span className="relative z-10">{d}</span>
                                    {isToday && <Sparkles className="absolute bottom-1 w-3 h-3 text-amber-300 animate-pulse" />}
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
