import { useProfileStore } from '../../store/useProfileStore';
import { HeaderEditor } from './blocks/HeaderEditor';
import { TechStackEditor } from './blocks/TechStackEditor';
import { AboutEditor } from './blocks/AboutEditor';
import { SocialsEditor } from './blocks/SocialsEditor';
import { StatsEditor } from './blocks/StatsEditor';






export function BlockEditor() {
    const selectedBlockId = useProfileStore((state) => state.selectedBlockId);
    const blocks = useProfileStore((state) => state.blocks);

    const selectedBlock = blocks.find(b => b.id === selectedBlockId);

    if (!selectedBlock) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center bg-slate-900/20">
                <p>Select a block from the sidebar to edit its settings.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-900/20">
            <div className="p-6 border-b border-slate-800 bg-slate-900/40 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white capitalize flex items-center gap-2">
                    <span className="text-primary-400">#</span> {selectedBlock.type.replace('-', ' ')}
                </h2>
                <p className="text-sm text-slate-400 mt-1">Configure your section</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {selectedBlock.type === 'header' ? (
                    <HeaderEditor id={selectedBlock.id} data={selectedBlock.data} />
                ) : selectedBlock.type === 'tech-stack' ? (
                    <TechStackEditor id={selectedBlock.id} data={selectedBlock.data} />
                ) : selectedBlock.type === 'about' ? (
                    <AboutEditor id={selectedBlock.id} data={selectedBlock.data} />
                ) : selectedBlock.type === 'stats' ? (
                    <StatsEditor id={selectedBlock.id} data={selectedBlock.data} />
                ) : selectedBlock.type === 'socials' ? (
                    <SocialsEditor id={selectedBlock.id} data={selectedBlock.data} />
                ) : (



                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                        <p className="text-yellow-500 font-mono text-sm">Editor for {selectedBlock.type} is under construction.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
