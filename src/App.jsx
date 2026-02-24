import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loadData, saveData } from './utils/storage';
import Onboarding from './components/Onboarding';
import TodayDashboard from './components/TodayDashboard';
import CalendarView from './components/CalendarView';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

import { ToastProvider } from './components/Toast';

// Create App Context
export const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

// Re-export useToast for convenience, or just let components import it directly.
// We'll let components import useToast directly from ./components/Toast


function App() {
    const [appData, setAppData] = useState(null);
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        return saved || 'bn';
    });
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            return saved === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const [loading, setLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        const data = loadData();
        setAppData(data);
        setLoading(false);

        // Apply dark mode on mount
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Save data whenever it changes
    useEffect(() => {
        if (appData) {
            saveData(appData);
        }
    }, [appData]);

    // Handle dark mode changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    // Change language
    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    // Update app data
    const updateData = (updatesOrFn) => {
        setAppData(prev => {
            const updates = typeof updatesOrFn === 'function' ? updatesOrFn(prev) : updatesOrFn;
            return { ...prev, ...updates };
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfdfd] dark:bg-slate-950">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-emerald-700 dark:text-emerald-400 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    const contextValue = {
        appData,
        setAppData,
        updateData,
        language,
        changeLanguage,
        isDarkMode,
        toggleDarkMode
    };

    return (
        <ToastProvider>
            <AppContext.Provider value={contextValue}>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <div className="min-h-screen pb-20">
                        {!appData?.profile?.onboardingComplete ? (
                            <Onboarding />
                        ) : (
                            <>
                                <Routes>
                                    <Route path="/" element={<TodayDashboard />} />
                                    <Route path="/day/:dateKey" element={<TodayDashboard />} />
                                    <Route path="/calendar" element={<CalendarView />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                                <Navigation />
                            </>
                        )}
                    </div>
                </Router>
            </AppContext.Provider>
        </ToastProvider>
    );
}

export default App;
