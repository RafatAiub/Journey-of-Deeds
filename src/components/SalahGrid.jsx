import React from 'react';
import { useApp } from '../utils/AppContext';
import { translations } from '../utils/language';
import { Check, Users, Moon, Star, Sun, Sparkles, History } from 'lucide-react';
import SawabBadge from './SawabBadge';
import { getSawab } from '../data/sawabData';

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
        if (typeof data === 'boolean') return { fard: data, sunnah: false, jamaat: false, qaza: false };
        return { fard: false, sunnah: false, jamaat: false, qaza: false, ...(data || {}) };
    };

    const handlePrayerToggle = (prayerKey, type) => {
        const current = getPrayerData(prayerKey);
        let updated = { ...current };
        if (type === 'fard') {
            updated.fard = !current.fard;
            if (updated.fard) {
                updated.qaza = false;
            } else {
                updated.jamaat = false;
            }
        } else if (type === 'jamaat') {
            updated.jamaat = !current.jamaat;
            if (updated.jamaat) {
                updated.fard = true;
                updated.qaza = false;
            }
        } else if (type === 'sunnah') {
            updated.sunnah = !current.sunnah;
        } else if (type === 'qaza') {
            updated.qaza = !current.qaza;
            if (updated.qaza) {
                updated.fard = false;
                updated.jamaat = false;
            }
        }
        onUpdate({ ...salahData, [prayerKey]: updated });
    };

    return (
        <section className="card !p-4 sm:!p-8">
            <header className="flex items-center justify-between mb-6 sm:mb-10 px-1 sm:px-2">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-100 dark:shadow-blue-900/20">
                        <Moon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('salah')}</h2>
                        <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">{language === 'bn' ? 'দৈনিক ইবাদত' : 'Daily Prayers'}</p>
                    </div>
                </div>
            </header>

            {/* Sawab Motivation Banner */}
            {(() => {
                const sawab = getSawab('salahFard', language);
                return sawab && (
                    <SawabBadge
                        reward={sawab.reward}
                        source={sawab.source}
                        detail={sawab.detail}
                        color="blue"
                    />
                );
            })()}

            <div className="mt-4"></div>

            {/* 5 Fard Prayers */}
            <div className="space-y-3">
                {prayers.map((prayer) => {
                    const data = getPrayerData(prayer);
                    // Show prayer-specific sawab for fajr & isha (Special row-level rewards)
                    const prayerSawab = (prayer === 'fajr' || prayer === 'isha') ? getSawab(prayer, language) : null;

                    return (
                        <div key={prayer}>
                            <div className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${data.fard ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                    <div className="flex flex-col">
                                        <h4 className="text-base sm:text-xl font-black text-slate-800 dark:text-white capitalize leading-none flex items-center gap-2">
                                            {t(prayer)}
                                            {data.fard && <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />}
                                        </h4>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            {data.jamaat && <span className="text-[9px] font-black bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-md uppercase tracking-tighter shadow-sm animate-fade-in">+27x</span>}
                                            {data.sunnah && <span className="text-[9px] font-black bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-md uppercase tracking-tighter shadow-sm animate-fade-in">+Sunnah</span>}
                                        </div>
                                    </div>
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
                                    <PrayerCircle
                                        active={data.qaza}
                                        onClick={() => handlePrayerToggle(prayer, 'qaza')}
                                        icon={<History size={16} />}
                                        label={t('qaza')}
                                        color="red"
                                    />
                                    <button
                                        onClick={() => handlePrayerToggle(prayer, 'sunnah')}
                                        className={`px-2 sm:px-6 py-2 rounded-xl text-[10px] sm:text-sm font-black transition-all border-2 ${data.sunnah
                                            ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30 scale-105'
                                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-amber-300 dark:hover:border-amber-700 hover:text-amber-500 dark:hover:text-amber-400'
                                            }`}
                                    >
                                        {t('sunnah')}
                                    </button>
                                </div>
                            </div>

                            {/* Row-Specific Special Rewards (Fajr/Isha only) */}
                            {data.fard && prayerSawab && (
                                <div className="mt-1.5 px-2 animate-fade-in">
                                    <SawabBadge reward={prayerSawab.reward} source={prayerSawab.source} color={prayer === 'fajr' ? 'amber' : 'indigo'} compact />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Consolidated Motivation Area (Active Blessings) */}
            {(() => {
                const hasAnyJamaat = prayers.some(p => getPrayerData(p).jamaat);
                const hasAnySunnah = prayers.some(p => getPrayerData(p).sunnah);

                if (!hasAnyJamaat && !hasAnySunnah) return null;

                const jamaatSawab = getSawab('salahJamaat', language);
                const sunnahSawab = getSawab('salahSunnah', language);

                return (
                    <div className="mt-8 space-y-3 bg-slate-50/50 dark:bg-slate-800/30 p-4 sm:p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 animate-fade-in">
                        <h5 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">
                            {language === 'bn' ? 'অর্জিত বারাকাহ ও পুরস্কার' : 'Active Blessings & Rewards'}
                        </h5>
                        {hasAnyJamaat && jamaatSawab && (
                            <SawabBadge reward={jamaatSawab.reward} source={jamaatSawab.source} color="blue" />
                        )}
                        {hasAnySunnah && sunnahSawab && (
                            <SawabBadge reward={sunnahSawab.reward} source={sunnahSawab.source} color="amber" />
                        )}
                    </div>
                );
            })()}

            {/* Extra Prayers: Tarawih, Tahajjud, Ishraq, Chasht */}
            <div className="mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-10 border-t border-slate-100 dark:border-slate-800">

                {/* Tahajjud */}
                <div
                    onClick={() => onExtraUpdate({ ...extraPrayers, tahajjud: !extraPrayers.tahajjud })}
                    className={`p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] cursor-pointer transition-all border-2 group ${extraPrayers.tahajjud ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30 shadow-inner' : 'bg-slate-50 dark:bg-slate-800/30 border-slate-50 dark:border-slate-800/20'}`}
                >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="text-base sm:text-xl font-black text-slate-800 dark:text-white flex items-center gap-2 sm:gap-3">
                            <Star className={`w-5 h-5 ${extraPrayers.tahajjud ? 'text-amber-600 fill-amber-600' : 'text-slate-400 dark:text-slate-500'}`} />
                            {t('tahajjud')}
                        </h4>
                        <div className={`w-8 h-8 rounded-full border-4 transition-all ${extraPrayers.tahajjud ? 'bg-amber-500 border-amber-200 scale-110 shadow-lg shadow-amber-200 dark:shadow-amber-900/30' : 'border-slate-200 dark:border-slate-700'}`}></div>
                    </div>
                    <p className={`text-sm italic font-medium leading-relaxed ${extraPrayers.tahajjud ? 'text-amber-800 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        "{t('tahajjudMotivation')}"
                    </p>
                    {extraPrayers.tahajjud && (() => {
                        const s = getSawab('tahajjud', language);
                        return s && <SawabBadge reward={s.reward} source={s.source} detail={s.detail} color="amber" />;
                    })()}
                </div>

                {/* Ishraq */}
                <div
                    onClick={() => onExtraUpdate({ ...extraPrayers, ishraq: !extraPrayers.ishraq })}
                    className={`p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] cursor-pointer transition-all border-2 group ${extraPrayers.ishraq ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30 shadow-inner' : 'bg-slate-50 dark:bg-slate-800/30 border-slate-50 dark:border-slate-800/20 hover:border-orange-100 dark:hover:border-orange-900/40'}`}
                >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Sun className={`w-5 h-5 sm:w-6 sm:h-6 ${extraPrayers.ishraq ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500'}`} />
                            <div>
                                <h4 className="text-base sm:text-xl font-black text-slate-800 dark:text-white">{t('ishraq')}</h4>
                                <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${extraPrayers.ishraq ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                    {language === 'bn' ? 'সূর্যোদয়ের পর' : 'After sunrise'}
                                </p>
                            </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-4 transition-all ${extraPrayers.ishraq ? 'bg-orange-500 border-orange-200 scale-110 shadow-lg shadow-orange-200 dark:shadow-orange-900/30' : 'border-slate-200 dark:border-slate-700'}`}></div>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                        <p className={`text-sm italic font-medium leading-relaxed ${extraPrayers.ishraq ? 'text-orange-800 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500'}`}>
                            "{t('ishraqMotivation')}"
                        </p>

                        {!extraPrayers.ishraq && (
                            <div className="flex items-center gap-2 bg-orange-100/50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 px-3 py-1.5 rounded-xl w-fit">
                                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                                <span className="text-[10px] sm:text-xs font-black text-orange-700 dark:text-orange-400">
                                    {language === 'bn' ? 'পুরস্কার: পূর্ণ হজ্ব ও উমরার সওয়াব' : 'Reward: Full Hajj & Umrah'}
                                </span>
                            </div>
                        )}
                    </div>
                    {extraPrayers.ishraq && (() => {
                        const s = getSawab('ishraq', language);
                        return s && <SawabBadge reward={s.reward} source={s.source} detail={s.detail} color="orange" />;
                    })()}
                </div>

                {/* Chasht */}
                <div
                    onClick={() => onExtraUpdate({ ...extraPrayers, chasht: !extraPrayers.chasht })}
                    className={`p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] cursor-pointer transition-all border-2 group ${extraPrayers.chasht ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30 shadow-inner' : 'bg-slate-50 dark:bg-slate-800/30 border-slate-50 dark:border-slate-800/20 hover:border-yellow-100 dark:hover:border-yellow-900/40'}`}
                >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Sun className={`w-5 h-5 sm:w-6 sm:h-6 ${extraPrayers.chasht ? 'text-yellow-500' : 'text-slate-400 dark:text-slate-500'}`} />
                            <div>
                                <h4 className="text-base sm:text-xl font-black text-slate-800 dark:text-white">{t('chasht')}</h4>
                                <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${extraPrayers.chasht ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                    {language === 'bn' ? 'চাশতের সময়' : 'Forenoon prayer'}
                                </p>
                            </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-4 transition-all ${extraPrayers.chasht ? 'bg-yellow-500 border-yellow-200 scale-110 shadow-lg shadow-yellow-200 dark:shadow-yellow-900/30' : 'border-slate-200 dark:border-slate-700'}`}></div>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                        <p className={`text-sm italic font-medium leading-relaxed ${extraPrayers.chasht ? 'text-yellow-800 dark:text-yellow-400' : 'text-slate-400 dark:text-slate-500'}`}>
                            "{t('chashtMotivation')}"
                        </p>

                        {!extraPrayers.chasht && (
                            <div className="flex items-center gap-2 bg-yellow-100/50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 px-3 py-1.5 rounded-xl w-fit">
                                <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                                <span className="text-[10px] sm:text-xs font-black text-yellow-700 dark:text-yellow-400">
                                    {language === 'bn' ? 'পুরস্কার: ৩৬০টি সদকার সওয়াব' : 'Reward: 360 acts of charity'}
                                </span>
                            </div>
                        )}
                    </div>
                    {extraPrayers.chasht && (() => {
                        const s = getSawab('chasht', language);
                        return s && <SawabBadge reward={s.reward} source={s.source} detail={s.detail} color="amber" />;
                    })()}
                </div>
            </div>
        </section>
    );
};

const PrayerCircle = ({ active, onClick, icon, label, color }) => {
    const colors = {
        emerald: 'bg-emerald-500 shadow-emerald-200 border-emerald-400',
        blue: 'bg-blue-500 shadow-blue-200 border-blue-400 text-white',
        red: 'bg-red-500 shadow-red-200 border-red-400 text-white'
    };

    return (
        <button
            onClick={onClick}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 relative group/btn ${active
                ? `${colors[color]} text-white shadow-xl scale-110 -translate-y-1`
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-400 dark:hover:text-slate-400'
                }`}
        >
            {icon}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none font-bold">
                {label}
            </span>
        </button>
    );
};

export default SalahGrid;
