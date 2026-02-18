import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

const Toast = ({ message, type = 'success', duration = 2500, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // allow fade-out animation
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const config = {
        success: {
            icon: CheckCircle,
            bg: 'bg-emerald-500',
            ring: 'ring-emerald-400/30',
        },
        error: {
            icon: AlertCircle,
            bg: 'bg-red-500',
            ring: 'ring-red-400/30',
        },
        info: {
            icon: Info,
            bg: 'bg-blue-500',
            ring: 'ring-blue-400/30',
        },
    };

    const { icon: Icon, bg, ring } = config[type] || config.success;

    return (
        <div
            className={`transition-all duration-300 transform ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                }`}
        >
            <div
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-white font-bold text-sm shadow-2xl ring-4 ${bg} ${ring} backdrop-blur-xl`}
            >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{message}</span>
                <button
                    onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
                    className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success', duration = 2500) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none w-full max-w-sm px-4">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            onClose={() => removeToast(toast.id)}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default Toast;
