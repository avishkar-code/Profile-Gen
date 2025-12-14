import type { StatsData } from '../../../types';
import { useState } from 'react';

// ... (lines 5-82 remain same)

interface StatsPreviewProps {
    data: StatsData;
}

export function StatsPreview({ data }: StatsPreviewProps) {
    const [timestamp, setTimestamp] = useState(Date.now());
    const [isHovered, setIsHovered] = useState(false);

    // If user hasn't entered a name, verify with 'shivasathwik' for a good looking preview
    const isDefault = !data.username;
    const username = (data.username || "shivasathwik").trim();

    const handleRefresh = () => setTimestamp(Date.now());

    // URLs for "Real" mode
    const baseUrl = "https://github-readme-stats.vercel.app/api";
    // Fixed URL encoding for custom_title (spaces must be %20)
    const params = `?username=${username}&show_icons=${data.showIcons}&show_rank=${data.showRank}&theme=${data.variant}&hide_border=true&include_all_commits=${data.includeAllCommits}&custom_title=GitHub%20Stats&t=${timestamp}`;
    // Switched to demolab.com (faster/reliable) instead of Heroku
    const streakUrl = `https://streak-stats.demolab.com/?user=${username}&theme=${data.variant}&hide_border=true&t=${timestamp}`;
    const langUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${data.variant}&hide_border=true&t=${timestamp}`;

    return (
        <div
            className="flex flex-col items-center gap-4 py-4 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Default Mode Badge */}
            {isDefault && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md z-10 pointer-events-none">
                    Previewing Demo
                </div>
            )}

            <button
                onClick={handleRefresh}
                className={`absolute top-0 right-0 p-2 text-xs bg-slate-800/80 text-slate-300 border border-slate-700 rounded hover:bg-slate-700 transition-all ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                title="Refresh Stats"
            >
                Refresh
            </button>

            <div className="flex flex-col items-center gap-4 relative">
                {/* Stats Card */}
                {data.showStats && (
                    <img src={baseUrl + params} alt="GitHub Stats" className="w-full max-w-[450px] shadow-lg rounded-lg transition-transform hover:scale-[1.02]" />
                )}

                {/* Streak Card */}
                {data.showStreak && (
                    <img src={streakUrl} alt="Streak" className="w-full max-w-[450px] shadow-lg rounded-lg transition-transform hover:scale-[1.02]" />
                )}
            </div>

            {/* Languages Card */}
            {data.showLanguages && (
                <img src={langUrl} alt="Top Langs" className="w-full max-w-[450px] shadow-lg rounded-lg transition-transform hover:scale-[1.02]" />
            )}
        </div>
    );
}
