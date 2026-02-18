import React, { useState } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { computeQuranTodayTarget } from '../utils/quranCalculator';
import { BookOpen, TrendingUp, CheckCircle, Hash, Bookmark } from 'lucide-react';

const QuranPlannerCard = ({
    quranData,
    onUpdate,
    startDate,
    currentDate = new Date().toISOString().split('T')[0]
}) => {
    const { appData, language } = useApp();
    const t = (key) => translations[language][key] || key;

    // Initialize data if missing
    const data = {
        pagesRead: quranData.pagesRead || 0,
        ayahCount: quranData.ayahCount || 0,
        paraNumber: quranData.paraNumber || 0,
        // totalPagesReadToDate is calculated globally usually, but for local state we track inputs
    };

    const [inputPages, setInputPages] = useState('');
    const [inputAyah, setInputAyah] = useState(data.ayahCount || '');
    const [inputPara, setInputPara] = useState(data.paraNumber || '');

    // Calculate targets logic (re-used from previous, simplified for this view)
    // Note: computations would ideally be in parent or hook to access full history
    // For now, we display today's input interface

    const handleSave = () => {
        const pagesToAdd = parseInt(inputPages) || 0;

        onUpdate({
            ...quranData,
            pagesRead: data.pagesRead + pagesToAdd,
            ayahCount: parseInt(inputAyah) || 0,
            paraNumber: parseInt(inputPara) || 0
        });

        setInputPages('');
    };

    return (
        <section className="card !p-8 bg-gradient-to-br from-white to-sky-50/30 border-sky-100">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-200">
                        <BookOpen className="text-white w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('quranTracker')}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                            <p className="text-xs font-bold text-sky-600 uppercase tracking-widest leading-none">
                                {t('quranGoal')}: {appData.profile?.quranTotalPages || 604} {t('pages')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <SummaryTag label={t('pages')} value={data.pagesRead} color="sky" />
                    <SummaryTag label={t('para')} value={data.paraNumber || '-'} color="blue" />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InputField
                    label={t('para')}
                    icon={Bookmark}
                    value={inputPara}
                    onChange={setInputPara}
                    placeholder="1-30"
                />
                <InputField
                    label={t('ayah')}
                    icon={Hash}
                    value={inputAyah}
                    onChange={setInputAyah}
                    placeholder="0"
                />
                <div className="relative group">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
                        {t('pages')} (+{data.pagesRead})
                    </label>
                    <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                        <input
                            type="number"
                            value={inputPages}
                            onChange={(e) => setInputPages(e.target.value)}
                            placeholder="+ pages"
                            className="input-field !pl-12 !border-sky-100 !bg-white"
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                className="w-full btn-gradient !py-5 bg-gradient-to-r from-sky-600 to-blue-700 shadow-sky-200/50 flex justify-center items-center gap-3 transition-all hover:scale-[1.01]"
            >
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-black">{t('logPages')}</span>
            </button>
        </section>
    );
};

const InputField = ({ label, icon: Icon, value, onChange, placeholder }) => (
    <div className="group">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
            {label}
        </label>
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="input-field !pl-12 !bg-white"
            />
        </div>
    </div>
);

const SummaryTag = ({ label, value, color }) => (
    <div className={`px-4 py-2 rounded-2xl bg-${color}-50 border border-${color}-100 flex flex-col items-center min-w-[70px]`}>
        <span className={`text-[10px] font-black uppercase text-${color}-400 leading-none mb-1`}>{label}</span>
        <span className={`text-xl font-black text-${color}-700 leading-none`}>{value}</span>
    </div>
);


export default QuranPlannerCard;
