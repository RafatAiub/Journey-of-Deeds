import React from 'react';
import { useApp } from '../App';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = "" }) => {
    const { isDarkMode, toggleDarkMode } = useApp();

    return (
        <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-xl transition-all duration-300 ${isDarkMode
                    ? 'bg-slate-800 text-yellow-400 border border-slate-700'
                    : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                } hover:scale-110 active:scale-95 ${className}`}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="w-5 h-5 animate-spin-slow" />
            ) : (
                <Moon className="w-5 h-5 animate-float" />
            )}
        </button>
    );
};

export default ThemeToggle;
