import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loadData, saveData } from './utils/storage';
import Onboarding from './components/Onboarding';
import TodayDashboard from './components/TodayDashboard';
import CalendarView from './components/CalendarView';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import RoutineBuilder from './components/routine/RoutineBuilder';

import { ToastProvider } from './components/Toast';

import { AppContext } from './utils/AppContext';


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
            <div className="min-h-screen flex items-center justify-center bg-[#020617]">
                <div className="relative">
                    {/* Pulsing Glow */}
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse scale-150"></div>

                    <div className="relative flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl animate-bounce">
                            <img src="/icon.svg" alt="Loading" className="w-14 h-14 -rotate-12" />
                        </div>
                        <div className="mt-8 flex flex-col items-center">
                            <h2 className="text-white font-black tracking-widest text-xl mb-2 animate-pulse">
                                RAMADAN PLANNER
                            </h2>
                            <div className="w-12 h-1 bg-emerald-500 rounded-full animate-progress-glow"></div>
                        </div>
                    </div>
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
                                    <Route path="/routine" element={<RoutineBuilder />} />
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
