import type { SocialsData } from '../../../types';
import { useProfileStore } from '../../../store/useProfileStore';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaEnvelope } from 'react-icons/fa';

interface SocialsEditorProps {
    id: string;
    data: SocialsData;
}

export function SocialsEditor({ id, data }: SocialsEditorProps) {
    const updateBlock = useProfileStore((state) => state.updateBlock);

    const handleChange = (field: keyof SocialsData, value: string) => {
        updateBlock(id, { [field]: value });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">Social Links</label>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 focus-within:border-primary-500/50 transition-colors">
                        <FaGithub className="text-xl text-slate-400 shrink-0" />
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold">GitHub Username</label>
                            <input
                                type="text"
                                value={data.github}
                                onChange={(e) => handleChange('github', e.target.value)}
                                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-slate-600 font-mono"
                                placeholder="username"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 focus-within:border-primary-500/50 transition-colors">
                        <FaLinkedin className="text-xl text-slate-400 shrink-0" />
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold">LinkedIn URL</label>
                            <input
                                type="text"
                                value={data.linkedin}
                                onChange={(e) => handleChange('linkedin', e.target.value)}
                                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-slate-600 font-mono"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 focus-within:border-primary-500/50 transition-colors">
                        <FaTwitter className="text-xl text-slate-400 shrink-0" />
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold">Twitter / X URL</label>
                            <input
                                type="text"
                                value={data.twitter}
                                onChange={(e) => handleChange('twitter', e.target.value)}
                                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-slate-600 font-mono"
                                placeholder="https://x.com/..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 focus-within:border-primary-500/50 transition-colors">
                        <FaGlobe className="text-xl text-slate-400 shrink-0" />
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold">Portfolio Website</label>
                            <input
                                type="text"
                                value={data.website}
                                onChange={(e) => handleChange('website', e.target.value)}
                                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-slate-600 font-mono"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 focus-within:border-primary-500/50 transition-colors">
                        <FaEnvelope className="text-xl text-slate-400 shrink-0" />
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-slate-600 font-mono"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
