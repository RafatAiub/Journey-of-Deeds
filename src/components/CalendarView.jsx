import React, { useMemo } from 'react';
import { useApp } from '../utils/AppContext';
import { translations } from '../utils/language';
import { getRamadanDayNumber, getDateKey, calculateDayProgress, calculateDayProgressBreakdown } from '../utils/quranCalculator';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Cell
} from 'recharts';
import {
    Calendar as CalendarIcon,
    TrendingUp,
    Moon,
    Flame,
    BookOpen,
    ChevronRight,
    BarChart3,
    Star,
    CheckCircle
} from 'lucide-react';

const CalendarView = () => {
    const { appData, language, isDarkMode } = useApp();
    const t = (key) => translations[language][key] || key;

    // Process data for analytics
    const stats = useMemo(() => {
        const daysArray = Object.keys(appData.days || {}).sort();
        if (daysArray.length === 0) return null;

        let totalFasts = 0;
        let totalPrayers = 0;
        let totalQuranPages = 0;
        let perfectDays = 0;

        const chartData = [];
        const categoryData = [
            { name: t('salah'), value: 0, color: '#3b82f6', icon: TrendingUp, key: 'salah' },
            { name: t('roza'), value: 0, color: '#10b981', icon: Moon, key: 'roza' },
            { name: t('quranPlanner'), value: 0, color: '#f59e0b', icon: BookOpen, key: 'quran' },
            { name: t('others'), value: 0, color: '#8b5cf6', icon: Star, key: 'others' }
        ];

        daysArray.forEach(dateKey => {
            const dayData = appData.days[dateKey];
            const ramadanDay = getRamadanDayNumber(appData.ramadanPlan.startDate, new Date(dateKey));

            // Calculate Breakdown for Chart
            const breakdown = calculateDayProgressBreakdown(dayData, appData, dateKey);

            // Prayers count for stats
            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
            prayers.forEach(p => {
                const pData = dayData.salah?.[p];
                if (pData?.fard || pData === true) {
                    categoryData[0].value++;
                    totalPrayers++;
                }
            });

            if (dayData.roza) {
                totalFasts++;
                categoryData[1].value++;
            }

            if ((Number(dayData.quran?.pagesRead) || 0) > 0) {
                totalQuranPages += Number(dayData.quran.pagesRead);
                categoryData[2].value++;
            }

            const learnings = ['ayah', 'hadith', 'dua', 'sunnah', 'iman'];
            learnings.forEach(l => { if (dayData.dailyLearning?.[l]) categoryData[3].value++; });

            if (breakdown.total === 100) perfectDays++;

            chartData.push({
                day: ramadanDay,
                ...breakdown,
                date: dateKey
            });
        });

        // Calculate Current Streak
        let currentStreak = 0;
        const todayKey = getDateKey();
        const sortedDays = Object.keys(appData.days || {}).sort().reverse();
        for (const key of sortedDays) {
            if (key > todayKey) continue;
            const d = appData.days[key];
            const pts = calculateDayProgress(d, appData, key);
            if (pts >= 40) currentStreak++; // Streak continues if progress >= 40%
            else break;
        }

        return { totalFasts, totalPrayers, totalQuranPages, perfectDays, currentStreak, chartData, categoryData };
    }, [appData.days, appData.ramadanPlan.startDate, language]);

    const days = Object.keys(appData.days).sort().reverse();

    const getProgressColorClass = (progress) => {
        if (progress >= 80) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
        if (progress >= 50) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10';
        return 'text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50';
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10 animate-fade-in pb-32">

            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20">
                            <BarChart3 className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        {language === 'bn' ? 'আমার ড্যাশবোর্ড' : 'Insights'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 text-base sm:text-lg font-medium">
                        {language === 'bn' ? 'আপনার রমজানের অগ্রগতির সূক্ষ্ম বিশ্লেষণ' : 'Reflecting on your spiritual journey'}
                    </p>
                </div>

                {stats && (
                    <div className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-slate-950/20 border border-slate-100 dark:border-slate-800 self-start sm:self-auto">
                        <CalendarIcon size={18} className="text-emerald-500" />
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-sm sm:text-base">
                            {stats.chartData.length} {language === 'bn' ? 'দিন সম্পন্ন' : 'Days Recorded'}
                        </span>
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                <div className="lg:col-span-8 card !p-5 sm:!p-8 min-w-0">
                    <div className="flex items-center justify-between mb-5 sm:mb-8">
                        <div>
                            <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight">
                                {language === 'bn' ? 'অগ্রগতি ইতিহাস' : 'Progress History'}
                            </h3>
                            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">{language === 'bn' ? 'বিগত ৩০ দিনের আমলের পরিবর্তন' : 'Daily progress composition'}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/30">
                            <CheckCircle size={14} />
                            <span>{language === 'bn' ? '৭৫% লক্ষ্য' : '75% Goal'}</span>
                        </div>
                    </div>

                    <div className="h-[250px] sm:h-[350px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.chartData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: isDarkMode ? '#475569' : '#94a3b8', fontWeight: 800 }}
                                    dy={10}
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    tick={{ fontSize: 10, fill: isDarkMode ? '#334155' : '#cbd5e1', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: isDarkMode ? '#1e293b' : '#f8fafc' }}
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 min-w-[160px] animate-in zoom-in-95">
                                                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex justify-between">
                                                        <span>{t('day')} {label}</span>
                                                        <span className="text-emerald-600 dark:text-emerald-400 font-black">{payload[0].payload.total}%</span>
                                                    </p>
                                                    <div className="space-y-1.5">
                                                        {payload.slice().reverse().map((entry, index) => (
                                                            <div key={index} className="flex justify-between items-center text-xs font-bold">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                                                    <span className="text-slate-600 dark:text-slate-400 capitalize">{entry.name}</span>
                                                                </div>
                                                                <span className="text-slate-900 dark:text-white">{entry.value}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <ReferenceLine y={75} stroke="#34d399" strokeDasharray="5 5" strokeWidth={2} label={{ position: 'right', value: '', fill: '#10b981', fontSize: 10 }} />
                                <Bar dataKey="salah" name={t('salah')} stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={24} />
                                <Bar dataKey="roza" name={t('roza')} stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="quran" name={t('quran')} stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="others" name={t('others')} stackId="a" fill="#a855f7" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                    <PremiumStat icon={Flame} value={stats?.currentStreak || 0} unit={language === 'bn' ? 'দিনের স্ট্রিক' : 'Day Streak'} color="orange" />
                    <PremiumStat icon={Star} value={stats?.perfectDays || 0} unit={language === 'bn' ? 'পূর্ণাঙ্গ দিন' : 'Perfect Days'} color="emerald" />
                    <PremiumStat icon={BookOpen} value={stats?.totalQuranPages || 0} unit={language === 'bn' ? 'পৃষ্ঠা খতম' : 'Quran Pages'} color="amber" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <section className="lg:col-span-1 glass-card overflow-hidden">
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white mb-6 sm:mb-8 px-2">
                        {language === 'bn' ? 'আমল বিশ্লেষণ' : 'Activity Focus'}
                    </h3>
                    <div className="space-y-6">
                        {stats?.categoryData.map((item, idx) => (
                            <div key={idx} className="group">
                                <div className="flex justify-between items-center mb-2 px-1">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: isDarkMode ? `${item.color}30` : `${item.color}15`, color: item.color }}>
                                            <item.icon size={14} className="sm:size-16" />
                                        </div>
                                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm sm:text-base">{item.name}</span>
                                    </div>
                                    <span className="font-black text-slate-900 dark:text-white text-sm sm:text-base">{item.value}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{ backgroundColor: item.color, width: `${Math.min(100, (item.value / ((stats.chartData.length || 1) * 5)) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white">
                            {language === 'bn' ? 'দিনলিপি ইতিহাস' : 'Daily Journal'}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {days.map((dateKey) => {
                            const dayData = appData.days[dateKey];
                            const ramadanDay = getRamadanDayNumber(appData.ramadanPlan.startDate, new Date(dateKey));

                            const dayProgress = calculateDayProgress(dayData, appData, dateKey);

                            return (
                                <Link
                                    to={`/day/${dateKey}`}
                                    key={dateKey}
                                    className="group card !p-5 flex items-center gap-5 hover:scale-[1.02] active:scale-95 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-slate-950/20"
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform ${dayProgress >= 80 ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 'bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-700 dark:to-slate-800'}`}>
                                        <span className="text-[10px] font-black uppercase opacity-60 leading-none mb-1">{t('day')}</span>
                                        <span className="text-2xl font-black leading-none">{ramadanDay}</span>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="font-black text-slate-800 dark:text-white">
                                            {format(new Date(dateKey), 'dd MMMM')}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex -space-x-1">
                                                {dayData.roza && <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center ring-2 ring-white dark:ring-slate-900 text-[10px]">🌙</div>}
                                                {dayData.quran?.pagesRead > 0 && <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center ring-2 ring-white dark:ring-slate-900 text-[10px]">📖</div>}
                                            </div>
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getProgressColorClass(dayProgress)}`}>
                                                {dayProgress}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all text-slate-400 dark:text-slate-500">
                                        <ChevronRight size={20} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};

const PremiumStat = ({ icon: Icon, value, unit, color }) => {
    const colorMap = {
        emerald: 'from-emerald-500 to-teal-600',
        orange: 'from-orange-400 to-red-500',
        amber: 'from-amber-400 to-yellow-600'
    };

    return (
        <div className="card group !p-5 sm:!p-6 flex flex-row items-center justify-between border-transparent">
            <div>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{unit}</p>
                <h4 className="text-4xl font-black text-slate-900 dark:text-white group-hover:scale-110 transition-transform origin-left">{value}</h4>
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-xl rotate-6 group-hover:rotate-0 transition-all duration-500`}>
                <Icon className="text-white w-7 h-7" />
            </div>
        </div>
    );
};

export default CalendarView;
