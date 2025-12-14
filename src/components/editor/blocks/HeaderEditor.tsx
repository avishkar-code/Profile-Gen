import type { HeaderData } from '../../../types';
import { useProfileStore } from '../../../store/useProfileStore';
import { FaCode } from 'react-icons/fa';

interface HeaderEditorProps {
    id: string;
    data: HeaderData;
}



export function HeaderEditor({ id, data }: HeaderEditorProps) {
    const updateBlock = useProfileStore((state) => state.updateBlock);

    const handleChange = (content: string) => {
        updateBlock(id, { content });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-primary-400 mb-2">
                    <FaCode />
                    <span className="text-xs font-bold uppercase tracking-widest">Header Code</span>
                </div>
                <p className="text-xs text-slate-500">
                    Edit the HTML/Markdown for your header directly.
                </p>

                <textarea
                    value={data.content || ''}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full h-[400px] bg-slate-950 font-mono text-xs text-slate-300 p-4 rounded-lg border border-slate-700 focus:border-primary-500 outline-none leading-relaxed resize-none custom-scrollbar"
                    placeholder="<div align='center'>...</div>"
                    spellCheck={false}
                />
            </div>
        </div>
    );
}
