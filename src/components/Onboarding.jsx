import React, { useState } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { Sparkles, Calendar, BookOpen } from 'lucide-react';

const Onboarding = () => {
    const { appData, updateData, language } = useApp();
    const t = (key) => translations[language][key] || key;

    const [step, setStep] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [targetDays, setTargetDays] = useState(30);

    const handleComplete = () => {
        updateData({
            profile: {
                ...appData.profile,
                onboardingComplete: true
            },
            ramadanPlan: {
                ...appData.ramadanPlan,
                startDate,
                targetFinishDays: targetDays
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Welcome Step */}
                {step === 1 && (
                    <div className="glass-card animate-fade-in text-center">
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-gradient mb-4">
                                {t('welcome')}
                            </h1>
                            <p className="text-xl text-gray-700 mb-2">
                                {t('appTitle')}
                            </p>
                        </div>

                        <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                            <p className="text-gray-700 mb-3 leading-relaxed">
                                {t('welcomeMessage')}
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('privacyMessage')}
                            </p>
                        </div>

                        <p className="text-lg text-emerald-700 font-medium mb-8">
                            {t('startMessage')}
                        </p>

                        <button
                            onClick={() => setStep(2)}
                            className="btn-primary w-full"
                        >
                            {t('letsStart')}
                        </button>
                    </div>
                )}

                {/* Setup Step */}
                {step === 2 && (
                    <div className="glass-card animate-slide-up">
                        <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
                            {t('ramadanStartDate')}
                        </h2>

                        <div className="space-y-6">
                            {/* Start Date */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                                    <Calendar className="w-5 h-5 text-emerald-600" />
                                    {t('ramadanStartDate')}
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input-field text-lg"
                                    required
                                />
                            </div>

                            {/* Quran Goal */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                                    <BookOpen className="w-5 h-5 text-emerald-600" />
                                    {t('quranGoal')}
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[30, 20, 15].map((days) => (
                                        <button
                                            key={days}
                                            onClick={() => setTargetDays(days)}
                                            className={`toggle-btn ${targetDays === days
                                                    ? 'toggle-btn-active'
                                                    : 'toggle-btn-inactive'
                                                }`}
                                        >
                                            {language === 'bn' ? `${days} দিনে` : `${days} days`}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 mt-3">
                                    {language === 'bn'
                                        ? `${targetDays} দিনে কুরআন খতম করার পরিকল্পনা`
                                        : `Plan to complete Quran in ${targetDays} days`}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="btn-secondary flex-1"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleComplete}
                                    disabled={!startDate}
                                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {t('letsStart')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
