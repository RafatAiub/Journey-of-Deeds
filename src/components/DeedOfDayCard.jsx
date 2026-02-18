import React from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { Sparkles, Star } from 'lucide-react';

const DeedOfDayCard = ({ ramadanDay }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;

    const deedIndex = Math.max(0, Math.min(ramadanDay - 1, 29));
    const deed = translations[language].deeds?.[deedIndex];

    if (!deed || ramadanDay <= 0) return null;

    return (
        <section className="card !p-10 border-transparent bg-gradient-to-br from-amber-50 to-orange-50/50 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl group-hover:bg-amber-300/30 transition-all duration-700"></div>

            <header className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-200 animate-float">
                    <Sparkles className="text-white w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('deedOfDay')}</h2>
                    <p className="text-amber-600 text-xs font-black uppercase tracking-widest">{language === 'bn' ? 'আজকের বিশেষ আমল' : 'Daily Challenge'}</p>
                </div>
            </header>

            <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl shadow-amber-200/40 border border-white/50 relative">
                    <div className="absolute -top-4 -left-4 text-4xl text-amber-200 opacity-50">“</div>
                    <p className="text-xl md:text-2xl text-slate-800 leading-relaxed text-center font-black tracking-tight italic">
                        {deed}
                    </p>
                    <div className="absolute -bottom-4 -right-4 text-4xl text-amber-200 opacity-50 rotate-180">“</div>
                </div>
            </div>

            <footer className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Star size={12} fill="currentColor" />
                    {language === 'bn' ? 'আজকের ছোট লক্ষ্য' : 'Your Mission Today'}
                </div>
            </footer>
        </section>
    );
};


export default DeedOfDayCard;
