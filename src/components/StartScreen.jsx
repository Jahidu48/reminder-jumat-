import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import StickerFrame from './StickerFrame';
import { STICKER_IMAGES } from '../constants/flowConfig';

export default function StartScreen({ onSelectYes, onSelectNo }) {
  const [isHoveringNo, setIsHoveringNo] = useState(false);

  return (
    <motion.section
      key="start-screen"
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[400px] mx-auto gpu-accelerated"
    >
      <div className="relative rounded-[2rem] backdrop-blur-2xl bg-white/75 border border-white/95 shadow-[0_24px_65px_-16px_rgba(74,60,40,0.15)] p-6 sm:p-7">
        {/* Foto Stiker Panel 1 */}
        <div className="px-2 pt-1 mb-6">
          <StickerFrame
            src={STICKER_IMAGES.TANYA}
            alt="Ga Jumatan Kah?"
            rotate={-1.6}
          />
        </div>

        {/* Tipografi Utama */}
        <div className="text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#24201B] leading-tight">
            GA JUMATAN KAH?
          </h1>
        </div>

        {/* Dua Tombol Interaksi */}
        <div className="mt-6 grid grid-cols-2 gap-3.5">
          {/* Tombol YES: Statis + Hover Glow */}
          <button
            type="button"
            onClick={onSelectYes}
            className="flex items-center justify-center gap-2 w-full min-h-[56px] px-5 py-3.5 rounded-2xl bg-[#3D7A5A] hover:bg-[#33694D] active:bg-[#2C5B42] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_8px_20px_-4px_rgba(61,122,90,0.32)] hover:shadow-[0_0_28px_rgba(61,122,90,0.55)] transition-[background-color,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D7A5A]/50 cursor-pointer"
          >
            <Check className="w-5 h-5 stroke-[2.8] shrink-0" />
            <span>YES</span>
          </button>

          {/* Tombol NO: Sesekali bergetar kecil (jitter) saat di-hover */}
          <motion.button
            type="button"
            onClick={onSelectNo}
            onHoverStart={() => setIsHoveringNo(true)}
            onHoverEnd={() => setIsHoveringNo(false)}
            onFocus={() => setIsHoveringNo(true)}
            onBlur={() => setIsHoveringNo(false)}
            animate={
              isHoveringNo
                ? {
                    x: [0, -2.5, 2.5, -2, 2, -1, 0],
                    y: [0, 1.5, -1.5, 1, -1, 0],
                    rotate: [0, -1.2, 1.2, -0.8, 0.8, 0],
                    transition: {
                      duration: 0.26,
                      repeat: Infinity,
                      repeatDelay: 0.65,
                      ease: 'easeInOut',
                    },
                  }
                : { x: 0, y: 0, rotate: 0 }
            }
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full min-h-[56px] px-5 py-3.5 rounded-2xl bg-[#C84B4B] hover:bg-[#B73E3E] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_8px_20px_-4px_rgba(200,75,75,0.3)] hover:shadow-[0_10px_24px_-4px_rgba(200,75,75,0.45)] transition-[background-color,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C84B4B]/50 cursor-pointer gpu-accelerated"
          >
            <X className="w-5 h-5 stroke-[2.8] shrink-0" />
            <span>NO</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
