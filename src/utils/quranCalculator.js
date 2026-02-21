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
    const breakdown = calculateDayProgressBreakdown(dayData, appData, dateKey);
    return Math.min(100, Math.round(breakdown.salah + breakdown.roza + breakdown.quran + breakdown.others));
};

// Calculate detailed breakdown for granular charts
export const calculateDayProgressBreakdown = (dayData, appData, dateKey) => {
    if (!dayData) return { salah: 0, roza: 0, quran: 0, others: 0, total: 0 };

    let salah = 0;
    let roza = 0;
    let quran = 0;
    let others = 0;

    // 1. Salah (Total 50 pts)
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    prayers.forEach(p => {
        const pData = dayData.salah?.[p];
        if (pData?.fard || pData === true) salah += 7;
        if (pData?.sunnah) salah += 1.5;
        if (pData?.jamaat) salah += 1.5;
    });

    // 2. Fasting (Total 10 pts)
    if (dayData.roza) roza += 10;

    // 3. Quran (Total 10 pts)
    const pagesRead = Number(dayData.quran?.pagesRead) || 0;
    if (pagesRead > 0) {
        quran += 5;
        if (appData?.ramadanPlan?.startDate) {
            const quranTarget = computeQuranTodayTarget({
                totalPages: appData.profile?.quranTotalPages || 604,
                startDateISO: appData.ramadanPlan.startDate,
                totalDays: appData.ramadanPlan.targetFinishDays || 30,
                dateISO: dateKey,
                pagesReadSoFar: calculateTotalPagesRead(appData, dateKey) - pagesRead
            });
            if (pagesRead >= (quranTarget.todayTarget || 4)) quran += 5;
        } else if (pagesRead >= 4) {
            quran += 5;
        }
    }

    // 4. Others: Taraweeh, Nafal, Dhikr, Learning, SA (Total 30 pts)
    // Taraweeh (10)
    const trRakats = Number(dayData.extraPrayers?.tarawih) || 0;
    if (trRakats > 0) others += 4;
    if (dayData.taraweehGuide?.selectedTheme) others += 2;
    if (dayData.taraweehGuide?.previewSeen) others += 2;
    if (dayData.taraweehGuide?.amolDone) others += 2;

    // Nafal (5)
    if (dayData.extraPrayers?.tahajjud) others += 2;
    if (dayData.extraPrayers?.ishraq) others += 1.5;
    if (dayData.extraPrayers?.chasht) others += 1.5;

    // Dhikr (5)
    const dhikrCount = (Number(dayData.dhikr?.subhanallah) || 0) +
        (Number(dayData.dhikr?.alhamdulillah) || 0) +
        (Number(dayData.dhikr?.allahuakbar) || 0) +
        (Number(dayData.dhikr?.custom?.count) || 0);
    if (dhikrCount >= 100) others += 5;
    else if (dhikrCount >= 33) others += 3;
    else if (dhikrCount > 0) others += 1.5;

    // Learning (5)
    let learningItems = 0;
    const learningKeys = ['ayah', 'hadith', 'dua', 'sunnah', 'masala', 'iman'];
    learningKeys.forEach(k => { if (dayData.dailyLearning?.[k]) learningItems++; });
    if (learningItems >= 3) others += 2.5;
    else if (learningItems > 0) others += 1.5;
    if (dayData.reflection?.note || dayData.reflection?.achievement) others += 2.5;

    // SA (5)
    let behaviorCount = 0;
    const sa = dayData.selfAssessment || {};
    Object.values(sa).forEach(v => { if (v === true) behaviorCount++; });
    if (behaviorCount >= 7) others += 5;
    else if (behaviorCount >= 3) others += 2.5;

    return {
        salah: Math.round(salah),
        roza: Math.round(roza),
        quran: Math.round(quran),
        others: Math.round(others),
        total: Math.min(100, Math.round(salah + roza + quran + others))
    };
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
