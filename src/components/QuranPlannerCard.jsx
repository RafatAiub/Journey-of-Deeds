import React, { useState } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { computeQuranTodayTarget, calculateTotalPagesRead } from '../utils/quranCalculator';
import { BookOpen, TrendingUp, CheckCircle, Hash, Bookmark, Target, AlertCircle } from 'lucide-react';

/**
 * QuranPlannerCard — tracks daily Quran reading progress.
 * Fixes applied:
 *  - Negative input validation (clamp to 0)
 *  - Para range validation (1-30)
 *  - Double-logging prevention (brief disabled state after save)
 *  - Shows today's recommended target
 *  - Fixed SummaryTag dynamic Tailwind classes (static colorMap)
 */
const QuranPlannerCard = ({
    quranData,
    onUpdate,
    startDate,
    currentDate = new Date().toISOString().split('T')[0]
}) => {
    const { appData, language } = useApp();
    const t = (key) => translations[language][key] || key;

    const data = {
        pagesRead: Number(quranData.pagesRead) || 0,
        ayahCount: Number(quranData.ayahCount) || 0,
        paraNumber: Number(quranData.paraNumber) || 0,
    };

    const [inputPages, setInputPages] = useState('');
    const [inputAyah, setInputAyah] = useState('');
    const [inputPara, setInputPara] = useState('');
    const [justSaved, setJustSaved] = useState(false);
    const [error, setError] = useState('');

    // Calculate today's recommended target
    const quranTarget = computeQuranTodayTarget({
        totalPages: appData.profile?.quranTotalPages || 604,
        startDateISO: startDate,
        totalDays: appData.ramadanPlan?.targetFinishDays || 30,
        dateISO: currentDate,
        pagesReadSoFar: calculateTotalPagesRead(appData)
    });
    const todayTargetPages = quranTarget.todayTarget || 0;

    const totalPagesRead = calculateTotalPagesRead(appData);
    const totalGoal = appData.profile?.quranTotalPages || 604;
    const overallPercent = Math.min(100, Math.round((totalPagesRead / totalGoal) * 100));

    const handleSave = () => {
        const rawPages = parseInt(inputPages) || 0;

        // Validation
        if (rawPages < 0) {
            setError(language === 'bn' ? 'পৃষ্ঠা সংখ্যা ঋণাত্মক হতে পারে না।' : 'Pages cannot be negative.');
            return;
        }

        const paraVal = parseInt(inputPara) || data.paraNumber;
        const clampedPara = Math.min(30, Math.max(0, paraVal));

        onUpdate({
            ...quranData,
            pagesRead: Number(data.pagesRead) + Number(rawPages),
            ayahCount: Math.max(0, parseInt(inputAyah) || Number(data.ayahCount)),
            paraNumber: clampedPara,
        });

        setInputPages('');
        setInputAyah('');
        setInputPara('');
        setError('');
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
    };

    return (
        <section className="card !p-4 sm:!p-8 bg-gradient-to-br from-white to-sky-50/30 border-sky-100">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-200">
                        <BookOpen className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{t('quranTracker')}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                            <p className="text-xs font-bold text-sky-600 uppercase tracking-widest leading-none">
                                {t('quranGoal')}: {totalGoal} {t('pages')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                    <SummaryTag label={t('pages')} value={data.pagesRead} color="sky" />
                    <SummaryTag label={t('para')} value={data.paraNumber || '-'} color="blue" />
                </div>
            </header>

            {/* Overall Progress Bar */}
            <div className="mb-8 bg-sky-50 rounded-2xl p-5 border border-sky-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-sky-600 uppercase tracking-widest">
                        {language === 'bn' ? 'মোট অগ্রগতি' : 'Overall Progress'}
                    </span>
                    <span className="text-sm font-black text-sky-700">{totalPagesRead} / {totalGoal} {t('pages')}</span>
                </div>
                <div className="h-3 bg-sky-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-700"
                        style={{ width: `${overallPercent}%` }}
                    />
                </div>
                <p className="text-xs text-sky-500 font-bold mt-2">{overallPercent}% {language === 'bn' ? 'সম্পন্ন' : 'complete'}</p>
            </div>

            {/* Today's Target */}
            {todayTargetPages > 0 && (
                <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <Target className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-sm font-bold text-amber-800">
                        {language === 'bn'
                            ? `আজকের লক্ষ্য: ${todayTargetPages} পৃষ্ঠা পড়ুন`
                            : `Today's target: Read ${todayTargetPages} pages`}
                    </p>
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InputField
                    label={`${t('para')} (1-30)`}
                    icon={Bookmark}
                    value={inputPara}
                    onChange={(v) => {
                        const n = parseInt(v);
                        if (!isNaN(n)) setInputPara(String(Math.min(30, Math.max(1, n))));
                        else setInputPara(v);
                    }}
                    placeholder={`${data.paraNumber || 1}`}
                    type="number"
                    min="1"
                    max="30"
                />
                <InputField
                    label={t('ayah')}
                    icon={Hash}
                    value={inputAyah}
                    onChange={(v) => setInputAyah(v)}
                    placeholder="0"
                    type="number"
                    min="0"
                />
                <div className="group">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
                        {t('pages')} (+{data.pagesRead} {language === 'bn' ? 'পড়া হয়েছে' : 'read'})
                    </label>
                    <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                        <input
                            type="number"
                            min="0"
                            value={inputPages}
                            onChange={(e) => {
                                setError('');
                                const v = e.target.value;
                                // Prevent negative values
                                if (v === '' || parseInt(v) >= 0) setInputPages(v);
                            }}
                            placeholder={language === 'bn' ? '+ পৃষ্ঠা' : '+ pages'}
                            className="input-field !pl-12 !border-sky-100 !bg-white"
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={justSaved}
                className={`w-full btn-gradient !py-5 flex justify-center items-center gap-3 transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 ${justSaved
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-200/50'
                    : 'bg-gradient-to-r from-sky-600 to-blue-700 shadow-sky-200/50'
                    }`}
            >
                {justSaved ? (
                    <>
                        <CheckCircle className="w-6 h-6 animate-bounce" />
                        <span className="text-lg font-black">
                            {language === 'bn' ? '✓ সংরক্ষিত হয়েছে!' : '✓ Logged!'}
                        </span>
                    </>
                ) : (
                    <>
                        <TrendingUp className="w-6 h-6" />
                        <span className="text-lg font-black">{t('logPages')}</span>
                    </>
                )}
            </button>
        </section>
    );
};

const InputField = ({ label, icon: Icon, value, onChange, placeholder, type = 'number', min, max }) => (
    <div className="group">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
            {label}
        </label>
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
            <input
                type={type}
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="input-field !pl-12 !bg-white"
            />
        </div>
    </div>
);

// Static color map — avoids Tailwind JIT dynamic class issues
const summaryColorMap = {
    sky: {
        bg: 'bg-sky-50',
        border: 'border-sky-100',
        labelText: 'text-sky-400',
        valueText: 'text-sky-700',
    },
    blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        labelText: 'text-blue-400',
        valueText: 'text-blue-700',
    },
};

const SummaryTag = ({ label, value, color }) => {
    const c = summaryColorMap[color] || summaryColorMap.sky;
    return (
        <div className={`px-4 py-2 rounded-2xl ${c.bg} border ${c.border} flex flex-col items-center min-w-[70px]`}>
            <span className={`text-[10px] font-black uppercase ${c.labelText} leading-none mb-1`}>{label}</span>
            <span className={`text-xl font-black ${c.valueText} leading-none`}>{value}</span>
        </div>
    );
};

export default QuranPlannerCard;
