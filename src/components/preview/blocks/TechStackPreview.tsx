import type { TechStackData } from '../../../types';
import { ICON_MAP } from '../../../data/icons';

interface TechStackPreviewProps {
    blockId: string;
    data: TechStackData;
}

export function TechStackPreview({ blockId, data }: TechStackPreviewProps) {
    const getBackground = (iconBrandColor: string, overrideData?: any) => {
        const d = overrideData || data;
        if (d.style === 'solid') {
            return d.useBrandColor ? iconBrandColor : d.solidColor;
        } else {
            if (d.gradientMiddle) {
                const pos = d.gradientMiddlePos !== undefined ? d.gradientMiddlePos : 50;
                return `linear-gradient(${d.gradientAngle}deg, ${d.gradientStart}, ${d.gradientMiddle} ${pos}%, ${d.gradientEnd})`;
            }
            return `linear-gradient(${d.gradientAngle}deg, ${d.gradientStart}, ${d.gradientEnd})`;
        }
    };

    const getTextColor = (_bgColor: string) => {
        // Simple heuristic for contrast toggle if needed, but usually white is safe for these dark/brand colors
        // Or we can let user choose text color. For now, defaulting to white or black based on simple logic? 
        // Actually, badges are usually white text on color.
        return '#FFFFFF';
    };

    const renderIcon = (key: string) => {
        const def = ICON_MAP[key];
        if (!def) return null;

        // Check for custom override
        const override = data.iconOverrides?.[key] || {};
        const mergedData = { ...data, ...override };

        const bg = getBackground(def.brandColor, mergedData);

        return (
            <div
                id={`badge-${blockId}-${key}`}
                key={key}
                className="flex items-center justify-center shadow-md transition-transform hover:scale-105"
                style={{
                    background: bg,
                    borderRadius: `${data.borderRadius}px`,
                    padding: `${data.paddingY}px ${data.paddingX}px`,
                    color: getTextColor(bg),
                    fontSize: `${data.fontSize}px`
                }}
            >
                <def.component size={data.iconSize} />
                {data.showLabel && (
                    <span className="ml-2 font-medium font-sans text-sm leading-none">
                        {def.label}
                    </span>
                )}
            </div>
        );
    };



    if (data.groupByCategory) {
        // Group icons
        const groups: Record<string, string[]> = {};
        data.selectedIcons.forEach(key => {
            const def = ICON_MAP[key];
            if (def) {
                if (!groups[def.category]) groups[def.category] = [];
                groups[def.category].push(key);
            }
        });

        const categoryOrder = ['Languages', 'Frontend', 'Backend', 'Mobile', 'Database', 'DevOps'];

        // Determine alignment for icons within categories
        let alignClass = 'center'; // Default
        if (data.align === 'left') alignClass = 'flex-start';
        if (data.align === 'right') alignClass = 'flex-end';

        return (
            <div className="flex flex-col gap-6 w-full">
                {categoryOrder.map(cat => {
                    if (groups[cat] && groups[cat].length > 0) {
                        return (
                            <div key={cat} className="space-y-4">
                                <h4 className={`text-sm font-semibold text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2 ${data.centerCategoryHeaders ? 'text-center' : 'text-left'}`}>
                                    {cat}
                                </h4>
                                <div
                                    className="flex flex-wrap gap-2 transition-all duration-300"
                                    style={{ justifyContent: alignClass }}
                                >
                                    {groups[cat].map(renderIcon)}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    }

    return (
        <div
            className="flex flex-wrap justify-center"
            style={{ gap: `${data.gap}px` }}
        >
            {data.selectedIcons.map((key) => renderIcon(key))}
        </div>
    );
}
