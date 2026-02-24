import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getDefaultData, loadData, saveData, getDayData, updateDayData, sanitizeData } from '../utils/storage';

describe('storage utilities', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it('should load default data when localStorage is empty', () => {
        const data = loadData();
        expect(data).toEqual(getDefaultData());
    });

    it('should save and load data', () => {
        const testData = { ...getDefaultData(), profile: { displayName: 'Tester' } };
        saveData(testData);
        const loaded = loadData();
        expect(loaded.profile.displayName).toBe('Tester');
    });

    it('should sanitize corrupted numeric data', () => {
        const testData = {
            ...getDefaultData(),
            days: {
                '2024-03-10': {
                    quran: { pagesRead: '20', ayahCount: 'invalid' },
                    dhikr: { subhanallah: '50' }
                }
            }
        };
        saveData(testData);
        const loaded = loadData();
        expect(loaded.days['2024-03-10'].quran.pagesRead).toBe(20);
        expect(loaded.days['2024-03-10'].quran.ayahCount).toBe(0);
        expect(loaded.days['2024-03-10'].dhikr.subhanallah).toBe(50);
    });

    it('should return complete day data with defaults using getDayData', () => {
        const data = getDefaultData();
        const dateKeyMissing = '2024-03-10';
        const dateKeyExists = '2024-03-11';

        data.days[dateKeyExists] = { roza: true }; // Incomplete day data

        // Case 1: Missing day
        const dayData1 = getDayData(data, dateKeyMissing);
        expect(dayData1.salah).toBeDefined();
        // Mutation should NOT happen now (pure function)
        expect(data.days[dateKeyMissing]).toBeUndefined();

        // Case 2: Incomplete day exists
        const dayData2 = getDayData(data, dateKeyExists);
        expect(dayData2.roza).toBe(true);
        expect(dayData2.salah).toBeDefined();
        // Incomplete original should remain untouched
        expect(data.days[dateKeyExists].salah).toBeUndefined();
    });

    it('should update day data and save to localStorage', () => {
        const data = getDefaultData();
        const dateKey = '2024-03-10';

        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        updateDayData(data, dateKey, { roza: true });

        expect(data.days[dateKey].roza).toBe(true);
        expect(setItemSpy).toHaveBeenCalled();

        const loaded = loadData();
        expect(loaded.days[dateKey].roza).toBe(true);
    });
});
