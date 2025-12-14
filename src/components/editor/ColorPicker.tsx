import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    label?: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative">
            {label && <label className="text-[10px] uppercase text-slate-500 block mb-1">{label}</label>}
            <div className="flex items-center gap-2">
                <button
                    className="w-8 h-8 rounded-lg border border-slate-600 shadow-sm cursor-pointer transition-transform active:scale-95"
                    style={{ backgroundColor: color }}
                    onClick={() => setIsOpen(!isOpen)}
                />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-transparent border-none text-xs text-slate-300 font-mono w-20 focus:ring-0 p-0"
                />
            </div>

            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute z-50 mt-2 bg-slate-900 p-3 rounded-xl border border-slate-700 shadow-xl"
                >
                    <HexColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
}
