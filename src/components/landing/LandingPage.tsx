import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FaGithub, FaMagic, FaCode, FaPalette, FaStar } from 'react-icons/fa';
import { useState, useEffect, type MouseEvent } from 'react';
import { Magnetic } from '../ui/Magnetic';
import { PixelCanvas } from '../ui/PixelCard';
import beforeImg from '../../assets/before.png';
import afterImg from '../../assets/after.png';

interface LandingPageProps {
    onEnter: () => void;
}

const WORDS = ["Identity", "GitHub Profile", "Dev Brand", "Portfolio"];

export function LandingPage({ onEnter }: LandingPageProps) {
    const [index, setIndex] = useState(0);
    const [starCount, setStarCount] = useState<number | null>(null);

    // Mouse Spotlight Logic
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % WORDS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Fetch GitHub stars
    useEffect(() => {
        fetch('https://api.github.com/repos/Shiva-129/Profile-Gen')
            .then(res => res.json())
            .then(data => {
                if (data.stargazers_count !== undefined) {
                    setStarCount(data.stargazers_count);
                }
            })
            .catch(() => { });
    }, []);

    return (
        <div
            className="relative w-full min-h-screen bg-slate-950 overflow-x-hidden selection:bg-primary-500/30 font-sans group"
            onMouseMove={handleMouseMove}
        >
            {/* GitHub Star Badge - Top Right */}
            <motion.a
                href="https://github.com/Shiva-129/Profile-Gen"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed top-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/50 text-slate-300 text-sm font-medium backdrop-blur-xl shadow-lg hover:border-yellow-500/50 hover:bg-slate-800/90 transition-all group cursor-pointer"
            >
                <FaStar className="text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Star</span>
                {starCount !== null && (
                    <span className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-yellow-400 font-bold">
                        {starCount}
                    </span>
                )}
            </motion.a>

            {/* --- Fixed Background System --- */}

            {/* 1. Base Dark Layer */}
            <div className="fixed inset-0 bg-slate-950 z-0" />

            {/* 2. Spotlight Effect */}
            <motion.div
                className="fixed inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(14, 165, 233, 0.15),
                          transparent 80%
                        )
                      `,
                }}
            />

            {/* 3. Crisp Grid Pattern */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

            {/* 4. Ambient Glows */}
            <div className="fixed top-0 left-0 right-0 h-[500px] bg-primary-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0" />

            {/* 5. Stars */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-20"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            opacity: [0.1, 0.5, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                        style={{
                            width: Math.random() * 2 + 1 + 'px',
                            height: Math.random() * 2 + 1 + 'px',
                        }}
                    />
                ))}
            </div>

            {/* === SECTION 1: HERO === */}
            <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center">
                <div className="text-center space-y-8 max-w-5xl px-4 flex flex-col items-center">
                    {/* Main Headline */}
                    <div className="relative z-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-2"
                        >
                            Craft Your <br />
                            <span className="relative inline-block mt-2 min-h-[1.2em]">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.5 }}
                                        className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 pb-2"
                                    >
                                        {WORDS[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </motion.h1>

                        {/* Decorative underline */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="h-1 w-24 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        The ultimate developer profile generator. Visual drag & drop, real-time preview, and <span className="text-slate-200 font-semibold">stunning dynamic stats</span> for your GitHub README.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6"
                    >
                        <Magnetic intensity={0.2} springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}>
                            <button
                                onClick={onEnter}
                                className="group relative px-10 py-5 bg-slate-100/90 text-slate-950 rounded-full font-bold text-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] backdrop-blur-sm overflow-hidden transition-all hover:scale-105 hover:bg-white border border-white/50"
                            >
                                {/* Shimmer effect */}
                                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />

                                <span className="relative z-10 flex items-center gap-3">
                                    Enter Studio <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                                </span>
                            </button>
                        </Magnetic>

                        <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-medium">No account required • Instant Export</p>
                    </motion.div>

                    {/* Feature Pills */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap justify-center gap-3 pt-6"
                    >
                        <FeaturePill icon={FaMagic} text="Drag & Drop" />
                        <FeaturePill icon={FaGithub} text="Live Stats" />
                        <FeaturePill icon={FaPalette} text="Themes" />
                        <FeaturePill icon={FaCode} text="MD Export" />
                    </motion.div>
                </div>

                {/* Abstract Visuals for Hero (Can stay absolute within section) */}
                <FloatingElement delay={1} x={-350} y={-150} rotate={-10}>
                    <div className="p-5 bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl backdrop-blur-xl hover:border-primary-500/50 transition-colors group">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <div className="w-32 h-2 bg-slate-700/50 rounded-md" />
                            <div className="w-24 h-2 bg-slate-700/50 rounded-md" />
                            <div className="w-28 h-2 bg-slate-700/50 rounded-md" />
                        </div>
                    </div>
                </FloatingElement>

                <FloatingElement delay={1.2} x={350} y={100} rotate={10}>
                    <div className="p-5 bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-4 hover:border-accent-500/50 transition-colors">
                        <div className="p-3 bg-black/50 rounded-xl">
                            <FaGithub className="text-3xl text-white" />
                        </div>
                        <div className="space-y-2">
                            <div className="w-24 h-2.5 bg-slate-600 rounded-md" />
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-sm bg-primary-500/50" />
                                <div className="w-2 h-2 rounded-sm bg-primary-500/80" />
                                <div className="w-2 h-2 rounded-sm bg-primary-500" />
                                <div className="w-2 h-2 rounded-sm bg-slate-700" />
                            </div>
                        </div>
                    </div>
                </FloatingElement>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 text-sm flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                    <div className="w-4 h-7 border border-slate-600 rounded-full flex justify-center pt-1">
                        <div className="w-1 h-2 bg-slate-400 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* === SECTION 2: THE STORY (Before vs After) === */}
            <section className="relative z-10 w-full min-h-screen flex items-center justify-center py-20">
                <div className="max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">

                    {/* Before: 'The Plan' */}
                    <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-sm hover:border-white/10 transition-colors h-full">
                        <PixelCanvas
                            gap={10}
                            speed={25}
                            colors={['#1e293b', '#334155', '#475569']}
                            variant="default"
                            className="w-full h-full"
                        >
                            <div className="flex flex-col space-y-6 p-8 h-full">
                                <div className="space-y-4 flex-grow z-10">
                                    <h2 className="text-3xl font-bold text-slate-300">
                                        "Before, it is just a plan..."
                                    </h2>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        A blank canvas. A standard list of files. No character, no story, just code waiting to be discovered. It hides who you truly are behind a generic interface.
                                    </p>
                                </div>

                                {/* Placeholder for User Image */}
                                <div className="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-700/50 shadow-inner group p-2 z-10">
                                    <img
                                        src={beforeImg}
                                        alt="Before Profile"
                                        className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    {/* Fallback if image missing */}
                                    <div className="hidden absolute inset-0 flex items-center justify-center text-slate-600 text-xs text-center p-4">
                                        Place 'before.png' in public/assets folder to see it here.
                                    </div>
                                </div>
                            </div>
                        </PixelCanvas>
                    </div>

                    {/* After: 'The Description' */}
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl h-full group">
                        <PixelCanvas
                            gap={10}
                            speed={35}
                            colors={['#6366f1', '#a855f7', '#ec4899']} // Indigo, Purple, Pink
                            variant="default"
                            className="w-full h-full"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity pointer-events-none" />

                            <div className="flex flex-col space-y-6 p-8 h-full relative z-10">
                                <div className="space-y-4 flex-grow">
                                    <h2 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                                        "...After, I describe YOU."
                                    </h2>
                                    <p className="text-indigo-200/80 leading-relaxed text-sm">
                                        A dynamic showcase. Live metrics that breathe. A visual identity that captures your essence, your streaks, your languages, and your passion.
                                    </p>
                                </div>

                                {/* Placeholder for User Image */}
                                <div className="relative w-full aspect-video bg-slate-950/50 rounded-xl overflow-hidden border border-indigo-500/30 shadow-2xl mt-6 p-2">
                                    <img
                                        src={afterImg}
                                        alt="After Profile"
                                        className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    {/* Fallback */}
                                    <div className="hidden absolute inset-0 flex items-center justify-center text-indigo-400 text-xs text-center p-4">
                                        Place 'after.png' in public/assets folder to see it here.
                                    </div>
                                </div>
                            </div>
                        </PixelCanvas>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeaturePill({ icon: Icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/40 border border-slate-700/50 rounded-full text-slate-300 text-xs font-medium backdrop-blur-md hover:bg-slate-800/60 hover:border-slate-600 transition-all cursor-default hover:scale-105">
            <Icon className="text-primary-400" />
            {text}
        </div>
    );
}

function FloatingElement({ children, delay, x, y, rotate }: { children: React.ReactNode, delay: number, x: number, y: number, rotate: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
            animate={{ opacity: 1, x, y, rotate }}
            transition={{ delay, duration: 1.5, type: "spring" }}
            className="absolute hidden lg:block z-0 pointer-events-none"
        >
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
