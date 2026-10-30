import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingTimeBanner({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className="fixed top-4 inset-x-4 z-40 flex justify-center pointer-events-none pr-12 sm:pr-0"
        >
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-xl bg-[#FFFDF8]/90 border border-[#E5D3B3] shadow-[0_10px_28px_-6px_rgba(120,86,32,0.16)]"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>

            <p className="text-xs sm:text-sm font-semibold text-[#5C4318] leading-snug">
              ⚠️ Waktu Jumatan di wilayahmu sudah dekat!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
