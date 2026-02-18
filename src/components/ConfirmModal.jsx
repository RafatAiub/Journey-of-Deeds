import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * ConfirmModal — replaces native browser confirm() dialogs.
 * Usage:
 *   <ConfirmModal
 *     isOpen={showConfirm}
 *     title="রিসেট করবেন?"
 *     message="এটি পূর্বাবস্থায় ফেরানো যাবে না।"
 *     confirmLabel="হ্যাঁ, রিসেট করুন"
 *     cancelLabel="বাতিল"
 *     onConfirm={handleConfirm}
 *     onCancel={() => setShowConfirm(false)}
 *     danger={true}
 *   />
 */
const ConfirmModal = ({
    isOpen,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    danger = false,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={onCancel}
        >
            <div
                className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full p-8 relative animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto ${danger ? 'bg-red-50' : 'bg-amber-50'
                    }`}>
                    <AlertTriangle className={`w-7 h-7 ${danger ? 'text-red-500' : 'text-amber-500'}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-slate-900 text-center mb-3">{title}</h3>
                {message && (
                    <p className="text-slate-500 text-sm text-center leading-relaxed mb-8">{message}</p>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={() => { onConfirm(); onCancel(); }}
                        className={`flex-1 py-3 rounded-2xl font-bold text-white transition-all active:scale-95 shadow-lg ${danger
                                ? 'bg-red-500 hover:bg-red-600 shadow-red-200'
                                : 'bg-amber-500 hover:bg-amber-600 shadow-amber-200'
                            }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
