import { describe, it, expect } from 'vitest';
import { getDayIndex, getDateKey, calculateTotalPagesRead, computeQuranTodayTarget, calculateDayProgressBreakdown } from '../utils/quranCalculator';

describe('quranCalculator', () => {
    describe('getDayIndex', () => {
        it('should return 1 for the start date', () => {
            expect(getDayIndex('2024-03-10', '2024-03-10')).toBe(1);
        });

        it('should return 2 for the second day', () => {
            expect(getDayIndex('2024-03-10', '2024-03-11')).toBe(2);
        });

        it('should return 0 if no start date', () => {
            expect(getDayIndex(null, '2024-03-10')).toBe(0);
        });
    });

    describe('calculateTotalPagesRead', () => {
        const mockData = {
            days: {
                '2024-03-10': { quran: { pagesRead: 5 } },
                '2024-03-11': { quran: { pagesRead: 10 } },
                '2024-03-12': { quran: { pagesRead: 3 } }
            }
        };

        it('should sum pages up to the given date', () => {
            expect(calculateTotalPagesRead(mockData, new Date('2024-03-11'))).toBe(15);
        });

        it('should handle missing quran data', () => {
            const dataWithMissing = {
                days: {
                    '2024-03-10': { quran: { pagesRead: 5 } },
                    '2024-03-11': {}
                }
            };
            expect(calculateTotalPagesRead(dataWithMissing, new Date('2024-03-11'))).toBe(5);
        });
    });

    describe('computeQuranTodayTarget', () => {
        it('should calculate target correctly on day 1 with no pages read', () => {
            const result = computeQuranTodayTarget({
                totalPages: 600,
                startDateISO: '2024-03-10',
                totalDays: 30,
                dateISO: '2024-03-10',
                pagesReadSoFar: 0
            });
            expect(result.todayTarget).toBe(20);
            expect(result.remainingDays).toBe(30);
        });

        it('should adjust target when behind schedule', () => {
            // Day 11 of 30. 20 days remaining (including today).
            // 600 total. 100 read so far. 500 remaining.
            // 500 / 20 = 25
            const result = computeQuranTodayTarget({
                totalPages: 600,
                startDateISO: '2024-03-01',
                totalDays: 30,
                dateISO: '2024-03-11',
                pagesReadSoFar: 100
            });
            expect(result.todayTarget).toBe(25);
            expect(result.remainingDays).toBe(20);
        });
    });

    describe('calculateDayProgressBreakdown', () => {
        it('should calculate full points for all categories', () => {
            const dayData = {
                salah: {
                    fajr: { fard: true, sunnah: true, jamaat: true },
                    dhuhr: { fard: true, sunnah: true, jamaat: true },
                    asr: { fard: true, sunnah: true, jamaat: true },
                    maghrib: { fard: true, sunnah: true, jamaat: true },
                    isha: { fard: true, sunnah: true, jamaat: true }
                },
                roza: true,
                quran: { pagesRead: 25 },
                extraPrayers: {
                    tarawih: 20,
                    tahajjud: true,
                    ishraq: true,
                    chasht: true
                },
                taraweehGuide: {
                    selectedTheme: 'Theme',
                    previewSeen: true,
                    amolDone: true
                },
                dhikr: {
                    subhanallah: 100
                },
                dailyLearning: {
                    ayah: true,
                    hadith: true,
                    dua: true
                },
                reflection: {
                    note: 'Learned something'
                },
                selfAssessment: {
                    a: true, b: true, c: true, d: true, e: true, f: true, g: true
                }
            };

            const appData = {
                ramadanPlan: {
                    startDate: '2024-03-01',
                    targetFinishDays: 30
                },
                profile: {
                    quranTotalPages: 604
                },
                days: {}
            };

            const breakdown = calculateDayProgressBreakdown(dayData, appData, '2024-03-01');
            expect(breakdown.salah).toBe(50);
            expect(breakdown.roza).toBe(10);
            expect(breakdown.quran).toBe(10);
            expect(breakdown.others).toBe(30);
            expect(breakdown.total).toBe(100);
        });

        it('should handle zero progress', () => {
            const result = calculateDayProgressBreakdown({}, {}, '2024-03-01');
            expect(result.total).toBe(0);
        });
    });
});
