import { MainLayout } from '../layout/MainLayout';
import { motion } from 'framer-motion';

export function Dashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full"
        >
            <MainLayout />
        </motion.div>
    );
}
