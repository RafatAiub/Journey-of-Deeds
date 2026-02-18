import React, { useState } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { Sparkles, Calendar, BookOpen, Check } from 'lucide-react';

// Ramadan 2026 start date for Bangladesh
const RAMADAN_START_DATE = '2026-02-19';

const Onboarding = () => {
    const { appData, updateData, language } = useApp();
    const t = (key) => translations[language][key] || key;

    const [step, setStep] = useState(1);
    const [startDate, setStartDate] = useState(RAMADAN_START_DATE);
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

    const goalOptions = [
        { days: 30, label: language === 'bn' ? '৩০ দিনে' : '30 days', desc: language === 'bn' ? 'প্রতিদিন ১ পারা' : '1 para/day' },
        { days: 20, label: language === 'bn' ? '২০ দিনে' : '20 days', desc: language === 'bn' ? 'প্রতিদিন ১.৫ পারা' : '1.5 para/day' },
        { days: 15, label: language === 'bn' ? '১৫ দিনে' : '15 days', desc: language === 'bn' ? 'প্রতিদিন ২ পারা' : '2 para/day' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-emerald-50/50 to-white">
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
                            {language === 'bn' ? 'রমজান সেটআপ' : 'Ramadan Setup'}
                        </h2>

                        <div className="space-y-8">
                            {/* Start Date — Pre-filled */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-bold mb-3">
                                    <Calendar className="w-5 h-5 text-emerald-600" />
                                    {t('ramadanStartDate')}
                                </label>

                                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl flex-shrink-0">
                                        🌙
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-emerald-800 text-lg">
                                            {language === 'bn' ? '১৯ ফেব্রুয়ারি, ২০২৬' : 'February 19, 2026'}
                                        </p>
                                        <p className="text-emerald-600 text-sm font-medium">
                                            {language === 'bn'
                                                ? '১ রমজান ১৪৪৭ হিজরি (বাংলাদেশ)'
                                                : '1st Ramadan 1447 AH (Bangladesh)'}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <p className="text-xs text-gray-400 mt-2 ml-1">
                                    {language === 'bn'
                                        ? 'ভিন্ন তারিখ হলে নিচে পরিবর্তন করুন:'
                                        : 'Different date? Change below:'}
                                </p>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input-field text-sm mt-1 opacity-60 focus:opacity-100 transition-opacity"
                                />
                            </div>

                            {/* Quran Goal — with proper inline styling */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-bold mb-3">
                                    <BookOpen className="w-5 h-5 text-emerald-600" />
                                    {t('quranGoal')}
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {goalOptions.map((option) => (
                                        <button
                                            key={option.days}
                                            onClick={() => setTargetDays(option.days)}
                                            className={`
                                                rounded-2xl py-4 px-3 font-bold text-center border-2 
                                                transition-all duration-300 cursor-pointer
                                                ${targetDays === option.days
                                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-4 ring-emerald-500/10 scale-105'
                                                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50'
                                                }
                                            `}
                                            style={targetDays === option.days ? { boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)' } : {}}
                                        >
                                            <span className="block text-lg">{option.label}</span>
                                            <span className={`block text-xs mt-1 ${targetDays === option.days ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                {option.desc}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-3 font-medium text-center">
                                    {language === 'bn'
                                        ? `📖 ${targetDays} দিনে কুরআন খতমের পরিকল্পনা`
                                        : `📖 Plan to complete Quran in ${targetDays} days`}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-2">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 rounded-2xl px-6 py-4 font-bold bg-slate-50 text-slate-700 border-2 border-slate-200 hover:bg-slate-100 active:scale-95 transition-all duration-200"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleComplete}
                                    disabled={!startDate}
                                    className="flex-1 rounded-2xl px-6 py-4 font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500 hover:shadow-lg hover:shadow-emerald-200"
                                >
                                    {language === 'bn' ? '🚀 শুরু করুন' : "🚀 Let's Start"}
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
