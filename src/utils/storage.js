// localStorage utilities for data persistence

const STORAGE_KEY = 'ramadan_planner_data';

// Default data structure
export const getDefaultData = () => ({
    version: 1,
    profile: {
        displayName: 'আপনি',
        timezone: 'Asia/Dhaka',
        quranTotalPages: 604,
        onboardingComplete: false,
        totalXp: 0,
        level: 1,
        badges: []
    },
    ramadanPlan: {
        startDate: null,
        totalDays: 30,
        targetFinishDays: 30
    },
    days: {}
});

// Get default day data
export const getDefaultDayData = () => ({
    isCompleted: false, // For gamification
    salah: {
        fajr: { fard: false, sunnah: false, jamaat: false, qaza: false },
        dhuhr: { fard: false, sunnah: false, jamaat: false, qaza: false },
        asr: { fard: false, sunnah: false, jamaat: false, qaza: false },
        maghrib: { fard: false, sunnah: false, jamaat: false, qaza: false },
        isha: { fard: false, sunnah: false, jamaat: false, qaza: false }
    },
    // Legacy support: extraPrayers replaced individual fields
    extraPrayers: {
        tarawih: 0, // number of rakats
        tahajjud: false,
        ishraq: false,
        chasht: false
    },
    roza: false,
    quran: {
        pagesRead: 0,
        juz: 0,
        ayahCount: 0
    },
    taraweehGuide: {
        previewSeen: false,
        reflectionDone: false,
        reflectionNote: '',
        tomorrowNiyyah: '',
        amolDone: false,
        selectedTheme: ''
    },
    dailyLearning: {
        ayah: false,
        hadith: false,
        dua: false,
        sunnah: false,
        masala: false,
        iman: false
    },
    dhikr: {
        subhanallah: 0,
        alhamdulillah: 0,
        allahuakbar: 0,
        custom: {
            label: 'ইস্তেগফার',
            count: 0
        }
    },
    reflection: {
        note: '', // Learning
        achievement: '',
        gratitude1: '',
        gratitude2: '',
        gratitude3: ''
    },
    selfAssessment: {
        // Behavior & Character
        avoidBadBehavior: false,
        avoidBackbiting: false,
        controlAnger: false,
        wasForgiving: false,
        // Worldly Control
        avoidMobile: false,
        avoidSocialMedia: false,
        protectEyes: false,
        // Charity & Compassion
        gaveCharity: false,
        helpedSomeone: false,
        // Intention & Self-Improvement
        repented: false,
        builtHabit: false,
        expressedGratitude: false,
        reflected: false
    }
});

// Sanitize numeric fields that may have been corrupted by string concatenation
const sanitizeData = (data) => {
    if (data.days) {
        Object.keys(data.days).forEach(key => {
            const day = data.days[key];
            // Fix Quran fields
            if (day.quran) {
                day.quran.pagesRead = Number(day.quran.pagesRead) || 0;
                day.quran.ayahCount = Number(day.quran.ayahCount) || 0;
                day.quran.paraNumber = Number(day.quran.paraNumber) || 0;
                // Clamp to sane maximums (e.g. 604 total pages, para 1-30)
                if (day.quran.pagesRead > 604) day.quran.pagesRead = 0;
                if (day.quran.paraNumber > 30) day.quran.paraNumber = 0;
            }
            // Fix Dhikr fields
            if (day.dhikr) {
                day.dhikr.subhanallah = Number(day.dhikr.subhanallah) || 0;
                day.dhikr.alhamdulillah = Number(day.dhikr.alhamdulillah) || 0;
                day.dhikr.allahuakbar = Number(day.dhikr.allahuakbar) || 0;
                if (day.dhikr.custom) {
                    day.dhikr.custom.count = Number(day.dhikr.custom.count) || 0;
                }
                // Clamp to sane maximums (no one does 100k dhikr in a day)
                ['subhanallah', 'alhamdulillah', 'allahuakbar'].forEach(k => {
                    if (day.dhikr[k] > 100000) day.dhikr[k] = 0;
                });
            }
            // Fix extraPrayers
            if (day.extraPrayers) {
                day.extraPrayers.tarawih = Number(day.extraPrayers.tarawih) || 0;
                if (day.extraPrayers.tarawih > 20) day.extraPrayers.tarawih = 0;
            }
        });
    }
    // Fix profile XP
    if (data.profile) {
        data.profile.totalXp = Number(data.profile.totalXp) || 0;
        data.profile.level = Number(data.profile.level) || 1;
    }
    return data;
};

// Load data from localStorage
export const loadData = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            return sanitizeData({ ...getDefaultData(), ...data });
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
    return getDefaultData();
};

// Save data to localStorage
export const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
};

// Get data for a specific date (pure version)
export const getDayData = (data, dateKey) => {
    const defaultData = getDefaultDayData();
    const storedData = data.days[dateKey] || {};

    // Deep merge to ensure all new fields are present even in old data
    return {
        ...defaultData,
        ...storedData,
        salah: { ...defaultData.salah, ...(storedData.salah || {}) },
        extraPrayers: { ...defaultData.extraPrayers, ...(storedData.extraPrayers || {}) },
        quran: { ...defaultData.quran, ...(storedData.quran || {}) },
        dailyLearning: { ...defaultData.dailyLearning, ...(storedData.dailyLearning || {}) },
        dhikr: { ...defaultData.dhikr, ...(storedData.dhikr || {}) },
        reflection: { ...defaultData.reflection, ...(storedData.reflection || {}) },
        selfAssessment: { ...defaultData.selfAssessment, ...(storedData.selfAssessment || {}) },
        taraweehGuide: { ...defaultData.taraweehGuide, ...(storedData.taraweehGuide || {}) },
    };
};

// Update day data
export const updateDayData = (data, dateKey, updates) => {
    const dayData = getDayData(data, dateKey);
    const updatedDayData = { ...dayData, ...updates };
    data.days[dateKey] = updatedDayData;
    saveData(data);
    return updatedDayData;
};

// Export data as JSON file
export const exportData = (data) => {
    try {
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ramadan-planner-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error('Error exporting data:', error);
        return false;
    }
};

// Import data from JSON file
export const importData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.version && data.profile && data.ramadanPlan) {
                    saveData(data);
                    resolve(data);
                } else {
                    reject(new Error('Invalid data format'));
                }
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => reject(new Error('Error reading file'));
        reader.readAsText(file);
    });
};

// Reset all data
export const resetData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error resetting data:', error);
        return false;
    }
};
