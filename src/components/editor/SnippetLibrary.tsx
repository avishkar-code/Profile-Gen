import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

export interface Snippet {
    label: string;
    code: string;
    description?: string;
}

interface SnippetLibraryProps {
    title?: string;
    snippets: Snippet[];
}

export function SnippetLibrary({ title = "Quick Snippets", snippets }: SnippetLibraryProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (code: string, index: number) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-3 mt-6 border-t border-slate-700/50 pt-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
            <div className="grid grid-cols-1 gap-2">
                {snippets.map((snippet, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/40 rounded border border-slate-700/50 hover:bg-slate-800/60 transition-colors group">
                        <div className="flex-1 min-w-0 mr-3">
                            <p className="text-xs font-medium text-slate-200 truncate">{snippet.label}</p>
                            {snippet.description && (
                                <p className="text-[10px] text-slate-500 truncate">{snippet.description}</p>
                            )}
                        </div>
                        <button
                            onClick={() => handleCopy(snippet.code, index)}
                            className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-medium rounded bg-slate-700 hover:bg-primary-600 text-slate-300 hover:text-white transition-all shadow-sm"
                            title="Copy to clipboard"
                        >
                            {copiedIndex === index ? (
                                <>
                                    <FaCheck className="text-emerald-400" />
                                    <span>Copied</span>
                                </>
                            ) : (
                                <>
                                    <FaCopy />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
