import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Sparkles } from 'lucide-react';

/**
 * SawabBadge — A beautiful, collapsible badge that shows the reward (sawab)
 * for a specific deed, with Quran/Hadith reference.
 *
 * Props:
 *   reward   — short reward text (e.g. "27x more reward")
 *   source   — hadith/quran reference (e.g. "Sahih Bukhari 645")
 *   detail   — optional longer explanation
 *   color    — theme color: emerald | blue | amber | indigo | sky | teal | purple | orange (default: emerald)
 *   compact  — if true, renders a smaller inline version
 */
const SawabBadge = ({ reward, source, detail, color = 'emerald', compact = false }) => {
    const [expanded, setExpanded] = useState(false);

    if (!reward) return null;

    const colorMap = {
        emerald: {
            bg: 'bg-emerald-50 dark:bg-emerald-900/10',
            border: 'border-emerald-100 dark:border-emerald-800/50',
            text: 'text-emerald-800 dark:text-emerald-300',
            source: 'text-emerald-600 dark:text-emerald-400',
            icon: 'text-emerald-500 dark:text-emerald-400',
            expandBg: 'bg-emerald-100/50 dark:bg-emerald-900/20',
        },
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/10',
            border: 'border-blue-100 dark:border-blue-800/50',
            text: 'text-blue-800 dark:text-blue-300',
            source: 'text-blue-600 dark:text-blue-400',
            icon: 'text-blue-500 dark:text-blue-400',
            expandBg: 'bg-blue-100/50 dark:bg-blue-900/20',
        },
        amber: {
            bg: 'bg-amber-50 dark:bg-amber-900/10',
            border: 'border-amber-100 dark:border-amber-800/50',
            text: 'text-amber-800 dark:text-amber-300',
            source: 'text-amber-600 dark:text-amber-400',
            icon: 'text-amber-500 dark:text-amber-400',
            expandBg: 'bg-amber-100/50 dark:bg-amber-900/20',
        },
        indigo: {
            bg: 'bg-indigo-50 dark:bg-indigo-900/10',
            border: 'border-indigo-100 dark:border-indigo-800/50',
            text: 'text-indigo-800 dark:text-indigo-300',
            source: 'text-indigo-600 dark:text-indigo-400',
            icon: 'text-indigo-500 dark:text-indigo-400',
            expandBg: 'bg-indigo-100/50 dark:bg-indigo-900/20',
        },
        sky: {
            bg: 'bg-sky-50 dark:bg-sky-900/10',
            border: 'border-sky-100 dark:border-sky-800/50',
            text: 'text-sky-800 dark:text-sky-300',
            source: 'text-sky-600 dark:text-sky-400',
            icon: 'text-sky-500 dark:text-sky-400',
            expandBg: 'bg-sky-100/50 dark:bg-sky-900/20',
        },
        teal: {
            bg: 'bg-teal-50 dark:bg-teal-900/10',
            border: 'border-teal-100 dark:border-teal-800/50',
            text: 'text-teal-800 dark:text-teal-300',
            source: 'text-teal-600 dark:text-teal-400',
            icon: 'text-teal-500 dark:text-teal-400',
            expandBg: 'bg-teal-100/50 dark:bg-teal-900/20',
        },
        purple: {
            bg: 'bg-purple-50 dark:bg-purple-900/10',
            border: 'border-purple-100 dark:border-purple-800/50',
            text: 'text-purple-800 dark:text-purple-300',
            source: 'text-purple-600 dark:text-purple-400',
            icon: 'text-purple-500 dark:text-purple-400',
            expandBg: 'bg-purple-100/50 dark:bg-purple-900/20',
        },
        orange: {
            bg: 'bg-orange-50 dark:bg-orange-900/10',
            border: 'border-orange-100 dark:border-orange-800/50',
            text: 'text-orange-800 dark:text-orange-300',
            source: 'text-orange-600 dark:text-orange-400',
            icon: 'text-orange-500 dark:text-orange-400',
            expandBg: 'bg-orange-100/50 dark:bg-orange-900/20',
        },
    };

    const c = colorMap[color] || colorMap.emerald;

    // ── Compact (inline) variant ──
    if (compact) {
        return (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${c.bg} ${c.border} border`}>
                <Sparkles className={`w-3 h-3 ${c.icon} flex-shrink-0`} />
                <span className={`text-[10px] sm:text-xs font-bold ${c.text} leading-tight`}>
                    {reward}
                </span>
            </div>
        );
    }

    // ── Full variant ──
    return (
        <div
            className={`mt-3 rounded-2xl ${c.bg} border ${c.border} overflow-hidden transition-all duration-300`}
            onClick={(e) => { e.stopPropagation(); if (detail) setExpanded(!expanded); }}
        >
            <div className={`flex items-start gap-2.5 px-4 py-3 ${detail ? 'cursor-pointer' : ''}`}>
                <Sparkles className={`w-4 h-4 ${c.icon} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm font-bold ${c.text} leading-snug`}>
                        📖 {reward}
                    </p>
                    <p className={`text-[10px] sm:text-xs font-semibold ${c.source} mt-0.5 flex items-center gap-1`}>
                        <BookOpen className="w-3 h-3 flex-shrink-0" />
                        {source}
                    </p>
                </div>
                {detail && (
                    <button className={`p-1 rounded-lg ${c.expandBg} ${c.icon} flex-shrink-0`}>
                        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                )}
            </div>

            {/* Expandable detail */}
            {detail && expanded && (
                <div className={`px-4 pb-3 pt-0`}>
                    <div className={`${c.expandBg} rounded-xl px-3 py-2.5 mt-1`}>
                        <p className={`text-xs ${c.text} leading-relaxed font-medium italic`}>
                            "{detail}"
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SawabBadge;
