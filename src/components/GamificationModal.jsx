import React, { useEffect } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { Trophy, Star, X, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Badge definitions — awarded based on actual user data.
 * Each badge has an id, icon, BN label, EN label, and a check function.
 */
export const BADGES = [
    {
        id: 'first_day',
        icon: '🌙',
        bn: 'প্রথম পদক্ষেপ',
        en: 'First Step',
        descBn: 'প্রথম দিন সম্পন্ন করেছেন',
        descEn: 'Completed your first day',
        check: (appData) => Object.keys(appData.days || {}).length >= 1,
    },
    {
        id: 'five_day_streak',
        icon: '🔥',
        bn: 'পাঁচ দিনের ধারা',
        en: '5-Day Streak',
        descBn: '৫ দিন ধারাবাহিকভাবে সম্পন্ন',
        descEn: '5 consecutive days completed',
        check: (appData) => (appData.profile?.totalXp || 0) >= 500,
    },
    {
        id: 'quran_100',
        icon: '📖',
        bn: 'কুরআনের পথে',
        en: 'Quran Journey',
        descBn: '১০০ পৃষ্ঠা কুরআন পড়েছেন',
        descEn: 'Read 100 pages of Quran',
        check: (appData) => {
            const total = Object.values(appData.days || {}).reduce(
                (sum, d) => sum + (Number(d.quran?.pagesRead) || 0), 0
            );
            return total >= 100;
        },
    },
    {
        id: 'fasting_10',
        icon: '🌟',
        bn: 'রোজার সাধক',
        en: 'Fasting Champion',
        descBn: '১০ দিন রোজা রেখেছেন',
        descEn: 'Fasted for 10 days',
        check: (appData) => {
            const count = Object.values(appData.days || {}).filter(d => d.roza).length;
            return count >= 10;
        },
    },
    {
        id: 'all_prayers',
        icon: '🕌',
        bn: 'নামাজের হেফাজতকারী',
        en: 'Prayer Guardian',
        descBn: 'একদিনে পাঁচ ওয়াক্ত নামাজ সম্পন্ন',
        descEn: 'Completed all 5 prayers in a day',
        check: (appData) => {
            return Object.values(appData.days || {}).some(d => {
                const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
                return prayers.every(p => {
                    const pd = d.salah?.[p];
                    return (typeof pd === 'object' && pd?.fard) || pd === true;
                });
            });
        },
    },
];

/**
 * Check which new badges the user has earned and return them.
 */
export const checkNewBadges = (appData) => {
    const earned = appData.profile?.badges || [];
    const newBadges = [];
    for (const badge of BADGES) {
        if (!earned.includes(badge.id) && badge.check(appData)) {
            newBadges.push(badge.id);
        }
    }
    return newBadges;
};

/**
 * Calculate level from XP. Level = floor(XP / 100) + 1.
 */
export const calculateLevel = (totalXp) => Math.floor((totalXp || 0) / 100) + 1;

const GamificationModal = ({ isOpen, onClose, day, newBadgeIds = [] }) => {
    const { appData, language } = useApp();
    const t = (key) => translations[language][key] || key;

    const totalXp = appData.profile?.totalXp || 0;
    const level = calculateLevel(totalXp);
    const xpToNextLevel = 100 - (totalXp % 100);

    const newBadges = BADGES.filter(b => newBadgeIds.includes(b.id));

    useEffect(() => {
        if (isOpen) {
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#10b981', '#f59e0b', '#3b82f6']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#10b981', '#f59e0b', '#3b82f6']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            frame();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in text-center overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* Background Decorative Glow */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-300 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-300 rounded-full blur-3xl opacity-30"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <Trophy className="w-12 h-12 text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {t('levelUp')}
                </h2>

                <p className="text-gray-600 mb-4">
                    {language === 'bn'
                        ? `মাশাআল্লাহ! আপনি রমজানের ${day} তম দিনটি সফলভাবে সম্পন্ন করেছেন।`
                        : `MashaAllah! You have successfully completed Day ${day} of Ramadan.`}
                </p>

                {/* Level & XP */}
                <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-slate-700 font-bold">
                            <Zap className="w-4 h-4 text-amber-500" />
                            {language === 'bn' ? `লেভেল ${level}` : `Level ${level}`}
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                            {language === 'bn' ? `পরবর্তী লেভেলে ${xpToNextLevel} পয়েন্ট বাকি` : `${xpToNextLevel} pts to next level`}
                        </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                            style={{ width: `${((totalXp % 100) / 100) * 100}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-bold">
                        {language === 'bn' ? `মোট: ${totalXp} ইস্তিকামাত পয়েন্ট` : `Total: ${totalXp} Consistency Points`}
                    </p>
                </div>

                {/* New Badges */}
                {newBadges.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-3">
                            {language === 'bn' ? '🏅 নতুন ব্যাজ অর্জিত!' : '🏅 New Badges Unlocked!'}
                        </p>
                        <div className="space-y-2">
                            {newBadges.map(badge => (
                                <div key={badge.id} className="flex items-center gap-3 bg-amber-50 rounded-2xl p-3 border border-amber-100">
                                    <span className="text-2xl">{badge.icon}</span>
                                    <div className="text-left">
                                        <p className="font-black text-slate-800 text-sm">{language === 'bn' ? badge.bn : badge.en}</p>
                                        <p className="text-xs text-slate-400">{language === 'bn' ? badge.descBn : badge.descEn}</p>
                                    </div>
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 ml-auto flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Default badge if no new ones */}
                {newBadges.length === 0 && (
                    <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-100">
                        <div className="flex items-center justify-center gap-2 text-amber-600 font-bold mb-1">
                            <Star className="w-5 h-5 fill-current" />
                            {language === 'bn' ? 'ইস্তিকামাতের মুকুট' : 'Crown of Consistency'}
                        </div>
                        <p className="text-xs text-amber-700">
                            {language === 'bn' ? 'প্রতিদিনের ধারাবাহিকতাই সবচেয়ে বড় পুরস্কার।' : 'Daily consistency is the greatest reward.'}
                        </p>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="w-full btn-primary bg-emerald-600 hover:bg-emerald-700 py-3 text-lg shadow-lg shadow-emerald-200"
                >
                    {language === 'bn' ? 'আলহামদুলিল্লাহ' : 'Alhamdulillah'}
                </button>
            </div>
        </div>
    );
};

export default GamificationModal;
