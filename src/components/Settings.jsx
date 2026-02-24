import React, { useRef, useState } from 'react';
import { useApp } from '../utils/AppContext';
import { translations } from '../utils/language';
import { exportData, importData, resetData } from '../utils/storage';
import { Settings as SettingsIcon, Download, Upload, Trash2, Globe, Info, Palette } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import { useToast } from './Toast';
import ThemeToggle from './ThemeToggle';

/**
 * Settings — app settings page.
 * Fixes applied:
 *  - Replaced native alert() and confirm() with custom Toast + ConfirmModal
 *  - Added inline status messages for export/import feedback
 */
const Settings = () => {
    const { appData, setAppData, language, changeLanguage, isDarkMode } = useApp();
    const { showToast } = useToast();
    const t = (key) => translations[language][key] || key;
    const fileInputRef = useRef(null);

    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const handleExport = () => {
        const success = exportData(appData);
        if (success) {
            showToast(
                language === 'bn' ? 'ডেটা সফলভাবে এক্সপোর্ট হয়েছে!' : 'Data exported successfully!',
                'success'
            );
        } else {
            showToast(
                language === 'bn' ? 'এক্সপোর্ট করতে সমস্যা হয়েছে' : 'Error exporting data',
                'error'
            );
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const data = await importData(file);
            setAppData(data);
            showToast(
                language === 'bn' ? 'ডেটা সফলভাবে ইমপোর্ট হয়েছে!' : 'Data imported successfully!',
                'success'
            );
            setTimeout(() => window.location.reload(), 1200);
        } catch {
            showToast(
                language === 'bn' ? 'ইমপোর্ট করতে সমস্যা হয়েছে' : 'Error importing data',
                'error'
            );
        }
    };

    const doReset = () => {
        const success = resetData();
        if (success) {
            window.location.reload();
        }
    };

    const toggleLanguage = () => {
        changeLanguage(language === 'bn' ? 'en' : 'bn');
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8 animate-fade-in pb-32">
            {/* Header */}
            <div className="text-center pt-8 pb-4">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-16 h-16 mb-4">
                        <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-xl scale-125"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl rotate-6 flex items-center justify-center shadow-lg">
                            <img src="/icon.svg" alt="Logo" className="w-8 h-8 -rotate-6" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        {t('settings')}
                    </h1>
                    <div className="h-1 w-12 bg-emerald-500 rounded-full mt-3 opacity-50"></div>
                </div>
            </div>

            {/* Header */}

            {/* Theme */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-emerald-600" />
                    {language === 'bn' ? 'থিম পরিবর্তন' : 'Theme Settings'}
                </h2>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <span className="font-medium text-gray-700 dark:text-slate-200">
                        {language === 'bn' ? (isDarkMode ? 'ডার্ক মোড' : 'লাইট মোড') : (isDarkMode ? 'Dark Mode' : 'Light Mode')}
                    </span>
                    <ThemeToggle />
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-3">
                    {language === 'bn'
                        ? 'আপনার পছন্দমতো লাইট বা ডার্ক থিম বেছে নিন।'
                        : 'Choose between light or dark theme based on your preference.'}
                </p>
            </div>

            {/* Language */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    {t('changeLanguage')}
                </h2>
                <div className="flex gap-3">
                    <button
                        onClick={toggleLanguage}
                        className="btn-primary flex-1"
                    >
                        {language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
                    </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-3">
                    {language === 'bn'
                        ? 'বর্তমান ভাষা: বাংলা'
                        : 'Current language: English'}
                </p>
            </div>

            {/* Data Management */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    {language === 'bn' ? 'ডেটা ম্যানেজমেন্ট' : 'Data Management'}
                </h2>

                <div className="space-y-4">
                    {/* Export */}
                    <button
                        onClick={handleExport}
                        className="w-full btn-secondary flex items-center justify-center gap-2 py-4"
                    >
                        <Download className="w-5 h-5" />
                        {t('exportData')}
                    </button>

                    {/* Import */}
                    <div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full btn-secondary flex items-center justify-center gap-2 py-4"
                        >
                            <Upload className="w-5 h-5" />
                            {t('importData')}
                        </button>
                    </div>

                    <div className="pt-2">
                        {/* Reset — now uses ConfirmModal instead of native confirm() */}
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="w-full rounded-2xl px-6 py-4 font-bold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Trash2 className="w-5 h-5" />
                            {t('resetData')}
                        </button>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl text-sm text-gray-700 dark:text-slate-300 border border-emerald-100 dark:border-emerald-800/30">
                    {language === 'bn'
                        ? '💡 টিপস: নিয়মিত আপনার ডেটা এক্সপোর্ট করে ব্যাকআপ রাখুন।'
                        : '💡 Tip: Regularly export your data to keep a backup.'}
                </div>
            </div>

            {/* About */}
            <div className="card bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-emerald-600" />
                    {t('about')}
                </h2>

                <div className="space-y-3 text-gray-700 dark:text-slate-300">
                    <p className="leading-relaxed">
                        {language === 'bn'
                            ? 'রমজান প্ল্যানার একটি প্রাইভেসি-ফার্স্ট ওয়েব অ্যাপ্লিকেশন যা আপনার রমজানের আমল ট্র্যাক করতে সাহায্য করে।'
                            : 'Ramadan Planner is a privacy-first web application to help you track your Ramadan activities.'}
                    </p>
                    <p className="leading-relaxed">
                        {language === 'bn'
                            ? '🔒 আপনার সব ডেটা শুধুমাত্র আপনার ব্রাউজারে সংরক্ষিত থাকে। কোনো সার্ভারে পাঠানো হয় না।'
                            : '🔒 All your data is stored only in your browser. Nothing is sent to any server.'}
                    </p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 font-bold">
                        {language === 'bn'
                            ? 'আল্লাহ আপনার সব আমল কবুল করুন। আমীন।'
                            : 'May Allah accept all your deeds. Ameen.'}
                    </p>
                </div>
            </div>

            {/* Custom Reset Confirmation Modal */}
            <ConfirmModal
                isOpen={showResetConfirm}
                title={language === 'bn' ? 'সব ডেটা মুছে ফেলবেন?' : 'Delete all data?'}
                message={language === 'bn'
                    ? 'এটি পূর্বাবস্থায় ফেরানো যাবে না! আগে ডেটা এক্সপোর্ট করুন।'
                    : 'This cannot be undone! Export your data first.'}
                confirmLabel={language === 'bn' ? 'হ্যাঁ, সব মুছুন' : 'Yes, Delete All'}
                cancelLabel={language === 'bn' ? 'বাতিল' : 'Cancel'}
                onConfirm={doReset}
                onCancel={() => setShowResetConfirm(false)}
                danger={true}
            />
        </div>
    );
};

export default Settings;
