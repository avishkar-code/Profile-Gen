import { BlockNavigator } from '../navigator/BlockNavigator';
import { BlockEditor } from '../editor/BlockEditor';
import { LivePreview } from '../preview/LivePreview';
import { TourGuide } from '../ui/TourGuide';

export function MainLayout() {
    return (
        <div className="flex h-screen w-full bg-slate-950 overflow-hidden font-sans text-slate-200">
            <TourGuide />

            {/* Column 1: Navigator */}
            <div id="tour-navigator" className="w-80 border-r border-slate-800 flex-shrink-0 bg-slate-900/50 backdrop-blur-xl flex flex-col z-20">
                <BlockNavigator />
            </div>

            {/* Column 2: Editor */}
            <div id="tour-editor" className="w-[450px] border-r border-slate-800 bg-slate-900/30 flex flex-col overflow-hidden z-10">
                <BlockEditor />
            </div>

            {/* Column 3: Preview */}
            <div id="tour-preview" className="flex-1 bg-slate-950 overflow-y-auto relative scrollbar-hide">
                <LivePreview />
            </div>
        </div>
    );
}
