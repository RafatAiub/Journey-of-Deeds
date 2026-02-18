import React, { useEffect, useState } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { Trophy, Star, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const GamificationModal = ({ isOpen, onClose, day }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;

    useEffect(() => {
        if (isOpen) {
            // Trigger confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#10b981', '#f59e0b', '#3b82f6'] // Emerald, Amber, Blue
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
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in text-center overflow-hidden">

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

                <p className="text-gray-600 mb-6">
                    {language === 'bn'
                        ? `মাশাআল্লাহ! আপনি রমজানের ${day} তম দিনটি সফলভাবে সম্পন্ন করেছেন।`
                        : `MashaAllah! You have successfully completed Day ${day} of Ramadan.`}
                </p>

                <div className="bg-amber-50 rounded-xl p-4 mb-8 border border-amber-100">
                    <div className="flex items-center justify-center gap-2 text-amber-600 font-bold mb-1">
                        <Star className="w-5 h-5 fill-current" />
                        {language === 'bn' ? 'নতুন ব্যাজ আনলক হয়েছে' : 'New Badge Unlocked'}
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                        {language === 'bn' ? 'ইস্তিকামাতের মুকুট' : 'Crown of Consistency'}
                    </div>
                </div>

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
