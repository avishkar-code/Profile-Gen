import type { StatsData } from '../../../types';
import { useProfileStore } from '../../../store/useProfileStore';
import { FaPalette, FaCheckCircle, FaGithub, FaLayerGroup, FaExclamationTriangle } from 'react-icons/fa';

interface StatsEditorProps {
    id: string;
    data: StatsData;
}

const THEMES = [
    'dracula', 'radical', 'merko', 'gruvbox', 'tokyonight', 'onedark', 'cobalt', 'synthwave', 'highcontrast', 'material-palenight'
];

export function StatsEditor({ id, data }: StatsEditorProps) {
    const updateBlock = useProfileStore((state) => state.updateBlock);

    const handleChange = (field: keyof StatsData, value: any) => {
        updateBlock(id, { [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* Username Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-400">
                    <FaGithub />
                    <span className="text-xs font-bold uppercase tracking-widest">GitHub Username</span>
                </div>
                <input
                    type="text"
                    value={data.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="w-full glass-input px-3 py-2 text-sm"
                    placeholder="Enter username (or leave blank for Demo)"
                />
                <p className="text-[10px] text-slate-500 pt-1">
                    Leave blank to design with a <b>Template</b>. Enter a username to test real data.
                </p>
            </div>

            {/* Cards Visibility Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary-400">
                    <FaLayerGroup />
                    <span className="text-xs font-bold uppercase tracking-widest">Cards to Show</span>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 rounded bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors group">
                        <span className="text-sm text-slate-300 group-hover:text-slate-100">General Stats</span>
                        <input
                            type="checkbox"
                            checked={data.showStats}
                            onChange={(e) => handleChange('showStats', e.target.checked)}
                            className="accent-primary-500 w-4 h-4 cursor-pointer"
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors group">
                        <span className="text-sm text-slate-300 group-hover:text-slate-100">Streak Stats</span>
                        <input
                            type="checkbox"
                            checked={data.showStreak}
                            onChange={(e) => handleChange('showStreak', e.target.checked)}
                            className="accent-primary-500 w-4 h-4 cursor-pointer"
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors group">
                        <span className="text-sm text-slate-300 group-hover:text-slate-100">Top Languages</span>
                        <input
                            type="checkbox"
                            checked={data.showLanguages}
                            onChange={(e) => handleChange('showLanguages', e.target.checked)}
                            className="accent-primary-500 w-4 h-4 cursor-pointer"
                        />
                    </label>
                </div>
            </div>

            {/* Theme Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary-400">
                    <FaPalette />
                    <span className="text-xs font-bold uppercase tracking-widest">Color Theme</span>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                    {THEMES.map(theme => (
                        <button
                            key={theme}
                            onClick={() => handleChange('variant', theme)}
                            className={`text-xs px-3 py-2 rounded-lg capitalize transition-all border text-left ${data.variant === theme
                                ? 'bg-primary-500 text-white border-primary-400'
                                : 'bg-slate-800/30 text-slate-400 border-transparent hover:bg-slate-800'
                                }`}
                        >
                            {theme}
                        </button>
                    ))}
                </div>
            </div>

            {/* Options Section */}
            {data.showStats && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary-400">
                        <FaCheckCircle />
                        <span className="text-xs font-bold uppercase tracking-widest">General Options</span>
                    </div>

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg space-y-2">
                        <div className="flex items-start gap-2">
                            <FaExclamationTriangle className="text-yellow-500 text-xs mt-0.5 shrink-0" />
                            <p className="text-[10px] text-yellow-200/80 leading-relaxed">
                                Not updating immediately? Don't worry! These images are <b>dynamic</b>. They automatically fetch your latest GitHub data every few hours.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <FaExclamationTriangle className="text-yellow-500 text-xs mt-0.5 shrink-0" />
                            <p className="text-[10px] text-yellow-200/80 leading-relaxed">
                                If you see "Something went wrong" or timeout errors, try disabling <b>Show Rank</b> or <b>Include All Commits</b> as these can be slow for large profiles.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center justify-between p-3 rounded bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors group">
                            <span className="text-sm text-slate-300 group-hover:text-slate-100">Show Icons</span>
                            <input
                                type="checkbox"
                                checked={data.showIcons}
                                onChange={(e) => handleChange('showIcons', e.target.checked)}
                                className="accent-primary-500 w-4 h-4 cursor-pointer"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 rounded bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors group">
                            <span className="text-sm text-slate-300 group-hover:text-slate-100">Show Rank</span>
                            <input
                                type="checkbox"
                                checked={data.showRank}
                                onChange={(e) => handleChange('showRank', e.target.checked)}
                                className="accent-primary-500 w-4 h-4 cursor-pointer"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 rounded bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors group">
                            <span className="text-sm text-slate-300 group-hover:text-slate-100">Include All Commits</span>
                            <input
                                type="checkbox"
                                checked={data.includeAllCommits}
                                onChange={(e) => handleChange('includeAllCommits', e.target.checked)}
                                className="accent-primary-500 w-4 h-4 cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}
