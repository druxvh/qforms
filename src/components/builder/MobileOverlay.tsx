'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function MobileOverlay({
    visible,
    onClick,
}: {
    visible: boolean;
    onClick: () => void;
}) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, backdropFilter: 'blur(1px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm"
                    onClick={onClick}
                />
            )}
        </AnimatePresence>
    );
}
