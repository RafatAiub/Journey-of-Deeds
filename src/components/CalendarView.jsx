import React, { useMemo } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { getRamadanDayNumber, getDateKey, calculateDayProgress } from '../utils/quranCalculator';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    Calendar as CalendarIcon,
    TrendingUp,
    Moon,
    Flame,
    BookOpen,
    ChevronRight,
    BarChart3,
    Star
} from 'lucide-react';

const CalendarView = () => {
    const { appData, language } = useApp();
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
            { name: t('salah'), value: 0, color: '#3b82f6', icon: TrendingUp },
            { name: t('roza'), value: 0, color: '#10b981', icon: Moon },
            { name: t('quranPlanner'), value: 0, color: '#f59e0b', icon: BookOpen },
            { name: t('dailyLearning'), value: 0, color: '#8b5cf6', icon: BookOpen }
        ];

        daysArray.forEach(dateKey => {
            const dayData = appData.days[dateKey];
            const ramadanDay = getRamadanDayNumber(appData.ramadanPlan.startDate, new Date(dateKey));

            // 1. Calculate Daily Progress Score (Consolidated Utility)
            const score = calculateDayProgress(dayData, appData, dateKey);

            // Prayers count for stats (separate from score)
            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
            prayers.forEach(p => {
                const pData = dayData.salah?.[p];
                if ((typeof pData === 'object' && pData.fard) || pData === true) {
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
            learnings.forEach(l => {
                if (dayData.dailyLearning?.[l]) categoryData[3].value++;
            });

            if (score === 100) perfectDays++;

            chartData.push({
                day: ramadanDay,
                score: score,
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
        if (progress >= 80) return 'text-emerald-600 bg-emerald-50';
        if (progress >= 50) return 'text-amber-600 bg-amber-50';
        return 'text-slate-400 bg-slate-50';
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10 animate-fade-in pb-32">

            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                            <BarChart3 className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        {language === 'bn' ? 'আমার ড্যাশবোর্ড' : 'Insights'}
                    </h1>
                    <p className="text-slate-500 mt-2 sm:mt-3 text-base sm:text-lg font-medium">
                        {language === 'bn' ? 'আপনার রমজানের অগ্রগতির সূক্ষ্ম বিশ্লেষণ' : 'Reflecting on your spiritual journey'}
                    </p>
                </div>

                {stats && (
                    <div className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 self-start sm:self-auto">
                        <CalendarIcon size={18} className="text-emerald-500" />
                        <span className="text-slate-600 font-bold text-sm sm:text-base">
                            {stats.chartData.length} {language === 'bn' ? 'দিন সম্পন্ন' : 'Days Recorded'}
                        </span>
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                <div className="lg:col-span-8 card !p-5 sm:!p-8">
                    <div className="flex items-center justify-between mb-5 sm:mb-8">
                        <div>
                            <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                                {language === 'bn' ? 'অগ্রগতি ইতিহাস' : 'Progress History'}
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">{language === 'bn' ? 'বিগত ৩০ দিনের আমলের পরিবর্তন' : 'Daily progress visualizer'}</p>
                        </div>
                    </div>

                    <div className="h-[200px] sm:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.chartData || []}>
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    dy={15}
                                />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '0.75rem' }}
                                    cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#chartGradient)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-4 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
                    <PremiumStat icon={Flame} value={stats?.currentStreak || 0} unit={language === 'bn' ? 'দিনের স্ট্রিক' : 'Day Streak'} color="orange" />
                    <PremiumStat icon={Star} value={stats?.perfectDays || 0} unit={language === 'bn' ? 'পূর্ণাঙ্গ দিন' : 'Perfect Days'} color="emerald" />
                    <PremiumStat icon={BookOpen} value={stats?.totalQuranPages || 0} unit={language === 'bn' ? 'পৃষ্ঠা খতম' : 'Quran Pages'} color="amber" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <section className="lg:col-span-1 glass-card overflow-hidden">
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-6 sm:mb-8 px-2">
                        {language === 'bn' ? 'আমল বিশ্লেষণ' : 'Activity Focus'}
                    </h3>
                    <div className="space-y-6">
                        {stats?.categoryData.map((item, idx) => (
                            <div key={idx} className="group">
                                <div className="flex justify-between items-center mb-2 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                            <item.icon size={16} />
                                        </div>
                                        <span className="font-bold text-slate-700">{item.name}</span>
                                    </div>
                                    <span className="font-black text-slate-900">{item.value}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
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
                        <h3 className="text-xl font-black text-slate-800">
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
                                    className="group card !p-5 flex items-center gap-5 hover:scale-[1.02] active:scale-95 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform ${dayProgress >= 80 ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 'bg-gradient-to-br from-slate-400 to-slate-600'}`}>
                                        <span className="text-[10px] font-black uppercase opacity-60 leading-none mb-1">{t('day')}</span>
                                        <span className="text-2xl font-black leading-none">{ramadanDay}</span>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="font-black text-slate-800">
                                            {format(new Date(dateKey), 'dd MMMM')}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex -space-x-1">
                                                {dayData.roza && <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center ring-2 ring-white text-[10px]">🌙</div>}
                                                {dayData.quran?.pagesRead > 0 && <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center ring-2 ring-white text-[10px]">📖</div>}
                                            </div>
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getProgressColorClass(dayProgress)}`}>
                                                {dayProgress}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
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
        <div className="card group !p-6 flex flex-row items-center justify-between border-transparent">
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{unit}</p>
                <h4 className="text-4xl font-black text-slate-900 group-hover:scale-110 transition-transform origin-left">{value}</h4>
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-xl rotate-6 group-hover:rotate-0 transition-all duration-500`}>
                <Icon className="text-white w-7 h-7" />
            </div>
        </div>
    );
};

export default CalendarView;
