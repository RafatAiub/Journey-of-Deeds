import React, { useRef, useState } from 'react';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { exportData, importData, resetData } from '../utils/storage';
import { Settings as SettingsIcon, Download, Upload, Trash2, Globe, Info, CheckCircle, AlertCircle } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import { useToast } from './Toast';

/**
 * Settings — app settings page.
 * Fixes applied:
 *  - Replaced native alert() and confirm() with custom Toast + ConfirmModal
 *  - Added inline status messages for export/import feedback
 */
const Settings = () => {
    const { appData, setAppData, language, changeLanguage } = useApp();
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
        <div className="max-w-2xl mx-auto p-4 space-y-6 animate-fade-in pb-32">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <SettingsIcon className="w-8 h-8 text-emerald-600" />
                    <h1 className="text-4xl font-bold text-gradient">
                        {t('settings')}
                    </h1>
                </div>
            </div>

            {/* Header */}

            {/* Language */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                <p className="text-sm text-gray-600 mt-3">
                    {language === 'bn'
                        ? 'বর্তমান ভাষা: বাংলা'
                        : 'Current language: English'}
                </p>
            </div>

            {/* Data Management */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {language === 'bn' ? 'ডেটা ম্যানেজমেন্ট' : 'Data Management'}
                </h2>

                <div className="space-y-3">
                    {/* Export */}
                    <button
                        onClick={handleExport}
                        className="w-full btn-secondary flex items-center justify-center gap-2"
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
                            className="w-full btn-secondary flex items-center justify-center gap-2"
                        >
                            <Upload className="w-5 h-5" />
                            {t('importData')}
                        </button>
                    </div>

                    {/* Reset — now uses ConfirmModal instead of native confirm() */}
                    <button
                        onClick={() => setShowResetConfirm(true)}
                        className="w-full rounded-xl px-6 py-3 font-medium bg-red-50 text-red-600 ring-2 ring-red-200 hover:bg-red-100 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Trash2 className="w-5 h-5" />
                        {t('resetData')}
                    </button>
                </div>

                <div className="mt-4 p-4 bg-emerald-50 rounded-xl text-sm text-gray-700">
                    {language === 'bn'
                        ? '💡 টিপস: নিয়মিত আপনার ডেটা এক্সপোর্ট করে ব্যাকআপ রাখুন।'
                        : '💡 Tip: Regularly export your data to keep a backup.'}
                </div>
            </div>

            {/* About */}
            <div className="card bg-gradient-to-br from-emerald-50 to-teal-50">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-emerald-600" />
                    {t('about')}
                </h2>

                <div className="space-y-3 text-gray-700">
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
                    <p className="text-sm text-emerald-700 font-medium">
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
