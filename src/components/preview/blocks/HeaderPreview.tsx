import type { HeaderData } from '../../../types';

interface HeaderPreviewProps {
    data: HeaderData;
}

export function HeaderPreview({ data }: HeaderPreviewProps) {
    // Use dangerouslySetInnerHTML to render the raw HTML/Markdown content
    // Since this is a local tool used by the developer, it is relatively safe.

    return (
        <div
            className="prose max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: data.content }}
        />
    );
}
