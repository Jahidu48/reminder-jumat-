import React from 'react';
import { motion } from 'framer-motion';
import { Sword } from 'lucide-react';
import StickerFrame from './StickerFrame';
import {
  FLOW_STATES,
  STICKER_IMAGES,
  WARNING_TIMINGS,
} from '../constants/flowConfig';

export default function WarningSequence({ currentState }) {
  // FASE 1 (0s - 14.2s): "NGATUR LUWH!" — Merah marun menyala + Stiker 2 + Heavy Shake & Glitch
  if (currentState === FLOW_STATES.WARNING_PHASE_1) {
    return (
      <div className="fixed inset-0 z-40 overflow-hidden bg-gradient-to-br from-[#8E1C1C] via-[#A92222] to-[#4A0E0E] flex items-center justify-center p-5 select-none">
        {/* Scanlines & Vignette */}
        <div className="pointer-events-none absolute inset-0 glitch-scanlines opacity-65" />
        <motion.div
          animate={{ opacity: [0.35, 0.72, 0.4, 0.8, 0.35] }}
          transition={{ duration: 0.38, repeat: Infinity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(25,4,4,0.72)_100%)]"
        />

        {/* Glitch Bar Accent */}
        <motion.div
          animate={{
            y: ['-30vh', '25vh', '-10vh', '35vh', '-20vh'],
            opacity: [0, 0.5, 0, 0.4, 0],
            scaleY: [1, 2, 0.7, 1.6, 1],
          }}
          transition={{ duration: 0.45, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute inset-x-0 h-2.5 bg-white/25 mix-blend-overlay"
        />

        {/* Heavy Screen Shake Container */}
        <motion.div
          animate={{
            x: [0, -14, 12, -10, 14, -8, 7, -12, 9, 0],
            y: [0, 9, -10, 12, -9, 7, -10, 5, -7, 0],
            rotate: [0, -1.8, 1.8, -1.3, 1.5, -1, 0.8, -1.2, 0],
            skewX: [0, -2, 2, 0, -1.5, 1.5, 0],
          }}
          transition={{
            duration: 0.34,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative z-10 flex flex-col items-center text-center max-w-sm w-full gpu-accelerated"
        >
          {/* Stiker Panel 2 */}
          <div className="w-64 sm:w-72 mb-6">
            <StickerFrame
              src={STICKER_IMAGES.NGATUR}
              alt="Ngatur Luwh!"
              rotate={-2}
              interactive={false}
              glowClassName="shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </div>

          {/* Glitch Layered Typography */}
          <div className="relative inline-block">
            <motion.span
              aria-hidden="true"
              animate={{
                x: [-4, 4, -5, 3, -4],
                y: [2, -2, 1, -2, 2],
                opacity: [0.7, 0.35, 0.8, 0.3, 0.7],
              }}
              transition={{ duration: 0.19, repeat: Infinity }}
              className="pointer-events-none select-none absolute inset-0 font-display text-4xl sm:text-6xl font-black tracking-tight text-amber-200 mix-blend-overlay"
            >
              NGATUR LUWH!
            </motion.span>

            <h1 className="relative font-display text-4xl sm:text-6xl font-black tracking-tight text-[#FFFDF9] drop-shadow-[0_10px_28px_rgba(0,0,0,0.65)] leading-none">
              NGATUR LUWH!
            </h1>
          </div>
        </motion.div>

        {/* Subtle Progress Line di Bawah Layar */}
        <div className="pointer-events-none fixed bottom-0 inset-x-0 h-1 bg-black/30">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: WARNING_TIMINGS.PHASE_1_DURATION_MS / 1000,
              ease: 'linear',
            }}
            className="h-full bg-white/75 origin-left"
          />
        </div>
      </div>
    );
  }

  // FASE 2 (14.2s - 18.55s): "SEKEDAR MENGINGATKAN" — Hitam pekat seketika + Stiker 3 + Ikon Keris/Pedang berkedip merah
  if (currentState === FLOW_STATES.WARNING_PHASE_2) {
    return (
      <div className="fixed inset-0 z-40 bg-black flex items-center justify-center p-5 select-none">
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute w-80 h-80 rounded-full bg-red-600/25 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
          {/* Stiker Panel 3 + Badge Ikon Pedang/Keris Berkedip Merah */}
          <div className="relative w-64 sm:w-72 mb-7">
            <StickerFrame
              src={STICKER_IMAGES.KERIS}
              alt="Sekedar Mengingatkan"
              rotate={1.5}
              interactive={false}
              glowClassName="shadow-[0_0_45px_rgba(220,38,38,0.5)]"
            />

            <motion.div
              animate={{
                opacity: [1, 0.1, 1, 0.2, 1, 0.08, 1],
                scale: [1, 1.08, 0.96, 1.1, 1],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-3.5 -right-2 flex items-center justify-center w-13 h-13 p-3 rounded-2xl bg-black border-2 border-red-500 shadow-[0_0_28px_rgba(239,68,68,0.95)] gpu-accelerated"
            >
              <Sword
                className="w-7 h-7 text-red-500 -rotate-45 drop-shadow-[0_0_12px_rgba(239,68,68,1)]"
                strokeWidth={2.4}
              />
            </motion.div>
          </div>

          {/* Teks Putih Tebal dengan Efek Pulse */}
          <motion.h1
            animate={{
              opacity: [0.62, 1, 0.62],
              scale: [0.97, 1.03, 0.97],
            }}
            transition={{
              duration: 0.95,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-[0_0_24px_rgba(255,255,255,0.25)] gpu-accelerated"
          >
            SEKEDAR MENGINGATKAN
          </motion.h1>
        </div>
      </div>
    );
  }

  // FASE 3 (18.55s - 19.1s): "PAKAIAN SEMBAHYANG: ON" — Flash putih terang 0.5 detik
  if (currentState === FLOW_STATES.WARNING_PHASE_3) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 bg-[#FFFEFA] flex items-center justify-center p-6 select-none"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 1 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center text-center max-w-sm w-full gpu-accelerated"
        >
          <div className="w-52 sm:w-60 mb-5">
            <StickerFrame
              src={STICKER_IMAGES.MASJID}
              alt="Pakaian Sembahyang On"
              rotate={0}
              interactive={false}
            />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#24201B]">
            PAKAIAN SEMBAHYANG: ON
          </h1>
        </motion.div>
      </motion.div>
    );
  }

  return null;
}
