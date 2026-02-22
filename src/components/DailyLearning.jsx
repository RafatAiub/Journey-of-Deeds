import React from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { BookOpen, Scroll, Moon, Sun, Heart, AlertCircle } from 'lucide-react';
import SawabBadge from './SawabBadge';
import { getSawab } from '../data/sawabData';

const DailyLearning = ({ learningData, onUpdate, dayNumber }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;

    const dailyContent = translations[language].dailyContent || [];
    const contentIndex = (dayNumber - 1) % dailyContent.length;
    const todayContent = dailyContent[contentIndex] || {};

    const handleToggle = (key) => {
        onUpdate({ ...learningData, [key]: !learningData[key] });
    };

    const learningColorMap = {
        emerald: {
            hoverShadow: 'hover:shadow-emerald-100/50 dark:hover:shadow-emerald-950/20',
            border: 'border-emerald-200 dark:border-emerald-800/50',
            bgLight: 'bg-emerald-50/30 dark:bg-emerald-900/10',
            text: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-500',
            borderSolid: 'border-emerald-500',
            shadow: 'shadow-emerald-200 dark:shadow-emerald-900/30'
        },
        blue: {
            hoverShadow: 'hover:shadow-blue-100/50 dark:hover:shadow-blue-950/20',
            border: 'border-blue-200 dark:border-blue-800/50',
            bgLight: 'bg-blue-50/30 dark:bg-blue-900/10',
            text: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-500',
            borderSolid: 'border-blue-500',
            shadow: 'shadow-blue-200 dark:shadow-blue-900/30'
        },
        purple: {
            hoverShadow: 'hover:shadow-purple-100/50 dark:hover:shadow-purple-950/20',
            border: 'border-purple-200 dark:border-purple-800/50',
            bgLight: 'bg-purple-50/30 dark:bg-purple-900/10',
            text: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-500',
            borderSolid: 'border-purple-500',
            shadow: 'shadow-purple-200 dark:shadow-purple-900/30'
        },
        amber: {
            hoverShadow: 'hover:shadow-amber-100/50 dark:hover:shadow-amber-950/20',
            border: 'border-amber-200 dark:border-amber-800/50',
            bgLight: 'bg-amber-50/30 dark:bg-amber-900/10',
            text: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-500',
            borderSolid: 'border-amber-500',
            shadow: 'shadow-amber-200 dark:shadow-amber-900/30'
        },
        rose: {
            hoverShadow: 'hover:shadow-rose-100/50 dark:hover:shadow-rose-950/20',
            border: 'border-rose-200 dark:border-rose-800/50',
            bgLight: 'bg-rose-50/30 dark:bg-rose-900/10',
            text: 'text-rose-600 dark:text-rose-400',
            bg: 'bg-rose-500',
            borderSolid: 'border-rose-500',
            shadow: 'shadow-rose-200 dark:shadow-rose-900/30'
        },
        teal: {
            hoverShadow: 'hover:shadow-teal-100/50 dark:hover:shadow-teal-950/20',
            border: 'border-teal-200 dark:border-teal-800/50',
            bgLight: 'bg-teal-50/30 dark:bg-teal-900/10',
            text: 'text-teal-600 dark:text-teal-400',
            bg: 'bg-teal-500',
            borderSolid: 'border-teal-500',
            shadow: 'shadow-teal-200 dark:shadow-teal-900/30'
        }
    };

    const LearningItem = ({ icon: Icon, title, content, id, color }) => {
        const colors = learningColorMap[color];
        return (
            <div className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-500 bg-white dark:bg-slate-900 ${colors.hoverShadow} ${learningData[id] ? `${colors.border} ${colors.bgLight}` : 'border-slate-50 dark:border-slate-800'}`}>
                <header className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-md dark:shadow-slate-950/20 ${colors.text}`}>
                            <Icon size={18} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                            {title}
                        </h4>
                    </div>

                    <button
                        onClick={() => handleToggle(id)}
                        className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 scale-90 sm:scale-100 ${learningData[id]
                            ? `${colors.bg} ${colors.borderSolid} text-white shadow-lg ${colors.shadow} rotate-[360deg]`
                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                            }`}
                    >
                        <Check className="w-5 h-5" />
                    </button>
                </header>

                <div className={`relative px-1 ${learningData[id] ? 'opacity-60' : 'opacity-100'} transition-opacity`}>
                    <p className="text-slate-900 dark:text-white font-bold leading-relaxed text-sm lg:text-base">
                        {content || '...'}
                    </p>
                </div>

                {/* Completion Badge */}
                <div className={`absolute top-4 right-16 px-3 py-1 rounded-full ${colors.bg} text-white text-[10px] font-black uppercase tracking-widest transition-all duration-700 ${learningData[id] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    Completed
                </div>
            </div>
        );
    };

    return (
        <section className="card !p-8 border-transparent bg-slate-50/50 dark:bg-slate-800/20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {t('dailyLearning')}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">
                        {language === 'bn' ? 'প্রতিদিনের ছোট জ্ঞান ও স্মরণ' : 'Bites of wisdom for daily growth'}
                    </p>
                </div>
                <div className="flex -space-x-3">
                    {[BookOpen, Scroll, Moon, Sun, Heart].map((Icon, i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-sm z-[5-i]">
                            <Icon size={14} />
                        </div>
                    ))}
                </div>
            </header>

            {/* Sawab motivation */}
            {(() => {
                const s = getSawab('dailyLearning', language);
                return s && (
                    <div className="mb-6">
                        <SawabBadge reward={s.reward} source={s.source} detail={s.detail} color="emerald" />
                    </div>
                );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <LearningItem id="ayah" icon={BookOpen} title={t('dailyAyah')} content={todayContent.ayah} color="emerald" />
                <LearningItem id="hadith" icon={Scroll} title={t('dailyHadith')} content={todayContent.hadith} color="blue" />
                <LearningItem id="dua" icon={Moon} title={t('dailyDua')} content={todayContent.dua} color="purple" />
                <LearningItem id="sunnah" icon={Sun} title={t('dailySunnah')} content={todayContent.sunnah} color="amber" />
                <LearningItem id="masala" icon={AlertCircle} title={t('dailyMasala')} content={todayContent.masala} color="rose" />
                <LearningItem id="iman" icon={Heart} title={t('dailyIman')} content={todayContent.iman} color="teal" />
            </div>
        </section>
    );
};

const Check = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default DailyLearning;
