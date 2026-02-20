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
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            text: 'text-emerald-800',
            source: 'text-emerald-600',
            icon: 'text-emerald-500',
            expandBg: 'bg-emerald-100/50',
        },
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            text: 'text-blue-800',
            source: 'text-blue-600',
            icon: 'text-blue-500',
            expandBg: 'bg-blue-100/50',
        },
        amber: {
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            text: 'text-amber-800',
            source: 'text-amber-600',
            icon: 'text-amber-500',
            expandBg: 'bg-amber-100/50',
        },
        indigo: {
            bg: 'bg-indigo-50',
            border: 'border-indigo-100',
            text: 'text-indigo-800',
            source: 'text-indigo-600',
            icon: 'text-indigo-500',
            expandBg: 'bg-indigo-100/50',
        },
        sky: {
            bg: 'bg-sky-50',
            border: 'border-sky-100',
            text: 'text-sky-800',
            source: 'text-sky-600',
            icon: 'text-sky-500',
            expandBg: 'bg-sky-100/50',
        },
        teal: {
            bg: 'bg-teal-50',
            border: 'border-teal-100',
            text: 'text-teal-800',
            source: 'text-teal-600',
            icon: 'text-teal-500',
            expandBg: 'bg-teal-100/50',
        },
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-100',
            text: 'text-purple-800',
            source: 'text-purple-600',
            icon: 'text-purple-500',
            expandBg: 'bg-purple-100/50',
        },
        orange: {
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            text: 'text-orange-800',
            source: 'text-orange-600',
            icon: 'text-orange-500',
            expandBg: 'bg-orange-100/50',
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
