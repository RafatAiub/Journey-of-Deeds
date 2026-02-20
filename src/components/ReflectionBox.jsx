import React, { useState, useCallback, useRef } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { PenLine, Heart, Trophy, BookOpen, CheckCircle, Shield } from 'lucide-react';
import SawabBadge from './SawabBadge';
import { getSawab } from '../data/sawabData';

/**
 * ReflectionBox — daily reflection, achievement, and gratitude journal.
 * Auto-save visual feedback: shows a brief "Saved" indicator after each change.
 */
const ReflectionBox = ({ reflectionData, onUpdate }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;
    const [showSaved, setShowSaved] = useState(false);
    const saveTimerRef = useRef(null);

    const data = {
        note: reflectionData.note || '',
        achievement: reflectionData.achievement || '',
        gratitude1: reflectionData.gratitude1 || '',
        gratitude2: reflectionData.gratitude2 || '',
        gratitude3: reflectionData.gratitude3 || '',
    };

    const handleChange = useCallback((field, value) => {
        onUpdate({ ...reflectionData, [field]: value });

        // Show saved indicator
        setShowSaved(true);
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => setShowSaved(false), 2000);
    }, [reflectionData, onUpdate]);

    return (
        <section className="card !p-8 border-transparent bg-gradient-to-br from-purple-50 to-pink-50/50">
            <header className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-100">
                    <PenLine className="text-white w-7 h-7" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('todaysReflection')}</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                        {language === 'bn' ? 'ব্যক্তিগত ভাবনার প্রতিফলন' : 'Mindful Reflection'}
                    </p>
                </div>

                {/* Auto-save indicator */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-500 ${showSaved
                    ? 'opacity-100 bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'opacity-0'
                    }`}>
                    <CheckCircle className="w-3.5 h-3.5" />
                    {language === 'bn' ? 'সংরক্ষিত' : 'Saved'}
                </div>
            </header>

            {/* Sawab motivation */}
            {(() => {
                const s = getSawab('reflection', language);
                return s && (
                    <div className="mb-6">
                        <SawabBadge reward={s.reward} source={s.source} detail={s.detail} color="purple" />
                    </div>
                );
            })()}

            <div className="space-y-6">
                {/* What did you learn today? */}
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-purple-100/30 border border-purple-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-400"></div>
                    <label className="flex items-center gap-3 text-slate-800 font-black mb-4 px-2">
                        <BookOpen className="w-5 h-5 text-purple-500" />
                        {t('whatDidYouLearn')}
                    </label>
                    <textarea
                        value={data.note}
                        onChange={(e) => handleChange('note', e.target.value)}
                        placeholder={
                            language === 'bn'
                                ? 'আজ কোনো আয়াত, হাদীস বা ঘটনা থেকে কী শিখলেন?'
                                : 'What did you learn from an ayah, hadith, or experience today?'
                        }
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-purple-500 transition-all outline-none resize-none"
                        rows="3"
                    />
                </div>

                {/* Special Achievement */}
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-amber-100/30 border border-amber-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
                    <label className="flex items-center gap-3 text-slate-800 font-black mb-4 px-2">
                        <Trophy className="w-5 h-5 text-amber-500" />
                        {t('specialAchievement')}
                    </label>
                    <textarea
                        value={data.achievement}
                        onChange={(e) => handleChange('achievement', e.target.value)}
                        placeholder={t('achievementPlaceholder')}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-amber-500 transition-all outline-none resize-none"
                        rows="3"
                    />
                </div>

                {/* 3 Gratitudes */}
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-pink-100/30 border border-pink-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-pink-400"></div>
                    <label className="flex items-center gap-3 text-slate-800 font-black mb-6 px-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        {t('gratitudeTitle')}
                    </label>

                    <div className="space-y-4">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="group relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-black group-focus-within:bg-pink-500 group-focus-within:text-white transition-all">
                                    {num}
                                </span>
                                <input
                                    type="text"
                                    value={data[`gratitude${num}`]}
                                    onChange={(e) => handleChange(`gratitude${num}`, e.target.value)}
                                    placeholder={t('gratitudePlaceholder')}
                                    className="w-full pl-16 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Persistent auto-save notice */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                <Shield className="w-3.5 h-3.5" />
                {language === 'bn'
                    ? 'আপনার সব তথ্য ব্রাউজারে স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়'
                    : 'All your data is auto-saved locally on your device'}
            </div>
        </section>
    );
};

export default ReflectionBox;
