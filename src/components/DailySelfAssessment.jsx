import React from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { MessageCircle, Smartphone, Heart, Brain, Check } from 'lucide-react';

const DailySelfAssessment = ({ assessmentData = {}, onUpdate }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;

    const handleToggle = (key) => {
        const updated = {
            ...assessmentData,
            [key]: !assessmentData[key]
        };
        onUpdate(updated);
    };

    const colorMap = {
        blue: {
            border: 'border-blue-200 dark:border-blue-800/50',
            bg: 'bg-blue-500',
            shadow: 'shadow-blue-100/50 dark:shadow-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400'
        },
        purple: {
            border: 'border-purple-200 dark:border-purple-800/50',
            bg: 'bg-purple-500',
            shadow: 'shadow-purple-100/50 dark:shadow-purple-900/20',
            text: 'text-purple-600 dark:text-purple-400'
        },
        pink: {
            border: 'border-pink-200 dark:border-pink-800/50',
            bg: 'bg-pink-500',
            shadow: 'shadow-pink-100/50 dark:shadow-pink-900/20',
            text: 'text-pink-600 dark:text-pink-400'
        },
        indigo: {
            border: 'border-indigo-200 dark:border-indigo-800/50',
            bg: 'bg-indigo-500',
            shadow: 'shadow-indigo-100/50 dark:shadow-indigo-900/20',
            text: 'text-indigo-600 dark:text-indigo-400'
        }
    };

    const CheckItem = ({ id, label, activeColor }) => {
        const colors = colorMap[activeColor];
        return (
            <div
                onClick={() => handleToggle(id)}
                className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 ${assessmentData[id]
                    ? `bg-white dark:bg-slate-900 ${colors.border} shadow-lg ${colors.shadow}`
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
            >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${assessmentData[id]
                    ? `${colors.bg} ${colors.border}`
                    : 'border-slate-300 dark:border-slate-700'
                    }`}>
                    {assessmentData[id] && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
                </div>
                <label className={`text-sm font-bold transition-colors cursor-pointer leading-tight ${assessmentData[id] ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-500'}`}>
                    {label}
                </label>
            </div>
        );
    };

    const Section = ({ icon: Icon, title, activeColor, items }) => {
        const colors = colorMap[activeColor];
        return (
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-md flex items-center justify-center ${colors.text}`}>
                        <Icon size={20} />
                    </div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
                        {title}
                    </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((item) => (
                        <CheckItem key={item.id} id={item.id} label={item.label} activeColor={activeColor} />
                    ))}
                </div>
            </div>
        );
    };

    const sections = [
        {
            id: 'behavior',
            icon: MessageCircle,
            title: t('behaviorAndCharacter'),
            activeColor: 'blue',
            items: [
                { id: 'avoidBadBehavior', label: t('avoidBadBehavior') },
                { id: 'avoidBackbiting', label: t('avoidBackbiting') },
                { id: 'controlAnger', label: t('controlAnger') },
                { id: 'wasForgiving', label: t('wasForgiving') }
            ]
        },
        {
            id: 'worldly',
            icon: Smartphone,
            title: t('worldlyControl'),
            activeColor: 'purple',
            items: [
                { id: 'avoidMobile', label: t('avoidUnnecessaryMobile') },
                { id: 'avoidSocialMedia', label: t('avoidSocialMedia') },
                { id: 'protectEyes', label: t('protectedFromBad') }
            ]
        },
        {
            id: 'charity',
            icon: Heart,
            title: t('charityAndCompassion'),
            activeColor: 'pink',
            items: [
                { id: 'gaveCharity', label: t('gaveCharity') },
                { id: 'helpedSomeone', label: t('helpedSomeone') }
            ]
        },
        {
            id: 'intention',
            icon: Brain,
            title: t('intentionAndImprovement'),
            activeColor: 'indigo',
            items: [
                { id: 'repented', label: t('repentedToAllah') },
                { id: 'builtHabit', label: t('triedGoodHabit') },
                { id: 'expressedGratitude', label: t('expressedGratitudeToday') },
                { id: 'reflected', label: t('reflectedOnDeeds') }
            ]
        }
    ];

    const completedCount = Object.values(assessmentData).filter(Boolean).length;

    return (
        <section className="card !p-8 border-transparent bg-slate-50/50 dark:bg-slate-800/20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {t('dailySelfAssessment')}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">
                        {language === 'bn' ? 'ব্যক্তিগত চরিত্র নির্মাণের একটি মাধ্যম' : 'A mirror for personal growth'}
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-slate-950/20 border border-slate-100 dark:border-slate-800">
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Completion</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{completedCount}<small className="text-slate-300 dark:text-slate-600 text-sm">/13</small></p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center relative">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-emerald-500 transition-all duration-1000" strokeDasharray={126} strokeDashoffset={126 - (completedCount / 13) * 126} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Check size={16} className={completedCount === 13 ? 'text-emerald-500' : 'text-slate-200 dark:text-slate-700'} strokeWidth={4} />
                        </div>
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                {sections.map(section => (
                    <Section key={section.id} {...section} />
                ))}
            </div>
        </section>
    );
};

export default DailySelfAssessment;
