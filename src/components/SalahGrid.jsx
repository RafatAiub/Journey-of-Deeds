import React from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { Check, Users, Moon, Star, Sun } from 'lucide-react';

/**
 * SalahGrid — tracks daily prayers (Fard, Sunnah, Jamaat) and extra prayers.
 * Additions:
 *  - Ishraq and Chasht toggle cards (existed in data model, now have UI)
 */
const SalahGrid = ({ salahData, extraPrayers, onUpdate, onExtraUpdate }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

    const getPrayerData = (key) => {
        const data = salahData[key];
        if (typeof data === 'boolean') return { fard: data, sunnah: false, jamaat: false };
        return data || { fard: false, sunnah: false, jamaat: false };
    };

    const handlePrayerToggle = (prayerKey, type) => {
        const current = getPrayerData(prayerKey);
        let updated = { ...current };
        if (type === 'fard') {
            updated.fard = !current.fard;
            if (!updated.fard) updated.jamaat = false;
        } else if (type === 'jamaat') {
            updated.jamaat = !current.jamaat;
            if (updated.jamaat) updated.fard = true;
        } else if (type === 'sunnah') {
            updated.sunnah = !current.sunnah;
        }
        onUpdate({ ...salahData, [prayerKey]: updated });
    };

    return (
        <section className="card !p-4 sm:!p-8">
            <header className="flex items-center justify-between mb-6 sm:mb-10 px-1 sm:px-2">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-100">
                        <Moon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{t('salah')}</h2>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{language === 'bn' ? 'দৈনিক ইবাদত' : 'Daily Prayers'}</p>
                    </div>
                </div>
            </header>

            {/* 5 Fard Prayers */}
            <div className="space-y-3">
                {prayers.map((prayer) => {
                    const data = getPrayerData(prayer);
                    return (
                        <div key={prayer} className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${data.fard ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`}></div>
                                <h4 className="text-base sm:text-xl font-black text-slate-800 capitalize leading-none">{t(prayer)}</h4>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3">
                                <PrayerCircle
                                    active={data.fard}
                                    onClick={() => handlePrayerToggle(prayer, 'fard')}
                                    icon={<Check size={16} />}
                                    label={t('fard')}
                                    color="emerald"
                                />
                                <PrayerCircle
                                    active={data.jamaat}
                                    onClick={() => handlePrayerToggle(prayer, 'jamaat')}
                                    icon={<Users size={16} />}
                                    label={t('jamaat')}
                                    color="blue"
                                />
                                <button
                                    onClick={() => handlePrayerToggle(prayer, 'sunnah')}
                                    className={`px-3 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all border-2 ${data.sunnah
                                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200 scale-105'
                                        : 'bg-white border-slate-100 text-slate-400 hover:border-amber-300 hover:text-amber-500'
                                        }`}
                                >
                                    {t('sunnah')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Extra Prayers: Tarawih, Tahajjud, Ishraq, Chasht */}
            <div className="mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-10 border-t border-slate-100">

                {/* Tarawih */}
                <div className={`p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] transition-all border-2 ${extraPrayers.tarawih > 0 ? 'bg-indigo-50 border-indigo-100 shadow-inner' : 'bg-slate-50 border-slate-50'}`}>
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h4 className="text-base sm:text-xl font-black text-slate-800 flex items-center gap-2 sm:gap-3">
                            <Moon className="text-indigo-600 w-5 h-5" /> {t('tarawih')}
                        </h4>
                        <span className="text-xl sm:text-2xl font-black text-indigo-600 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-sm">
                            {extraPrayers.tarawih || 0}
                        </span>
                    </div>
                    <input
                        type="range" min="0" max="20" step="2"
                        value={extraPrayers.tarawih || 0}
                        onChange={(e) => onExtraUpdate({ ...extraPrayers, tarawih: parseInt(e.target.value) })}
                        className="w-full h-3 bg-indigo-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all"
                    />
                </div>

                {/* Tahajjud */}
                <div
                    onClick={() => onExtraUpdate({ ...extraPrayers, tahajjud: !extraPrayers.tahajjud })}
                    className={`p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] cursor-pointer transition-all border-2 group ${extraPrayers.tahajjud ? 'bg-amber-50 border-amber-100 shadow-inner' : 'bg-slate-50 border-slate-50'}`}
                >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="text-base sm:text-xl font-black text-slate-800 flex items-center gap-2 sm:gap-3">
                            <Star className={`w-5 h-5 ${extraPrayers.tahajjud ? 'text-amber-600 fill-amber-600' : 'text-slate-400'}`} />
                            {t('tahajjud')}
                        </h4>
                        <div className={`w-8 h-8 rounded-full border-4 transition-all ${extraPrayers.tahajjud ? 'bg-amber-500 border-amber-200 scale-110 shadow-lg shadow-amber-200' : 'border-slate-200'}`}></div>
                    </div>
                    <p className={`text-sm italic font-medium leading-relaxed ${extraPrayers.tahajjud ? 'text-amber-800' : 'text-slate-400'}`}>
                        "{t('tahajjudMotivation')}"
                    </p>
                </div>

                {/* Ishraq — was in data model but had no UI */}
                <div
                    onClick={() => onExtraUpdate({ ...extraPrayers, ishraq: !extraPrayers.ishraq })}
                    className={`p-6 rounded-[2rem] cursor-pointer transition-all border-2 group ${extraPrayers.ishraq ? 'bg-orange-50 border-orange-100 shadow-inner' : 'bg-slate-50 border-slate-50 hover:border-orange-100'}`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sun className={`w-6 h-6 ${extraPrayers.ishraq ? 'text-orange-500' : 'text-slate-400'}`} />
                            <div>
                                <h4 className="text-lg font-black text-slate-800">{t('ishraq')}</h4>
                                <p className={`text-xs font-bold ${extraPrayers.ishraq ? 'text-orange-600' : 'text-slate-400'}`}>
                                    {language === 'bn' ? 'সূর্যোদয়ের পর' : 'After sunrise'}
                                </p>
                            </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-4 transition-all ${extraPrayers.ishraq ? 'bg-orange-500 border-orange-200 scale-110 shadow-lg shadow-orange-200' : 'border-slate-200'}`}></div>
                    </div>
                </div>

                {/* Chasht — was in data model but had no UI */}
                <div
                    onClick={() => onExtraUpdate({ ...extraPrayers, chasht: !extraPrayers.chasht })}
                    className={`p-6 rounded-[2rem] cursor-pointer transition-all border-2 group ${extraPrayers.chasht ? 'bg-yellow-50 border-yellow-100 shadow-inner' : 'bg-slate-50 border-slate-50 hover:border-yellow-100'}`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sun className={`w-6 h-6 ${extraPrayers.chasht ? 'text-yellow-500' : 'text-slate-400'}`} />
                            <div>
                                <h4 className="text-lg font-black text-slate-800">{t('chasht')}</h4>
                                <p className={`text-xs font-bold ${extraPrayers.chasht ? 'text-yellow-600' : 'text-slate-400'}`}>
                                    {language === 'bn' ? 'চাশতের সময়' : 'Forenoon prayer'}
                                </p>
                            </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-4 transition-all ${extraPrayers.chasht ? 'bg-yellow-500 border-yellow-200 scale-110 shadow-lg shadow-yellow-200' : 'border-slate-200'}`}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PrayerCircle = ({ active, onClick, icon, label, color }) => {
    const colors = {
        emerald: 'bg-emerald-500 shadow-emerald-200 border-emerald-400',
        blue: 'bg-blue-500 shadow-blue-200 border-blue-400 text-white'
    };

    return (
        <button
            onClick={onClick}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 relative group/btn ${active
                ? `${colors[color]} text-white shadow-xl scale-110 -translate-y-1`
                : 'bg-white border-slate-100 text-slate-300 hover:border-slate-300 hover:text-slate-400'
                }`}
        >
            {icon}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none font-bold">
                {label}
            </span>
        </button>
    );
};

export default SalahGrid;
