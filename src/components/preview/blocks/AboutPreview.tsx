import type { AboutData } from '../../../types';

interface AboutPreviewProps {
    data: AboutData;
}

export function AboutPreview({ data }: AboutPreviewProps) {
    return (
        <div
            className="prose max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: data.content }}
        />
    );
}
