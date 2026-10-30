import React from 'react';
import { motion } from 'framer-motion';

/**
 * Komponen pembungkus foto bergaya Stiker Modern (outline putih bersih + bayangan lembut).
 */
export default function StickerFrame({
  src,
  alt,
  rotate = -1.5,
  className = '',
  glowClassName = '',
  interactive = true,
}) {
  return (
    <motion.div
      initial={{ rotate }}
      whileHover={interactive ? { rotate: 0, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`relative inline-block w-full bg-white p-2 sm:p-2.5 rounded-[1.4rem] ring-1 ring-black/[0.06] shadow-[0_14px_32px_-8px_rgba(48,38,24,0.22),0_4px_12px_-2px_rgba(48,38,24,0.1)] ${glowClassName} ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1rem] aspect-[16/10] bg-[#EFECE4]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top select-none"
          draggable={false}
        />
        {/* Kilau halus tipis di tepi atas stiker */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.05] rounded-[1rem]" />
      </div>
    </motion.div>
  );
}
