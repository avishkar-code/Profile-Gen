import type { AboutData } from '../../../types';
import { useProfileStore } from '../../../store/useProfileStore';
import { FaCode } from 'react-icons/fa';

interface AboutEditorProps {
    id: string;
    data: AboutData;
}



export function AboutEditor({ id, data }: AboutEditorProps) {
    const updateBlock = useProfileStore((state) => state.updateBlock);

    const handleChange = (content: string) => {
        updateBlock(id, { content });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-primary-400 mb-2">
                    <FaCode />
                    <span className="text-xs font-bold uppercase tracking-widest">About Me Code</span>
                </div>

                <textarea
                    value={data.content || ''}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full h-[400px] bg-slate-950 font-mono text-xs text-slate-300 p-4 rounded-lg border border-slate-700 focus:border-primary-500 outline-none leading-relaxed resize-none custom-scrollbar"
                    placeholder="### About Me..."
                    spellCheck={false}
                />
            </div>
        </div>
    );
}
