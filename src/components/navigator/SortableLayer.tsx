import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useProfileStore } from '../../store/useProfileStore';
import type { Block } from '../../types';
import { FaGripVertical, FaTrash } from 'react-icons/fa';

interface SortableLayerProps {
    block: Block;
}

export function SortableLayer({ block }: SortableLayerProps) {
    const selectBlock = useProfileStore(s => s.selectBlock);
    const removeBlock = useProfileStore(s => s.removeBlock);
    const selectedBlockId = useProfileStore(s => s.selectedBlockId);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-2 p-3 rounded-lg border mb-2 cursor-pointer transition-colors group ${selectedBlockId === block.id
                    ? 'bg-slate-800 border-primary-500/50'
                    : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600'
                }`}
            onClick={() => selectBlock(block.id)}
        >
            <button
                {...attributes}
                {...listeners}
                className="text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing px-1"
            >
                <FaGripVertical />
            </button>

            <span className="text-xs font-medium text-slate-200 flex-1 truncate capitalize">
                {block.type.replace('-', ' ')}
            </span>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    removeBlock(block.id);
                }}
                className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <FaTrash size={12} />
            </button>
        </div>
    );
}
