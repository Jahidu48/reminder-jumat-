import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function MockupMap() {
  return (
    <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-[#EBEFE7] border border-[#D8E0D3] shadow-inner select-none">
      {/* Warm Light-Sage Map Canvas */}
      <svg
        viewBox="0 0 400 200"
        fill="none"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Taman / Area Hijau Lembut */}
        <rect
          x="210"
          y="26"
          width="124"
          height="74"
          rx="14"
          fill="#D5E3D0"
        />
        <rect
          x="32"
          y="24"
          width="116"
          height="62"
          rx="12"
          fill="#E2E6DC"
        />
        <rect
          x="36"
          y="116"
          width="98"
          height="58"
          rx="12"
          fill="#E2E6DC"
        />

        {/* Jalan Raya Krem Terang */}
        <path d="M -10 102 L 410 102" stroke="#FAF8F2" strokeWidth="14" />
        <path d="M 180 -10 L 180 210" stroke="#FAF8F2" strokeWidth="12" />
        <path
          d="M -10 166 Q 145 156 270 215"
          stroke="#FAF8F2"
          strokeWidth="9"
        />
        <path d="M 342 -10 L 316 215" stroke="#FAF8F2" strokeWidth="8" />

        {/* Rute Jalan Kaki ke Masjid */}
        <motion.path
          d="M 102 152 L 180 152 L 180 64 L 266 64"
          stroke="#3D7A5A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </svg>

      {/* Pin Sekunder */}
      <div
        className="absolute left-[18%] top-[24%] opacity-45"
        aria-hidden="true"
      >
        <MapPin className="w-4 h-4 text-[#527963]" />
      </div>
      <div
        className="absolute right-[14%] bottom-[22%] opacity-45"
        aria-hidden="true"
      >
        <MapPin className="w-4 h-4 text-[#527963]" />
      </div>

      {/* Titik Posisi Pengguna */}
      <div
        style={{ left: '25.5%', top: '76%' }}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      >
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#4A80B8] opacity-45" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#4A80B8] ring-2 ring-white shadow" />
        </div>
      </div>

      {/* Pin Utama Masjid Terdekat */}
      <motion.div
        style={{ left: '66.5%', top: '32%' }}
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: [0, -4, 0], opacity: 1 }}
        transition={{
          y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.4, delay: 0.15 },
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gpu-accelerated"
      >
        <span className="animate-ping absolute top-1.5 inline-flex h-8 w-8 rounded-full bg-[#3D7A5A]/35" />
        <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-[#3D7A5A] text-white shadow-[0_8px_18px_rgba(61,122,90,0.45)] border-2 border-white">
          <MapPin className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-[#D4DDD0] text-[10px] font-bold text-[#2B4C3B] whitespace-nowrap shadow-sm">
          Masjid Terdekat
        </div>
      </motion.div>

      {/* Info Ringkas di Bawah Peta */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/85 border border-white text-[11px] text-[#3F4A3E] shadow-sm">
        <div className="flex items-center gap-1.5 font-semibold">
          <Navigation className="w-3.5 h-3.5 text-[#3D7A5A] shrink-0" />
          <span>Sekitar lokasi Anda</span>
        </div>
        <span className="font-bold text-[#3D7A5A]">±180 m</span>
      </div>
    </div>
  );
}
