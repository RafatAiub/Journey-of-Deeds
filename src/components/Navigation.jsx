import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../App';
import { translations } from '../utils/language';
import { Home, Calendar, Settings } from 'lucide-react';

const Navigation = () => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;

    const navItems = [
        { path: '/', icon: Home, label: t('home') },
        { path: '/calendar', icon: Calendar, label: t('calendar') },
        { path: '/settings', icon: Settings, label: t('settings') },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-emerald-100 shadow-lg z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div className="max-w-lg mx-auto px-2">
                <div className="flex justify-around items-center h-14">
                    {navItems.map(({ path, icon: Icon, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `relative flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-200 min-w-[64px] ${isActive
                                    ? 'text-emerald-600'
                                    : 'text-gray-500 hover:text-emerald-500'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                                    />
                                    <span className="text-[10px] font-semibold">{label}</span>
                                    {isActive && (
                                        <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-full" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
