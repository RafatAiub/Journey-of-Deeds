import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
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
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-xl w-full relative z-10">
                {/* Welcome Step */}
                {step === 1 && (
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-fade-in text-center">
                        <div className="mb-10 relative">
                            <div className="relative w-28 h-28 mx-auto mb-8">
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                                <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl overflow-hidden group hover:rotate-0 transition-transform duration-500">
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <img
                                        src="/icon.svg"
                                        alt="Ramadan Planner Logo"
                                        className="w-16 h-16 text-white drop-shadow-lg -rotate-12 group-hover:rotate-0 transition-transform duration-500"
                                    />
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                                {t('welcome')}
                            </h1>
                            <div className="h-1.5 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mb-6"></div>
                            <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent italic">
                                {t('appTitle')}
                            </p>
                        </div>

                        <div className="space-y-6 mb-12">
                            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                                <p className="text-white/90 text-lg leading-relaxed font-medium mb-3">
                                    {t('welcomeMessage')}
                                </p>
                                <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    {t('privacyMessage')}
                                </div>
                            </div>

                            <p className="text-emerald-400 text-lg font-bold leading-relaxed px-4">
                                " {t('startMessage')} "
                            </p>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all duration-300"
                        >
                            {t('letsStart')}
                        </button>
                    </div>
                )}

                {/* Setup Step */}
                {step === 2 && (
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-slide-up">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-3xl font-black text-white italic">
                                {language === 'bn' ? 'রমজান সেটআপ' : 'Ramadan Setup'}
                            </h2>
                            <div className="flex gap-1.5">
                                <div className="w-8 h-1.5 bg-white/20 rounded-full"></div>
                                <div className="w-8 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            {/* Start Date */}
                            <div className="group">
                                <label className="flex items-center gap-3 text-white/70 font-bold mb-4 ml-1">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    {t('ramadanStartDate')}
                                </label>

                                <div className="relative group/input">
                                    <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl blur-xl group-focus-within/input:bg-emerald-500/10 transition-colors"></div>
                                    <div className="relative flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
                                            🌙
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-black text-white text-xl">
                                                {language === 'bn' ? '১৯ ফেব্রুয়ারি, ২০২৬' : 'February 19, 2026'}
                                            </p>
                                            <p className="text-white/40 text-sm font-medium">
                                                {language === 'bn'
                                                    ? '১ রমজান ১৪৪৭ হিজরি (বাংলাদেশ)'
                                                    : '1st Ramadan 1447 AH (Bangladesh)'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-xs text-white/30 mt-4 ml-2 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                    {language === 'bn'
                                        ? 'ভিন্ন তারিখ হলে নিচে থেকে পরিবর্তন করুন:'
                                        : 'Different date? Change below:'}
                                </div>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full mt-2 bg-white/5 border border-white/5 rounded-2xl p-4 text-white/40 focus:text-white focus:border-emerald-500/50 outline-none transition-all font-bold text-sm"
                                />
                            </div>

                            {/* Quran Goal */}
                            <div>
                                <label className="flex items-center gap-3 text-white/70 font-bold mb-4 ml-1">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                        <BookOpen className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    {t('quranGoal')}
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {goalOptions.map((option) => (
                                        <button
                                            key={option.days}
                                            onClick={() => setTargetDays(option.days)}
                                            className={`
                                                relative overflow-hidden group/opt
                                                rounded-3xl py-6 px-4 font-black text-center border-2 
                                                transition-all duration-500 cursor-pointer
                                                ${targetDays === option.days
                                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                                                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:bg-white/10'
                                                }
                                            `}
                                        >
                                            <span className="block text-2xl mb-1">{option.label}</span>
                                            <span className={`block text-[10px] uppercase tracking-widest font-black ${targetDays === option.days ? 'text-emerald-500/60' : 'text-white/20'}`}>
                                                {option.desc}
                                            </span>
                                            {targetDays === option.days && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-8 py-3 px-6 bg-white/5 rounded-full border border-white/5 inline-block mx-auto w-full text-center">
                                    <p className="text-sm text-emerald-400/80 font-black italic">
                                        {language === 'bn'
                                            ? `✨ ${targetDays} দিনে কুরআন খতমের উচ্চাভিলাষী পরিকল্পনা`
                                            : `✨ Ambitious plan: Complete Quran in ${targetDays} days`}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 font-black text-lg border border-white/10 transition-all duration-300 active:scale-[0.98]"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleComplete}
                                    disabled={!startDate}
                                    className="flex-[1.5] py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xl shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-30 disabled:grayscale active:scale-[0.98]"
                                >
                                    {language === 'bn' ? '🚀 শুরু করা যাক' : "🚀 Let's Go"}
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
