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
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-emerald-100 shadow-lg z-50">
            <div className="max-w-md mx-auto px-4">
                <div className="flex justify-around items-center h-16">
                    {navItems.map(({ path, icon: Icon, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${isActive
                                    ? 'text-emerald-600'
                                    : 'text-gray-500 hover:text-emerald-500'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={`w-6 h-6 transition-transform duration-200 ${isActive ? 'scale-110' : ''
                                            }`}
                                    />
                                    <span className="text-xs font-medium">{label}</span>
                                    {isActive && (
                                        <div className="absolute bottom-0 w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-full" />
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
