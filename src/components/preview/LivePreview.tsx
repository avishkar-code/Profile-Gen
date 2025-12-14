import { useProfileStore } from '../../store/useProfileStore';
import { HeaderPreview } from './blocks/HeaderPreview';
import { TechStackPreview } from './blocks/TechStackPreview';
import { AboutPreview } from './blocks/AboutPreview';
import { SocialsPreview } from './blocks/SocialsPreview';
import { StatsPreview } from './blocks/StatsPreview';



import { exportProfile } from '../../utils/exportHandler';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import { useState } from 'react';



export function LivePreview() {
    const blocks = useProfileStore((state) => state.blocks);
    const [isExporting, setIsExporting] = useState(false);

    const handleDownload = async () => {
        setIsExporting(true);
        // Tiny delay to let React render any pending states if needed, though usually not needed here.
        // Also gives user feedback that something is happening.
        setTimeout(async () => {
            try {
                await exportProfile(blocks);
            } catch (error) {
                console.error("Export failed", error);
                alert("Failed to export profile. See console for details.");
            } finally {
                setIsExporting(false);
            }
        }, 500);
    };

    return (
        <div className="min-h-full w-full bg-checkerboard p-8 flex justify-center items-start pt-16 relative">
            {/* Floating Action Button */}
            <div className="fixed top-6 right-6 z-50">
                <button
                    onClick={handleDownload}
                    disabled={isExporting || blocks.length === 0}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isExporting ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                    {isExporting ? 'Generating Bundle...' : 'Download ZIP'}
                </button>
            </div>

            <div className="w-[850px] min-h-[800px] bg-white text-slate-900 rounded-sm shadow-2xl p-12 relative font-sans transform transition-all">
                <div className="absolute top-0 right-0 p-3 opacity-30 text-xs font-mono uppercase tracking-widest font-bold">README.md Preview</div>

                {blocks.length === 0 ? (
                    <div className="h-40 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                        <p>Add blocks to see the preview</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {blocks.map(block => (
                            <div key={block.id} className="relative group">
                                {/* Hover overlay for selection/visual aid */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/20 rounded-lg pointer-events-none transition-all" />

                                {block.type === 'header' && <HeaderPreview data={block.data} />}
                                {block.type === 'tech-stack' && <TechStackPreview blockId={block.id} data={block.data} />}
                                {block.type === 'about' && <AboutPreview data={block.data} />}
                                {block.type === 'stats' && <StatsPreview data={block.data} />}
                                {block.type === 'socials' && <SocialsPreview data={block.data} />}
                                {block.type !== 'header' && block.type !== 'tech-stack' && block.type !== 'about' && block.type !== 'socials' && block.type !== 'stats' && (




                                    <div className="border border-dashed border-slate-300 p-4 rounded text-center text-slate-400">
                                        [{block.type} placeholder]
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
