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

// Calculate daily progress percentage
export const calculateDayProgress = (dayData) => {
    if (!dayData) return 0;

    let totalPoints = 0;
    let earnedPoints = 0;

    // 1. Salah (Fard): 5 prayers * 10 points = 50
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    prayers.forEach(p => {
        totalPoints += 10;
        const pData = dayData.salah?.[p];
        if (typeof pData === 'object' && pData?.fard) earnedPoints += 10;
        else if (pData === true) earnedPoints += 10; // Legacy
    });

    // 2. Fasting: 20 points
    totalPoints += 20;
    if (dayData.roza) earnedPoints += 20;

    // 3. Quran: 10 points
    totalPoints += 10;
    if ((dayData.quran?.pagesRead || 0) > 0) earnedPoints += 10;

    // 4. Daily Learning: 10 points
    totalPoints += 10;
    const learningItems = Object.values(dayData.dailyLearning || {});
    const learnedCount = learningItems.filter(Boolean).length;
    if (learnedCount > 0) earnedPoints += 10;

    // 5. Dhikr & Reflection: 10 points
    totalPoints += 10;
    const dhikrTotal = (Number(dayData.dhikr?.subhanallah) || 0) +
        (Number(dayData.dhikr?.alhamdulillah) || 0) +
        (Number(dayData.dhikr?.allahuakbar) || 0) +
        (Number(dayData.dhikr?.custom?.count) || 0);

    const hasReflection = dayData.reflection?.note ||
        dayData.reflection?.gratitude ||
        dayData.reflection?.gratitude1;

    if (dhikrTotal > 0 || hasReflection) earnedPoints += 10;

    return Math.round((earnedPoints / totalPoints) * 100);
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
