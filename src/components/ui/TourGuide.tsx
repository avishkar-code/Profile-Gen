import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaTimes, FaCheck } from 'react-icons/fa';

interface TourStep {
    targetId: string;
    title: string;
    description: string;
    position: 'right' | 'left' | 'bottom' | 'center';
}

const STEPS: TourStep[] = [
    {
        targetId: 'tour-navigator',
        title: 'Build Your Profile',
        description: 'Drag and drop blocks from here to construct your README. Add headers, stats, tech stacks, and more.',
        position: 'right'
    },
    {
        targetId: 'tour-editor',
        title: 'Customize Content',
        description: 'Edit the details of each block here. Change texts, select icons, and pick your colors.',
        position: 'right' // Ideally left, but right works if avoiding overlap
    },
    {
        targetId: 'tour-preview',
        title: 'Live Preview',
        description: 'See your changes in real-time. This is exactly how it will look on GitHub.',
        position: 'left'
    }
];

export function TourGuide() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        // Check if user has already seen the tour
        const hasSeenTour = localStorage.getItem('hasSeenTour');
        if (!hasSeenTour) {
            // Small delay to ensure UI is ready
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const updateRect = () => {
            const step = STEPS[currentStep];
            const element = document.getElementById(step.targetId);
            if (element) {
                setTargetRect(element.getBoundingClientRect());
            }
        };

        updateRect();
        window.addEventListener('resize', updateRect);
        return () => window.removeEventListener('resize', updateRect);
    }, [currentStep, isVisible]);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenTour', 'true');
    };

    const handleSkip = () => {
        handleComplete();
    };

    if (!isVisible || !targetRect) return null;

    const step = STEPS[currentStep];
    const isLast = currentStep === STEPS.length - 1;

    return (
        <AnimatePresence>
            {/* Backdrop / Dimmer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-slate-950/80 pointer-events-none"
            />

            {/* Highlighter Box */}
            <motion.div
                layoutId="tour-highlight"
                initial={false}
                animate={{
                    top: targetRect.top,
                    left: targetRect.left,
                    width: targetRect.width,
                    height: targetRect.height,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed z-[70] rounded-xl border-2 border-primary-500 shadow-[0_0_0_9999px_rgba(2,6,23,0.85)] pointer-events-none"
            />

            {/* Tooltip Card */}
            <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="fixed z-[80] w-80 bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl"
                style={{
                    top: targetRect.top + 50, // Default offset
                    left: step.position === 'right'
                        ? targetRect.right + 20
                        : step.position === 'left'
                            ? targetRect.left - 340
                            : targetRect.left + 50
                }}
            >
                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                        {STEPS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-primary-500' : 'w-1.5 bg-slate-700'}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium ml-auto uppercase tracking-wider">
                        Step {currentStep + 1}/{STEPS.length}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{step.description}</p>

                <div className="flex items-center justify-between">
                    <button
                        onClick={handleSkip}
                        className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        Skip Tour
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-400 text-white text-sm font-semibold rounded-full shadow-lg shadow-primary-500/20 transition-all active:scale-95"
                    >
                        {isLast ? (
                            <>
                                Finish <FaCheck />
                            </>
                        ) : (
                            <>
                                Next <FaArrowRight />
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
