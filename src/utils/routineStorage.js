export const ROUTINE_STORAGE_KEY = 'ramadan_routine_v1';

export const getRoutineKey = (dateStr) => `${ROUTINE_STORAGE_KEY}_${dateStr}`;

export const loadRoutine = (dateStr) => {
    try {
        const data = localStorage.getItem(getRoutineKey(dateStr));
        if (data) {
            return JSON.parse(data);
        }
    } catch (e) {
        console.error('Error loading routine data', e);
    }
    return {
        date: dateStr,
        blocks: [],
        lastUpdated: Date.now()
    };
};

export const saveRoutine = (dateStr, payload) => {
    try {
        const routineData = {
            ...payload,
            date: dateStr,
            lastUpdated: Date.now()
        };
        localStorage.setItem(getRoutineKey(dateStr), JSON.stringify(routineData));
        return true;
    } catch (e) {
        console.error('Error saving routine data', e);
        return false;
    }
};
