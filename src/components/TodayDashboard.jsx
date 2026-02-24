import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../utils/AppContext';
import { translations } from '../utils/language';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { useParams, Link } from 'react-router-dom';
import { getDayData } from '../utils/storage';
import { getRamadanDayNumber, getDateKey, computeQuranTodayTarget, calculateTotalPagesRead, calculateDayProgress } from '../utils/quranCalculator';
import { ArrowLeft, Calendar as CalendarIcon, Trophy, Moon, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import SawabBadge from './SawabBadge';
import { getSawab } from '../data/sawabData';
import SalahGrid from './SalahGrid';
import QuranPlannerCard from './QuranPlannerCard';
import DhikrCounters from './DhikrCounters';
import ReflectionBox from './ReflectionBox';
import DeedOfDayCard from './DeedOfDayCard';
import ProgressBar from './ProgressBar';
import DailyLearning from './DailyLearning';
import TaraweehGuide from './TaraweehGuide';
import GamificationModal, { checkNewBadges, calculateLevel } from './GamificationModal';
import DailySelfAssessment from './DailySelfAssessment';
import ConfirmModal from './ConfirmModal';

const TodayDashboard = () => {
    const { appData, setAppData, updateData, language } = useApp();
    const { dateKey } = useParams();
    const t = (key) => translations[language][key] || key;

    const activeDateKey = dateKey || getDateKey();
    const isToday = activeDateKey === getDateKey();

    const ramadanDay = getRamadanDayNumber(appData.ramadanPlan.startDate, new Date(activeDateKey));

    const [dayData, setDayData] = useState(() => getDayData(appData, activeDateKey));
    const [showCelebration, setShowCelebration] = useState(false);
    const [newBadgeIds, setNewBadgeIds] = useState([]);
    const [showNotEnoughProgress, setShowNotEnoughProgress] = useState(false);
    const [savedIndicator, setSavedIndicator] = useState(false);

    // Detect if user skipped days (welcome-back banner)
    const hasSkippedDays = (() => {
        if (!isToday || !appData.ramadanPlan.startDate) return false;
        const days = Object.keys(appData.days || {});
        if (days.length === 0) return false;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().split('T')[0];
        return !appData.days[yesterdayKey] && days.length > 0;
    })();

    useEffect(() => {
        setDayData(getDayData(appData, activeDateKey));
    }, [appData, activeDateKey]);

    // Show auto-save indicator briefly
    const flashSaved = useCallback(() => {
        setSavedIndicator(true);
        setTimeout(() => setSavedIndicator(false), 2000);
    }, []);

    const updateDay = useCallback((updates) => {
        // 1. Update local state for immediate UI response
        setDayData(prev => ({ ...prev, ...updates }));

        // 2. Update global app state functionally to avoid stale state issues.
        // This is now called outside the setDayData updater.
        updateData(prevApp => {
            const dayData = getDayData(prevApp, activeDateKey);
            const updatedDay = { ...dayData, ...updates };
            return {
                days: {
                    ...prevApp.days,
                    [activeDateKey]: updatedDay
                }
            };
        });

        flashSaved();
    }, [activeDateKey, updateData, flashSaved]);

    const progress = calculateDayProgress(dayData, appData, activeDateKey);

    // Gamification: Mark day as complete
    const handleCompleteDay = () => {
        if (progress < 75) {
            setShowNotEnoughProgress(true);
            return;
        }

        // Check for new badges before updating
        const updatedAppData = {
            ...appData,
            profile: {
                ...appData.profile,
                totalXp: (appData.profile.totalXp || 0) + 100,
            }
        };
        const newBadges = checkNewBadges(updatedAppData);
        const newLevel = calculateLevel(updatedAppData.profile.totalXp);

        setNewBadgeIds(newBadges);
        setShowCelebration(true);

        updateDay({ isCompleted: true });
        updateData({
            profile: {
                ...appData.profile,
                totalXp: (appData.profile.totalXp || 0) + 100,
                level: newLevel,
                badges: [...(appData.profile.badges || []), ...newBadges],
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-32 animate-fade-in relative">

            {/* Welcome-back banner for users who skipped days */}
            {hasSkippedDays && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-[2rem] p-5 flex items-start gap-4 animate-fade-in">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl">
                        🌙
                    </div>
                    <div>
                        <p className="font-black text-emerald-800 dark:text-emerald-400 text-base sm:text-lg">
                            {language === 'bn' ? 'আলহামদুলিল্লাহ, আপনি ফিরে এসেছেন!' : 'Alhamdulillah, you\'re back!'}
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-500 text-sm font-medium mt-1">
                            {language === 'bn'
                                ? 'আজ থেকে নতুন করে শুরু করুন। ছোট আমলও আল্লাহর কাছে মূল্যবান।'
                                : 'Start fresh from today. Even small deeds are precious to Allah.'}
                        </p>
                    </div>
                </div>
            )}

            {/* Header with Date & Progress */}
            <div className="text-center relative pt-2">
                {!isToday && (
                    <Link
                        to="/calendar"
                        className="absolute -left-1 sm:-left-2 top-0 p-2 sm:p-3 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-2xl transition-all flex items-center gap-1 sm:gap-2 text-sm font-bold group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">{language === 'bn' ? 'পিছনে' : 'Back'}</span>
                    </Link>
                )}

                {/* Auto-save indicator */}
                <div className={`absolute right-0 top-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-500 ${savedIndicator
                    ? 'opacity-100 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/30'
                    : 'opacity-0'
                    }`}>
                    <CheckCircle className="w-3.5 h-3.5" />
                    {language === 'bn' ? 'সংরক্ষিত' : 'Saved'}
                </div>

                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4 animate-float">
                    {t('ramadanDay')} <span className="text-gradient underline decoration-emerald-200 dark:decoration-emerald-900/50 underline-offset-8 decoration-4">{ramadanDay}</span>
                </h1>

                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full font-bold text-xs sm:text-sm shadow-sm border border-emerald-100/50 dark:border-emerald-800/30">
                    <CalendarIcon size={14} />
                    {format(new Date(activeDateKey), 'EEEE, dd MMMM yyyy', { locale: language === 'bn' ? bn : undefined })}
                </div>

                {/* Progress Hub */}
                <div className="mt-8 sm:mt-12 group cursor-pointer">
                    <div className="flex justify-between items-end mb-3 px-2">
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest leading-none">
                            {language === 'bn' ? 'আজকের আমল' : 'Daily Completion'}
                        </span>
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-none">
                            {progress}<small className="text-lg opacity-30">%</small>
                        </span>
                    </div>
                    <ProgressBar progress={progress} />
                    <p className="mt-4 text-sm font-bold text-slate-400 dark:text-slate-500">
                        {progress >= 80 ? t('excellentProgress') :
                            progress >= 50 ? t('goodProgress') :
                                progress > 0 ? t('keepGoing') : t('startToday')}
                    </p>
                </div>
            </div>

            {/* Deed of the Day — moved to top to set daily intention */}
            <DeedOfDayCard ramadanDay={ramadanDay} />

            {/* Gamification: Complete Day Button */}
            {!dayData.isCompleted && progress >= 75 && (
                <div className="my-4 animate-bounce">
                    <button
                        onClick={handleCompleteDay}
                        className="w-full btn-primary bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg border-2 border-white ring-2 ring-amber-200 transform hover:scale-105 transition-all text-lg font-bold py-4 rounded-2xl flex items-center justify-center gap-3"
                    >
                        <Trophy className="w-6 h-6 animate-pulse" />
                        {t('completeDay')}
                    </button>
                </div>
            )}

            {/* Gentle nudge when progress < 75 and user hasn't completed */}
            {!dayData.isCompleted && progress > 0 && progress < 75 && (
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-[2rem] p-5 flex items-center gap-4">
                    <Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                    <p className="text-amber-800 dark:text-amber-400 font-bold text-sm">
                        {language === 'bn'
                            ? `আপনি অনেক কিছু করেছেন! আরেকটু বাকি—চেষ্টা করুন। (${progress}% সম্পন্ন)`
                            : `You've done a lot! Just a bit more—keep going. (${progress}% done)`}
                    </p>
                </div>
            )}

            {/* Completed Badge */}
            {dayData.isCompleted && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border-2 border-emerald-200 dark:border-emerald-800 rounded-[2rem] p-5 text-center animate-fade-in">
                    <p className="text-emerald-800 dark:text-emerald-400 font-black flex items-center justify-center gap-2 text-lg">
                        <Trophy className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                        {t('rewardClaimed')}
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-500 text-sm font-medium mt-1">
                        {language === 'bn' ? 'আলহামদুলিল্লাহ! এই দিনটি সম্পন্ন হয়েছে।' : 'Alhamdulillah! This day is complete.'}
                    </p>
                </div>
            )}

            {/* Main Trackers */}
            <div className="space-y-6">

                {/* 1. Salah Grid */}
                <SalahGrid
                    salahData={dayData.salah}
                    extraPrayers={dayData.extraPrayers || {}}
                    onUpdate={(salah) => updateDay({ salah })}
                    onExtraUpdate={(extraPrayers) => updateDay({ extraPrayers })}
                />

                {/* 1.5. Taraweeh Guide — The new interactive attraction system */}
                <TaraweehGuide
                    ramadanDay={ramadanDay}
                    taraweehData={dayData.taraweehGuide || {}}
                    tarawihRakats={dayData.extraPrayers?.tarawih || 0}
                    onUpdate={(taraweehGuide) => updateDay({ taraweehGuide })}
                    onTarawihUpdate={(tarawih) => updateDay({
                        extraPrayers: { ...dayData.extraPrayers, tarawih }
                    })}
                />

                {/* 2. Fasting (Roza) — full-width celebration card */}
                <div
                    onClick={() => updateDay({ roza: !dayData.roza })}
                    className={`card cursor-pointer transition-all duration-500 select-none ${dayData.roza
                        ? 'bg-gradient-to-br from-teal-500 to-emerald-600 border-transparent shadow-2xl shadow-teal-200 scale-[1.01]'
                        : 'bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 hover:shadow-xl hover:shadow-teal-100'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${dayData.roza ? 'bg-white/20' : 'bg-teal-100 dark:bg-emerald-900/40'
                                }`}>
                                🌙
                            </div>
                            <div>
                                <h3 className={`text-2xl font-black ${dayData.roza ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                                    {t('roza')}
                                </h3>
                                <p className={`text-sm font-bold ${dayData.roza ? 'text-teal-100' : 'text-slate-400 dark:text-slate-500'}`}>
                                    {dayData.roza
                                        ? (language === 'bn' ? '🤲 রোজা মোবারক! আল্লাহ কবুল করুন।' : '🤲 Roza Mubarak! May Allah accept it.')
                                        : (language === 'bn' ? 'আজ কি রোজা রেখেছেন?' : 'Did you fast today?')}
                                </p>
                            </div>
                        </div>

                        <div className={`w-16 h-9 rounded-full transition-all duration-500 flex items-center px-1 shadow-inner ${dayData.roza ? 'bg-white/30' : 'bg-slate-200 dark:bg-slate-800'
                            }`}>
                            <div className={`w-7 h-7 rounded-full bg-white shadow-lg transform transition-transform duration-500 ${dayData.roza ? 'translate-x-7' : 'translate-x-0'
                                }`} />
                        </div>
                    </div>
                    {dayData.roza && (() => {
                        const s = getSawab('rozaRamadan', language);
                        return s && <SawabBadge reward={s.reward} source={s.source} detail={s.detail} color="teal" />;
                    })()}
                </div>

                {/* 3. Daily Learning */}
                <DailyLearning
                    learningData={dayData.dailyLearning || {}}
                    onUpdate={(dailyLearning) => updateDay({ dailyLearning })}
                    dayNumber={ramadanDay}
                />

                {/* 4. Quran Planner */}
                <QuranPlannerCard
                    quranData={dayData.quran}
                    onUpdate={(quran) => updateDay({ quran })}
                    startDate={appData.ramadanPlan.startDate}
                    currentDate={activeDateKey}
                />

                {/* 5. Dhikr Counters */}
                <DhikrCounters
                    dhikrData={dayData.dhikr}
                    onUpdate={(dhikr) => updateDay({ dhikr })}
                />

                {/* 6. Reflection & Gratitude */}
                <ReflectionBox
                    reflectionData={dayData.reflection || {}}
                    onUpdate={(reflection) => updateDay({ reflection })}
                />

                {/* 7. Daily Self-Assessment */}
                <DailySelfAssessment
                    assessmentData={dayData.selfAssessment || {}}
                    onUpdate={(selfAssessment) => updateDay({ selfAssessment })}
                />

                {/* 8. Daily Summary Card */}
                <DailySummaryCard dayData={dayData} language={language} t={t} />
            </div>

            {/* Gamification Modal */}
            <GamificationModal
                isOpen={showCelebration}
                onClose={() => setShowCelebration(false)}
                day={ramadanDay}
                newBadgeIds={newBadgeIds}
            />

            {/* Gentle "not enough progress" modal */}
            <ConfirmModal
                isOpen={showNotEnoughProgress}
                title={language === 'bn' ? 'আরেকটু বাকি!' : 'Almost there!'}
                message={
                    language === 'bn'
                        ? `আপনি ${progress}% সম্পন্ন করেছেন। দিনটি সম্পূর্ণ করতে অন্তত ৭৫% প্রয়োজন। আরেকটু চেষ্টা করুন!`
                        : `You've completed ${progress}%. You need at least 75% to mark the day complete. Keep going!`
                }
                confirmLabel={language === 'bn' ? 'ঠিক আছে, চেষ্টা করব' : 'OK, I\'ll try'}
                cancelLabel=""
                onConfirm={() => setShowNotEnoughProgress(false)}
                onCancel={() => setShowNotEnoughProgress(false)}
                danger={false}
            />
        </div>
    );
};

/**
 * DailySummaryCard — glanceable recap at the bottom of the dashboard.
 */
const DailySummaryCard = ({ dayData, language, t }) => {
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const prayersDone = prayers.filter(prayerKey => {
        const prayerStatus = dayData?.salah?.[prayerKey];
        if (typeof prayerStatus === 'object' && prayerStatus !== null) {
            return prayerStatus.fard || prayerStatus.qaza;
        }
        return prayerStatus === true;
    }).length;

    const pagesRead = Number(dayData.quran?.pagesRead) || 0;
    const dhikrTotal = (Number(dayData.dhikr?.subhanallah) || 0) + (Number(dayData.dhikr?.alhamdulillah) || 0) + (Number(dayData.dhikr?.allahuakbar) || 0);
    const deedsDone = Object.values(dayData.selfAssessment || {}).filter(Boolean).length;

    const stats = [
        { icon: '🕌', label: language === 'bn' ? 'নামাজ' : 'Prayers', value: `${prayersDone}/5` },
        { icon: '📖', label: language === 'bn' ? 'পৃষ্ঠা' : 'Pages', value: pagesRead },
        { icon: '📿', label: language === 'bn' ? 'যিকির' : 'Dhikr', value: dhikrTotal },
        { icon: '✅', label: language === 'bn' ? 'আমল' : 'Deeds', value: `${deedsDone}/13` },
    ];

    return (
        <div className="card !p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-slate-100 dark:border-slate-800/50 shadow-inner">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 text-center">
                {language === 'bn' ? 'আজকের সারসংক্ষেপ' : "Today's Summary"}
            </h3>
            <div className="grid grid-cols-4 gap-3">
                {stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-sm border border-slate-100 dark:border-slate-800/50">
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-lg font-black text-slate-800 dark:text-white">{s.value}</span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center leading-tight">{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodayDashboard;
