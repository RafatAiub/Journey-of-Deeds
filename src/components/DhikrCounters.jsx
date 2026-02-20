import React, { useState } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { RotateCcw } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import SawabBadge from './SawabBadge';
import { getSawab } from '../data/sawabData';

/**
 * DhikrCounters — Tasbih counter for Subhanallah, Alhamdulillah, Allahu Akbar, and custom dhikr.
 * Fixes applied:
 *  - Replaced native confirm() with custom ConfirmModal
 *  - Localized "Tap to count" text
 *  - Input validation: prevents negative manual entry
 */
const DhikrCounters = ({ dhikrData, onUpdate }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const counters = [
        { key: 'subhanallah', label: t('subhanallah'), color: 'emerald', icon: '✨' },
        { key: 'alhamdulillah', label: t('alhamdulillah'), color: 'teal', icon: '🤲' },
        { key: 'allahuakbar', label: t('allahuakbar'), color: 'blue', icon: '☝️' },
    ];

    const handleUpdate = (key, delta) => {
        const current = dhikrData[key] || 0;
        const newValue = Math.max(0, current + delta);
        onUpdate({ ...dhikrData, [key]: newValue });
    };

    const handleCustomUpdate = (delta) => {
        const current = dhikrData.custom?.count || 0;
        const newValue = Math.max(0, current + delta);
        onUpdate({
            ...dhikrData,
            custom: { ...dhikrData.custom, count: newValue }
        });
    };

    const handleManual = (key, rawValue) => {
        const v = Math.max(0, parseInt(rawValue) || 0);
        onUpdate({ ...dhikrData, [key]: v });
    };

    const handleCustomManual = (rawValue) => {
        const v = Math.max(0, parseInt(rawValue) || 0);
        onUpdate({ ...dhikrData, custom: { ...dhikrData.custom, count: v } });
    };

    const doReset = () => {
        onUpdate({
            subhanallah: 0,
            alhamdulillah: 0,
            allahuakbar: 0,
            custom: { ...dhikrData.custom, count: 0 }
        });
    };

    return (
        <section className="card !p-4 sm:!p-8 border-transparent bg-slate-50/50">
            <header className="flex items-center justify-between mb-6 sm:mb-10 px-1 sm:px-2">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{t('dhikr')}</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                        {language === 'bn' ? 'স্মরণ ও তাসবিহ' : 'Remembrance'}
                    </p>
                </div>
                <button
                    onClick={() => setShowResetConfirm(true)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
                    title={t('resetAll')}
                >
                    <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform" />
                </button>
            </header>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {counters.map((c) => (
                    <TasbihCard
                        key={c.key}
                        {...c}
                        count={dhikrData[c.key] || 0}
                        onUpdate={(d) => handleUpdate(c.key, d)}
                        onManual={(v) => handleManual(c.key, v)}
                        language={language}
                        sawabKey={c.key}
                    />
                ))}

                <TasbihCard
                    key="custom"
                    label={dhikrData.custom?.label || t('istighfar')}
                    color="purple"
                    icon="📿"
                    count={dhikrData.custom?.count || 0}
                    onUpdate={handleCustomUpdate}
                    onManual={handleCustomManual}
                    language={language}
                    sawabKey="istighfar"
                />
            </div>

            {/* Custom ConfirmModal instead of native confirm() */}
            <ConfirmModal
                isOpen={showResetConfirm}
                title={language === 'bn' ? 'সব কাউন্টার রিসেট করবেন?' : 'Reset all counters?'}
                message={language === 'bn' ? 'এটি পূর্বাবস্থায় ফেরানো যাবে না।' : 'This cannot be undone.'}
                confirmLabel={language === 'bn' ? 'হ্যাঁ, রিসেট করুন' : 'Yes, Reset'}
                cancelLabel={language === 'bn' ? 'বাতিল' : 'Cancel'}
                onConfirm={doReset}
                onCancel={() => setShowResetConfirm(false)}
                danger={true}
            />
        </section>
    );
};

const TasbihCard = ({ label, count, color, icon, onUpdate, onManual, language, sawabKey }) => {
    const colorMap = {
        emerald: 'from-emerald-400 to-teal-500 shadow-emerald-100',
        teal: 'from-teal-400 to-cyan-500 shadow-teal-100',
        blue: 'from-blue-400 to-indigo-500 shadow-blue-100',
        purple: 'from-purple-400 to-fuchsia-500 shadow-purple-100'
    };

    return (
        <div className="group bg-white rounded-[2rem] p-4 sm:p-6 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 px-1 sm:px-2">
                <span className="text-xl sm:text-2xl drop-shadow-sm">{icon}</span>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{label}</h4>
            </div>
            {/* Sawab info */}
            {count > 0 && sawabKey && (() => {
                const s = getSawab(sawabKey, language);
                return s && (
                    <div className="mb-3 px-1">
                        <SawabBadge reward={s.reward} source={s.source} color={color} compact />
                    </div>
                );
            })()}

            <div className="relative flex flex-col items-center">
                <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
                    <button
                        onClick={() => onUpdate(-1)}
                        className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-xl sm:text-2xl hover:bg-slate-100 transition-colors active:scale-95"
                    >
                        -
                    </button>

                    <div className="flex-1 text-center">
                        <input
                            type="number"
                            min="0"
                            value={count}
                            onChange={(e) => onManual(e.target.value)}
                            className="w-full text-3xl sm:text-5xl font-black text-slate-900 bg-transparent text-center outline-none"
                        />
                    </div>

                    <button
                        onClick={() => onUpdate(1)}
                        className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-xl sm:text-2xl hover:bg-slate-100 transition-colors active:scale-95"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={() => onUpdate(1)}
                    className={`mt-4 sm:mt-6 w-full py-5 sm:py-8 rounded-[2rem] bg-gradient-to-br ${colorMap[color]} text-white shadow-2xl transition-all active:scale-[0.98] active:brightness-90 flex flex-col items-center gap-1 group/btn`}
                >
                    <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover/btn:opacity-100 transition-opacity">
                        {language === 'bn' ? 'ট্যাপ করুন' : 'Tap to count'}
                    </span>
                    <span className="text-2xl sm:text-3xl">🤲</span>
                </button>
            </div>
        </div>
    );
};

export default DhikrCounters;
