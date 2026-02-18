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
        fajr: { fard: false, sunnah: false, jamaat: false },
        dhuhr: { fard: false, sunnah: false, jamaat: false },
        asr: { fard: false, sunnah: false, jamaat: false },
        maghrib: { fard: false, sunnah: false, jamaat: false },
        isha: { fard: false, sunnah: false, jamaat: false }
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

// Load data from localStorage
export const loadData = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            return { ...getDefaultData(), ...data };
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

// Get data for a specific date
export const getDayData = (data, dateKey) => {
    const defaultData = getDefaultDayData();
    const storedData = data.days[dateKey] || {};

    // Deep merge to ensure all new fields are present even in old data
    const mergedData = {
        ...defaultData,
        ...storedData,
        salah: { ...defaultData.salah, ...(storedData.salah || {}) },
        extraPrayers: { ...defaultData.extraPrayers, ...(storedData.extraPrayers || {}) },
        quran: { ...defaultData.quran, ...(storedData.quran || {}) },
        dailyLearning: { ...defaultData.dailyLearning, ...(storedData.dailyLearning || {}) },
        dhikr: { ...defaultData.dhikr, ...(storedData.dhikr || {}) },
        reflection: { ...defaultData.reflection, ...(storedData.reflection || {}) },
        selfAssessment: { ...defaultData.selfAssessment, ...(storedData.selfAssessment || {}) },
    };

    // Store back if it was missing to fill gaps immediately
    if (!data.days[dateKey]) {
        data.days[dateKey] = mergedData;
    }

    return mergedData;
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
