import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, RotateCcw, BookOpen } from 'lucide-react';
import MockupMap from './MockupMap';
import StickerFrame from './StickerFrame';
import {
  GOOGLE_MAPS_MASJID_URL,
  STICKER_IMAGES,
  DALIL_CONTENT,
} from '../constants/flowConfig';

export default function SuccessMapScreen({ cameFromWarning, onReset }) {
  const dalil = cameFromWarning ? DALIL_CONTENT.NO_PATH : DALIL_CONTENT.YES_PATH;

  return (
    <motion.section
      key="success-map-screen"
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[440px] mx-auto gpu-accelerated"
    >
      {/* Kartu Utama Warm Cream & Soft Sage */}
      <div className="relative rounded-[2rem] backdrop-blur-2xl bg-white/80 border border-white/95 shadow-[0_24px_65px_-16px_rgba(48,74,56,0.15)] p-5 sm:p-7 space-y-5">
        {/* Stiker Karakter Panel 4 + Judul */}
        <div className="flex flex-col items-center text-center">
          <div className="w-48 sm:w-56 mb-4">
            <StickerFrame
              src={STICKER_IMAGES.MASJID}
              alt="Infokan Masjid Terdekat"
              rotate={1.4}
            />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#24201B] leading-tight">
            INFOKAN MASJID TERDEKAT
          </h1>
        </div>

        {/* Kartu Dalil (Al-Qur'an / Hadits Shahih) */}
        <div className="rounded-2xl bg-[#FAF7EF] border border-[#E6DFCF] p-4 space-y-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-lg sm:text-xl leading-[2] text-[#2A241C] text-right"
          >
            {dalil.arabic}
          </p>

          <p className="text-xs sm:text-[13px] text-[#554D40] leading-relaxed italic">
            {dalil.translation}
          </p>

          <div className="pt-1 flex items-center justify-between gap-2 border-t border-[#EAE3D3]">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#3D7A5A]">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>{dalil.source}</span>
            </span>
          </div>

          <p className="text-[11px] text-[#706657] leading-relaxed pt-0.5">
            {dalil.secondaryQuote}
          </p>
        </div>

        {/* Mock-up Map */}
        <MockupMap />

        {/* Satu Tombol Aksi Utama (CTA) */}
        <div>
          <a
            href={GOOGLE_MAPS_MASJID_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#3D7A5A] hover:bg-[#32684B] active:bg-[#2A583F] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_10px_26px_-4px_rgba(61,122,90,0.38)] hover:shadow-[0_0_32px_rgba(61,122,90,0.55)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D7A5A]/50"
          >
            <MapPin className="w-5 h-5 stroke-[2.5] shrink-0" />
            <span>Buka Google Maps</span>
            <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>
      </div>

      {/* Tombol Ulangi Minimalis */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#5C665A] hover:text-[#24201B] hover:bg-black/[0.05] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Ulangi</span>
        </button>
      </div>
    </motion.section>
  );
}
