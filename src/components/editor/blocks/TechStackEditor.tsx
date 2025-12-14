import { ColorPicker } from '../ColorPicker';
import type { TechStackData } from '../../../types';
import { useProfileStore } from '../../../store/useProfileStore';
import { ICON_KEYS, ICON_MAP } from '../../../data/icons';
import { FaPalette, FaShapes, FaIcons, FaPen, FaGripVertical } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TechStackEditorProps {
    id: string;
    data: TechStackData;
}

// Sortable Item Component
function SortableIconTag({ id, active, onClick, children }: { id: string, active: boolean, onClick: () => void, children: React.ReactNode }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex-shrink-0">
            <button
                onClick={onClick}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-2 cursor-grab active:cursor-grabbing ${active
                    ? 'bg-primary-500 text-white border-primary-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                    }`}
            >
                {children}
            </button>
        </div>
    );
}

export function TechStackEditor({ id, data }: TechStackEditorProps) {
    const updateBlock = useProfileStore((state) => state.updateBlock);
    const [focusedIcon, setFocusedIcon] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Sensors for DnD
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require 8px movement to start drag, ensuring clicks work
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY === 0) return;
                // Only hijack scroll if the content overflows
                if (el.scrollWidth > el.clientWidth) {
                    e.preventDefault();
                    el.scrollLeft += e.deltaY;
                }
            };
            // Use passive: false to allow preventDefault
            el.addEventListener('wheel', onWheel, { passive: false });
            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);

    const handleChange = (field: keyof TechStackData, value: any) => {
        updateBlock(id, { [field]: value });
    };

    const toggleIcon = (key: string) => {
        const newIcons = data.selectedIcons.includes(key)
            ? data.selectedIcons.filter(k => k !== key)
            : [...data.selectedIcons, key];

        // If removing the focused icon, Reset focus
        if (focusedIcon === key) setFocusedIcon(null);

        handleChange('selectedIcons', newIcons);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = data.selectedIcons.indexOf(String(active.id));
            const newIndex = data.selectedIcons.indexOf(String(over.id));

            if (oldIndex !== -1 && newIndex !== -1) {
                const newOrder = arrayMove(data.selectedIcons, oldIndex, newIndex);
                handleChange('selectedIcons', newOrder);
            }
        }
    };

    // Helper to get current value (global or overridden)
    const getValue = (key: string, field: string, globalValue: any) => {
        if (!key || !data.iconOverrides?.[key]) return globalValue;
        return data.iconOverrides[key][field] !== undefined
            ? data.iconOverrides[key][field]
            : globalValue;
    };

    const handleOverrideChange = (field: string, value: any) => {
        if (!focusedIcon) return;

        const currentOverrides = data.iconOverrides || {};
        const iconOverride = currentOverrides[focusedIcon] || {};

        const newOverrides = {
            ...currentOverrides,
            [focusedIcon]: {
                ...iconOverride,
                [field]: value
            }
        };

        handleChange('iconOverrides', newOverrides);
    };

    const clearOverride = () => {
        if (!focusedIcon) return;
        const currentOverrides = { ...data.iconOverrides };
        delete currentOverrides[focusedIcon];
        handleChange('iconOverrides', currentOverrides);
    };

    const activeLabel = focusedIcon ? ICON_MAP[focusedIcon]?.label : "Global Settings";

    // Determine values to show in inputs
    const currentStyle = focusedIcon ? getValue(focusedIcon, 'style', data.style) : data.style;
    const currentUseBrandColor = focusedIcon ? getValue(focusedIcon, 'useBrandColor', data.useBrandColor) : data.useBrandColor;
    const currentSolidColor = focusedIcon ? getValue(focusedIcon, 'solidColor', data.solidColor) : data.solidColor;
    const currentGradientStart = focusedIcon ? getValue(focusedIcon, 'gradientStart', data.gradientStart) : data.gradientStart;
    const currentGradientEnd = focusedIcon ? getValue(focusedIcon, 'gradientEnd', data.gradientEnd) : data.gradientEnd;
    const currentGradientMiddle = focusedIcon ? getValue(focusedIcon, 'gradientMiddle', data.gradientMiddle) : data.gradientMiddle;
    const currentGradientMiddlePos = focusedIcon ? getValue(focusedIcon, 'gradientMiddlePos', data.gradientMiddlePos) : data.gradientMiddlePos;
    const currentGradientAngle = focusedIcon ? getValue(focusedIcon, 'gradientAngle', data.gradientAngle) : data.gradientAngle;

    const handleAddMiddle = () => {
        if (focusedIcon) {
            handleOverrideChange('gradientMiddle', '#888888');
            handleOverrideChange('gradientMiddlePos', 50);
        } else {
            handleChange('gradientMiddle', '#888888');
            handleChange('gradientMiddlePos', 50);
        }
    };

    const handleRemoveMiddle = () => {
        if (focusedIcon) {
            handleOverrideChange('gradientMiddle', undefined);
            handleOverrideChange('gradientMiddlePos', undefined);
        } else {
            handleChange('gradientMiddle', undefined);
            handleChange('gradientMiddlePos', undefined);
        }
    };


    return (
        <div className="space-y-8">
            {/* Icon Selection */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-400">
                    <FaIcons />
                    <span className="text-xs font-bold uppercase tracking-widest">Select Icons</span>
                </div>
                <div className="grid grid-cols-5 gap-2 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 max-h-60 overflow-y-auto custom-scrollbar">
                    {ICON_KEYS.map((key) => {
                        const def = ICON_MAP[key];
                        const isSelected = data.selectedIcons.includes(key);
                        return (
                            <button
                                key={key}
                                onClick={() => toggleIcon(key)}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${isSelected
                                    ? 'bg-primary-500/20 border-primary-500 text-primary-300 ring-1 ring-primary-500'
                                    : 'bg-slate-800 border-transparent hover:bg-slate-700 opactiy-70 hover:opacity-100 text-slate-400'
                                    } border`}
                                title={def.label}
                            >
                                <def.component className="text-xl mb-1" />
                                <span className="text-[10px] truncate w-full text-center">{def.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Editing Context Selection & Reordering */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary-400">
                        <FaPen />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            Editing: <span className="text-white">{activeLabel}</span>
                        </span>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Drag to reorder</span>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar items-center"
                >
                    <button
                        onClick={() => setFocusedIcon(null)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border flex-shrink-0 ${focusedIcon === null
                            ? 'bg-primary-500 text-white border-primary-400'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                            }`}
                    >
                        Global Defaults
                    </button>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={data.selectedIcons}
                            strategy={horizontalListSortingStrategy}
                        >
                            {data.selectedIcons.map(key => {
                                const def = ICON_MAP[key];
                                const hasOverride = data.iconOverrides?.[key];
                                return (
                                    <SortableIconTag
                                        key={key}
                                        id={key}
                                        active={focusedIcon === key}
                                        onClick={() => setFocusedIcon(key)}
                                    >
                                        <span className="opacity-50 hover:opacity-100 cursor-grab"><FaGripVertical /></span>
                                        {def.label}
                                        {hasOverride && <span className="w-1.5 h-1.5 rounded-full bg-accent-400 block" />}
                                    </SortableIconTag>
                                );
                            })}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>

            {/* Style & Colors - Dynamic based on focus */}
            <div className="space-y-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 transition-all">

                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-primary-400">
                        <FaPalette />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {focusedIcon ? `${ICON_MAP[focusedIcon]?.label} Style` : "Global Style"}
                        </span>
                    </div>
                    {focusedIcon && data.iconOverrides?.[focusedIcon] && (
                        <button
                            onClick={clearOverride}
                            className="text-[10px] text-red-400 hover:text-red-300 underline"
                        >
                            Reset to Global
                        </button>
                    )}
                </div>

                <div className="flex p-1 bg-slate-800 rounded-lg">
                    <button
                        onClick={() => focusedIcon ? handleOverrideChange('style', 'solid') : handleChange('style', 'solid')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${currentStyle === 'solid' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Solid
                    </button>
                    <button
                        onClick={() => focusedIcon ? handleOverrideChange('style', 'gradient') : handleChange('style', 'gradient')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${currentStyle === 'gradient' ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Gradient
                    </button>
                </div>

                {currentStyle === 'solid' && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Use Brand Colors</span>
                            <button
                                onClick={() => focusedIcon ? handleOverrideChange('useBrandColor', !currentUseBrandColor) : handleChange('useBrandColor', !data.useBrandColor)}
                                className={`w-10 h-5 rounded-full transition-colors relative ${currentUseBrandColor ? 'bg-primary-500' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${currentUseBrandColor ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        {!currentUseBrandColor && (
                            <ColorPicker
                                color={currentSolidColor}
                                onChange={(c) => focusedIcon ? handleOverrideChange('solidColor', c) : handleChange('solidColor', c)}
                            />
                        )}
                    </div>
                )}

                {currentStyle === 'gradient' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <ColorPicker
                                label="Start Color"
                                color={currentGradientStart}
                                onChange={(c) => focusedIcon ? handleOverrideChange('gradientStart', c) : handleChange('gradientStart', c)}
                            />
                            <ColorPicker
                                label="End Color"
                                color={currentGradientEnd}
                                onChange={(c) => focusedIcon ? handleOverrideChange('gradientEnd', c) : handleChange('gradientEnd', c)}
                            />
                        </div>

                        {/* Middle Stop Section */}
                        <div className="p-3 bg-slate-800/50 rounded-lg space-y-3">
                            {!currentGradientMiddle ? (
                                <button
                                    onClick={handleAddMiddle}
                                    className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-400 rounded transition-colors"
                                >
                                    + Add Middle Stop
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex items-end justify-between">
                                        <ColorPicker
                                            label="Middle Color"
                                            color={currentGradientMiddle}
                                            onChange={(c) => focusedIcon ? handleOverrideChange('gradientMiddle', c) : handleChange('gradientMiddle', c)}
                                        />
                                        <button
                                            onClick={handleRemoveMiddle}
                                            className="text-[10px] text-red-400 hover:text-red-300 underline mb-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-slate-500 flex justify-between">
                                            <span>Position</span>
                                            <span>{currentGradientMiddlePos || 50}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            value={currentGradientMiddlePos || 50}
                                            onChange={(e) => focusedIcon ? handleOverrideChange('gradientMiddlePos', Number(e.target.value)) : handleChange('gradientMiddlePos', Number(e.target.value))}
                                            className="w-full accent-primary-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase text-slate-500">Angle: {currentGradientAngle}°</label>
                            <input
                                type="range"
                                min="0" max="360"
                                value={currentGradientAngle}
                                onChange={(e) => focusedIcon ? handleOverrideChange('gradientAngle', Number(e.target.value)) : handleChange('gradientAngle', Number(e.target.value))}
                                className="w-full accent-primary-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Geometry (Always Global) */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-400">
                    <FaShapes />
                    <span className="text-xs font-bold uppercase tracking-widest">Global Geometry</span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase text-slate-500">Radius: {data.borderRadius}px</label>
                        <input
                            type="range" min="0" max="50"
                            value={data.borderRadius}
                            onChange={(e) => handleChange('borderRadius', Number(e.target.value))}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase text-slate-500">Gap: {data.gap}px</label>
                        <input
                            type="range" min="0" max="20"
                            value={data.gap}
                            onChange={(e) => handleChange('gap', Number(e.target.value))}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
                        />
                    </div>
                    {/* ... other geometry inputs ... */}
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                    <span className="text-xs text-slate-300">Show Labels (Name)</span>
                    <input
                        type="checkbox"
                        checked={data.showLabel}
                        onChange={(e) => handleChange('showLabel', e.target.checked)}
                        className="accent-primary-500 w-4 h-4"
                    />
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                    <span className="text-xs text-slate-300">Group by Category</span>
                    <input
                        type="checkbox"
                        checked={data.groupByCategory}
                        onChange={(e) => handleChange('groupByCategory', e.target.checked)}
                        className="accent-primary-500 w-4 h-4"
                    />
                </div>

                {/* Alignment Controls - Show for both, but behavior differs */}
                <div className="space-y-1 pt-2">
                    <label className="text-[10px] uppercase text-slate-500">Icon Alignment</label>
                    <div className="flex p-1 bg-slate-800 rounded-lg">
                        {(['left', 'center', 'right'] as const).map((align) => (
                            <button
                                key={align}
                                onClick={() => handleChange('align', align)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${data.align === align ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                {align}
                            </button>
                        ))}
                    </div>
                </div>

                {data.groupByCategory && (
                    <div className="flex items-center justify-between p-2 rounded bg-slate-800/30 ml-4 border-l-2 border-slate-700">
                        <span className="text-xs text-slate-300">Center Headers</span>
                        <input
                            type="checkbox"
                            checked={data.centerCategoryHeaders}
                            onChange={(e) => handleChange('centerCategoryHeaders', e.target.checked)}
                            className="accent-primary-500 w-4 h-4"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
