import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { useParams, Link } from 'react-router-dom';
import { getDayData } from '../utils/storage';
import { getRamadanDayNumber, getDateKey } from '../utils/quranCalculator';
import { ArrowLeft, Calendar as CalendarIcon, Trophy } from 'lucide-react';
import SalahGrid from './SalahGrid';
import QuranPlannerCard from './QuranPlannerCard';
import DhikrCounters from './DhikrCounters';
import ReflectionBox from './ReflectionBox';
import DeedOfDayCard from './DeedOfDayCard';
import ProgressBar from './ProgressBar';
import DailyLearning from './DailyLearning';
import GamificationModal from './GamificationModal';
import DailySelfAssessment from './DailySelfAssessment';

const TodayDashboard = () => {
    const { appData, setAppData, updateData, language } = useApp();
    const { dateKey } = useParams();
    const t = (key) => translations[language][key] || key;

    // Use URL param or current date
    const activeDateKey = dateKey || getDateKey();
    const isToday = activeDateKey === getDateKey();

    // Calculate Ramadan Day
    const ramadanDay = getRamadanDayNumber(appData.ramadanPlan.startDate, new Date(activeDateKey));

    // Check if today is unlocked
    // Logic: Day 1 always unlocked. Day N unlocked if Day N-1 is complete OR simple date-based unlock
    // For simplicity and user friendliness, we default to date-based unlock for now, 
    // but track "Level" based on completion.

    const [dayData, setDayData] = useState(() => getDayData(appData, activeDateKey));
    const [showCelebration, setShowCelebration] = useState(false);

    // Update effect when appData or activeDateKey changes
    useEffect(() => {
        setDayData(getDayData(appData, activeDateKey));
    }, [appData, activeDateKey]);

    const updateDay = (updates) => {
        const updatedDay = { ...dayData, ...updates };
        setDayData(updatedDay);

        // Persist to higher level state
        const newAppData = { ...appData };
        newAppData.days[activeDateKey] = updatedDay;
        setAppData(newAppData);
    };

    // Calculate Progress (0-100)
    const calculateProgress = () => {
        let totalPoints = 100;
        let earnedPoints = 0;

        // 1. Salah (Fard): 5 prayers * 10 points = 50 points (50% of daily goal)
        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        prayers.forEach(p => {
            const pData = dayData.salah[p];
            // Check if Fard is done
            if ((typeof pData === 'object' && pData.fard) || pData === true) {
                earnedPoints += 10;
            }
        });

        // 2. Fasting: 20 points
        if (dayData.roza) earnedPoints += 20;

        // 3. Quran: 10 points
        if ((dayData.quran?.pagesRead || 0) > 0) earnedPoints += 10;

        // 4. Tarawih: 10 points
        if ((dayData.extraPrayers?.tarawih || 0) > 0 || dayData.tarawih) earnedPoints += 10;

        // 5. Daily Learning & Dhikr: 10 points max (Bonus-ish but needed for 100%)
        let learningPoints = 0;
        const learnings = ['ayah', 'hadith', 'dua', 'sunnah', 'iman'];
        learnings.forEach(l => {
            if (dayData.dailyLearning?.[l]) learningPoints += 1;
        });

        const dhikrCount = (dayData.dhikr?.subhanallah || 0) + (dayData.dhikr?.alhamdulillah || 0) + (dayData.dhikr?.allahuakbar || 0);
        if (dhikrCount > 100) learningPoints += 5; // Good amount of Dhikr
        else if (dhikrCount > 0) learningPoints += 2;

        earnedPoints += Math.min(10, learningPoints);

        return Math.min(100, earnedPoints);
    };

    const progress = calculateProgress();

    // Gamification: Mark day as complete
    const handleCompleteDay = () => {
        if (progress < 75) {
            alert(language === 'bn' ? 'দিনটি সম্পূর্ণ করতে অন্তত ৭৫% কাজ শেষ করুন!' : 'You need at least 75% progress to complete the day!');
            return;
        }

        setShowCelebration(true);
        updateDay({ isCompleted: true });

        // Here we could also increment a "streak" or "level" in the profile
        updateData({
            profile: {
                ...appData.profile,
                totalXp: (appData.profile.totalXp || 0) + 100
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-12 pb-32 animate-fade-in relative">

            {/* Header with Date & Progress */}
            <div className="text-center relative">
                {!isToday && (
                    <Link
                        to="/calendar"
                        className="absolute -left-2 top-0 p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all flex items-center gap-2 text-sm font-bold group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        {language === 'bn' ? 'পিছনে' : 'Back'}
                    </Link>
                )}

                <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4 animate-float">
                    {t('ramadanDay')} <span className="text-gradient underline decoration-emerald-200 underline-offset-8 decoration-4">{ramadanDay}</span>
                </h1>

                <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-50 text-emerald-700 rounded-full font-bold text-sm shadow-sm border border-emerald-100/50">
                    <CalendarIcon size={16} />
                    {format(new Date(activeDateKey), 'EEEE, dd MMMM yyyy', { locale: language === 'bn' ? bn : undefined })}
                </div>

                {/* Progress Hub */}
                <div className="mt-12 group cursor-pointer">
                    <div className="flex justify-between items-end mb-3 px-2">
                        <span className="text-slate-400 text-xs font-black uppercase tracking-widest leading-none">
                            {language === 'bn' ? 'আজকের আমল' : 'Daily Completion'}
                        </span>
                        <span className="text-4xl font-black text-slate-900 leading-none">
                            {progress}<small className="text-lg opacity-30">%</small>
                        </span>
                    </div>
                    <ProgressBar progress={progress} />
                    <p className="mt-4 text-sm font-bold text-slate-400">
                        {progress >= 80 ? t('excellentProgress') :
                            progress >= 50 ? t('goodProgress') :
                                progress > 0 ? t('keepGoing') : t('startToday')}
                    </p>
                </div>
            </div>

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

            {/* Completed Batch */}
            {dayData.isCompleted && (
                <div className="bg-amber-100 border-2 border-amber-300 rounded-xl p-4 text-center animate-fade-in">
                    <p className="text-amber-800 font-bold flex items-center justify-center gap-2">
                        <Trophy className="w-5 h-5" />
                        {t('rewardClaimed')}
                    </p>
                </div>
            )}

            {/* Main Trackers Grid */}
            <div className="space-y-6">

                {/* 1. Salah Grid (Fard/Sunnah) */}
                <SalahGrid
                    salahData={dayData.salah}
                    extraPrayers={dayData.extraPrayers || {}}
                    onUpdate={(salah) => updateDay({ salah })}
                    onExtraUpdate={(extraPrayers) => updateDay({ extraPrayers })}
                />

                {/* 2. Fasting Toggle (Roza) */}
                <div className="card bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">
                            🌙
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{t('roza')}</h3>
                    </div>
                    <button
                        onClick={() => updateDay({ roza: !dayData.roza })}
                        className={`w-14 h-8 rounded-full transition-colors duration-300 flex items-center px-1 ${dayData.roza ? 'bg-teal-500' : 'bg-gray-300'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-300 ${dayData.roza ? 'translate-x-6' : 'translate-x-0'
                            }`} />
                    </button>
                </div>

                {/* 3. Daily Learning (Ayah, Hadith, etc.) */}
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
                />

                {/* 5. Deed of the Day */}
                <DeedOfDayCard ramadanDay={ramadanDay} />

                {/* 6. Dhikr Counters */}
                <DhikrCounters
                    dhikrData={dayData.dhikr}
                    onUpdate={(dhikr) => updateDay({ dhikr })}
                />

                {/* 7. Reflection & Gratitude */}
                <ReflectionBox
                    reflectionData={dayData.reflection || {}}
                    onUpdate={(reflection) => updateDay({ reflection })}
                />

                {/* 8. Daily Self-Assessment */}
                <DailySelfAssessment
                    assessmentData={dayData.selfAssessment || {}}
                    onUpdate={(selfAssessment) => updateDay({ selfAssessment })}
                />

            </div>

            {/* Gamification Modal */}
            <GamificationModal
                isOpen={showCelebration}
                onClose={() => setShowCelebration(false)}
                day={ramadanDay}
            />

        </div>
    );
};

export default TodayDashboard;
