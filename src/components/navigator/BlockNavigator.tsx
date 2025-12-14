
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useProfileStore } from '../../store/useProfileStore';
import type { BlockType } from '../../types';
import { FaHeading, FaCode, FaChartBar, FaUser, FaShareAlt } from 'react-icons/fa';
import { SortableLayer } from './SortableLayer';

const BLOCK_TYPES: { type: BlockType; label: string; icon: any }[] = [
    { type: 'header', label: 'Header', icon: FaHeading },
    { type: 'about', label: 'About Me', icon: FaUser },
    { type: 'tech-stack', label: 'Tech Stack', icon: FaCode },
    { type: 'stats', label: 'GitHub Stats', icon: FaChartBar },
    { type: 'socials', label: 'Socials', icon: FaShareAlt },
];

export function BlockNavigator() {
    const blocks = useProfileStore((state) => state.blocks);
    const addBlock = useProfileStore((state) => state.addBlock);
    const reorderBlocks = useProfileStore((state) => state.reorderBlocks);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            // We need to pass IDs to the store. 
            // The store implementation looks like: reorderBlocks(activeId, overId) -> uses findIndex.
            // dnd-kit returns IDs.
            reorderBlocks(active.id as string, over.id as string);
        }
    }

    return (
        <div className="p-4 h-full flex flex-col w-full">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Profile Gen
                </h1>
                <p className="text-lg font-semibold text-slate-300 mt-1">The Ultimate README Builder</p>
            </div>

            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Add Blocks</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
                {BLOCK_TYPES.map((block) => (
                    <button
                        key={block.type}
                        onClick={() => addBlock(block.type)}
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 hover:border-primary-500/30 transition-all group active:scale-95"
                    >
                        <block.icon className="text-2xl text-slate-400 group-hover:text-primary-400 mb-2 transition-colors" />
                        <span className="text-xs text-slate-300 font-medium">{block.label}</span>
                    </button>
                ))}
            </div>

            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Your Profile</h2>
            <div className="flex-1 overflow-y-auto min-h-0">
                {blocks.length === 0 ? (
                    <p className="text-slate-600 text-sm text-center italic mt-10">No blocks added yet.</p>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={blocks.map(b => b.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {blocks.map(block => (
                                <SortableLayer key={block.id} block={block} />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
}
