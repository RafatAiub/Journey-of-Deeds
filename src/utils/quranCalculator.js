import { format, differenceInDays, addDays } from 'date-fns';

// Get day index (1-based) from start date
export const getDayIndex = (startDateISO, dateISO) => {
    if (!startDateISO) return 0;

    const start = new Date(startDateISO);
    const current = new Date(dateISO);

    const daysDiff = differenceInDays(current, start);
    return daysDiff + 1; // 1-based index
};

// Get date key in YYYY-MM-DD format
export const getDateKey = (date = new Date()) => {
    return format(date, 'yyyy-MM-dd');
};

// Calculate total pages read so far
export const calculateTotalPagesRead = (data, upToDate) => {
    let total = 0;
    const dateKey = getDateKey(upToDate);

    Object.keys(data.days).forEach(key => {
        if (key <= dateKey && data.days[key].quran) {
            total += Number(data.days[key].quran.pagesRead) || 0;
        }
    });

    return total;
};

// Compute today's Quran target with auto-adjustment for missed days
export const computeQuranTodayTarget = ({
    totalPages = 604,
    startDateISO,
    totalDays = 30,
    dateISO,
    pagesReadSoFar
}) => {
    if (!startDateISO) {
        return {
            dayIndex: 0,
            remainingDays: totalDays,
            remainingPages: totalPages,
            todayTarget: Math.ceil(totalPages / totalDays)
        };
    }

    const dayIndex = getDayIndex(startDateISO, dateISO);
    const remainingDays = Math.max(1, totalDays - dayIndex + 1);
    const remainingPages = Math.max(0, totalPages - pagesReadSoFar);
    const todayTarget = Math.ceil(remainingPages / remainingDays);

    return {
        dayIndex,
        remainingDays,
        remainingPages,
        todayTarget,
        isComplete: remainingPages === 0
    };
};

// Calculate daily progress percentage (0-100) — Single source of truth for all Amols
export const calculateDayProgress = (dayData, appData, dateKey) => {
    if (!dayData) return 0;

    let earnedPoints = 0;

    // 1. Salah (Total 50 pts)
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    prayers.forEach(p => {
        const pData = dayData.salah?.[p];
        if (pData?.fard || pData === true) earnedPoints += 7; // 35 pts total
        if (pData?.sunnah) earnedPoints += 1.5; // 7.5 pts total
        if (pData?.jamaat) earnedPoints += 1.5; // 7.5 pts total
    });

    // 2. Fasting (Total 10 pts)
    if (dayData.roza) earnedPoints += 10;

    // 3. Quran (Total 10 pts)
    const pagesRead = Number(dayData.quran?.pagesRead) || 0;
    if (pagesRead > 0) {
        earnedPoints += 5; // Base points for reading

        // Target tracking (if appData available)
        if (appData?.ramadanPlan?.startDate) {
            const quranTarget = computeQuranTodayTarget({
                totalPages: appData.profile?.quranTotalPages || 604,
                startDateISO: appData.ramadanPlan.startDate,
                totalDays: appData.ramadanPlan.targetFinishDays || 30,
                dateISO: dateKey,
                pagesReadSoFar: calculateTotalPagesRead(appData, dateKey) - pagesRead
            });
            if (pagesRead >= (quranTarget.todayTarget || 4)) earnedPoints += 5;
        } else {
            // Fallback: if no plan, give points for significant reading
            if (pagesRead >= 4) earnedPoints += 5;
        }
    }

    // 4. Taraweeh & Night Prayer (Total 10 pts)
    const trRakats = Number(dayData.extraPrayers?.tarawih) || 0;
    if (trRakats > 0) earnedPoints += 4;
    if (dayData.taraweehGuide?.selectedTheme) earnedPoints += 2;
    if (dayData.taraweehGuide?.previewSeen) earnedPoints += 2;
    if (dayData.taraweehGuide?.amolDone) earnedPoints += 2;

    // 5. Nafal Prayers (Total 5 pts)
    if (dayData.extraPrayers?.tahajjud) earnedPoints += 2;
    if (dayData.extraPrayers?.ishraq) earnedPoints += 1.5;
    if (dayData.extraPrayers?.chasht) earnedPoints += 1.5;

    // 6. Dhikr (Total 5 pts)
    const dhikrCount = (Number(dayData.dhikr?.subhanallah) || 0) +
        (Number(dayData.dhikr?.alhamdulillah) || 0) +
        (Number(dayData.dhikr?.allahuakbar) || 0) +
        (Number(dayData.dhikr?.custom?.count) || 0);
    if (dhikrCount >= 100) earnedPoints += 5;
    else if (dhikrCount >= 33) earnedPoints += 3;
    else if (dhikrCount > 0) earnedPoints += 1.5;

    // 7. Learning & Reflection (Total 5 pts)
    let learningItems = 0;
    const learningKeys = ['ayah', 'hadith', 'dua', 'sunnah', 'masala', 'iman'];
    learningKeys.forEach(k => { if (dayData.dailyLearning?.[k]) learningItems++; });
    if (learningItems >= 3) earnedPoints += 2.5;
    else if (learningItems > 0) earnedPoints += 1.5;

    if (dayData.reflection?.note || dayData.reflection?.achievement) earnedPoints += 2.5;

    // 8. Self Assessment / Character (Total 5 pts)
    let behaviorCount = 0;
    const sa = dayData.selfAssessment || {};
    Object.values(sa).forEach(v => { if (v === true) behaviorCount++; });
    if (behaviorCount >= 7) earnedPoints += 5;
    else if (behaviorCount >= 3) earnedPoints += 2.5;

    return Math.min(100, Math.round(earnedPoints));
};

// Get encouraging message based on progress
export const getEncouragementMessage = (progress, language = 'bn') => {
    const messages = {
        bn: {
            excellent: 'আলহামদুলিল্লাহ! চমৎকার অগ্রগতি!',
            good: 'মাশাআল্লাহ! ভালো এগিয়ে যাচ্ছেন!',
            keep: 'চালিয়ে যান! ছোট অগ্রগতিও অগ্রগতি।',
            start: 'আজ থেকে শুরু করুন!'
        },
        en: {
            excellent: 'Alhamdulillah! Excellent progress!',
            good: 'MashaAllah! Good progress!',
            keep: 'Keep going! Small progress is still progress.',
            start: 'Start today!'
        }
    };

    const lang = messages[language] || messages.en;

    if (progress >= 80) return lang.excellent;
    if (progress >= 50) return lang.good;
    if (progress > 0) return lang.keep;
    return lang.start;
};

// Get Ramadan day number
export const getRamadanDayNumber = (startDate, currentDate = new Date()) => {
    if (!startDate) return 0;
    return getDayIndex(startDate, getDateKey(currentDate));
};
