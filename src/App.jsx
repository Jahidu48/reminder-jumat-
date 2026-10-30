import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { FLOW_STATES, WARNING_TIMINGS } from './constants/flowConfig';
import { useJumatanTime } from './hooks/useJumatanTime';
import { useSoundEffects } from './hooks/useSoundEffects';
import FloatingTimeBanner from './components/FloatingTimeBanner';
import StartScreen from './components/StartScreen';
import WarningSequence from './components/WarningSequence';
import SuccessMapScreen from './components/SuccessMapScreen';

export default function App() {
  const [flowState, setFlowState] = useState(FLOW_STATES.START);
  const [cameFromWarning, setCameFromWarning] = useState(false);

  const isJumatanNear = useJumatanTime();
  const {
    isMuted,
    toggleMute,
    ceramahRef,
    playCeramahWarning,
    playGoodEnding,
    playKerisAccent,
    playFlashAccent,
    stopAll,
  } = useSoundEffects();

  // Sinkronisasi otomatis State 3 (Opsi A: Full Ceramah -> Keris -> Flash Putih -> Masjid + Musik Siulan)
  useEffect(() => {
    let timerId;
    const audioEl = ceramahRef.current;

    if (flowState === FLOW_STATES.WARNING_PHASE_1) {
      const goToPhase2 = () => {
        playKerisAccent();
        setFlowState(FLOW_STATES.WARNING_PHASE_2);
      };

      const onTimeUpdate = () => {
        if (audioEl && audioEl.currentTime >= 14.15) {
          goToPhase2();
        }
      };

      if (audioEl) {
        audioEl.addEventListener('timeupdate', onTimeUpdate);
      }
      timerId = setTimeout(goToPhase2, WARNING_TIMINGS.PHASE_1_DURATION_MS);

      return () => {
        if (timerId) clearTimeout(timerId);
        if (audioEl) audioEl.removeEventListener('timeupdate', onTimeUpdate);
      };
    }

    if (flowState === FLOW_STATES.WARNING_PHASE_2) {
      const goToPhase3 = () => {
        playFlashAccent();
        setFlowState(FLOW_STATES.WARNING_PHASE_3);
      };

      if (audioEl) {
        audioEl.addEventListener('ended', goToPhase3, { once: true });
      }
      timerId = setTimeout(
        goToPhase3,
        WARNING_TIMINGS.PHASE_2_DURATION_MS + 150
      );

      return () => {
        if (timerId) clearTimeout(timerId);
        if (audioEl) audioEl.removeEventListener('ended', goToPhase3);
      };
    }

    if (flowState === FLOW_STATES.WARNING_PHASE_3) {
      timerId = setTimeout(() => {
        playGoodEnding();
        setFlowState(FLOW_STATES.SUCCESS_MAP);
      }, WARNING_TIMINGS.PHASE_3_FLASH_MS);

      return () => {
        if (timerId) clearTimeout(timerId);
      };
    }

    return undefined;
  }, [
    flowState,
    ceramahRef,
    playKerisAccent,
    playFlashAccent,
    playGoodEnding,
  ]);

  const handleSelectYes = useCallback(() => {
    setCameFromWarning(false);
    playGoodEnding();
    setFlowState(FLOW_STATES.SUCCESS_MAP);
  }, [playGoodEnding]);

  const handleSelectNo = useCallback(() => {
    setCameFromWarning(true);
    playCeramahWarning();
    setFlowState(FLOW_STATES.WARNING_PHASE_1);
  }, [playCeramahWarning]);

  const handleReset = useCallback(() => {
    stopAll();
    setCameFromWarning(false);
    setFlowState(FLOW_STATES.START);
  }, [stopAll]);

  const isInWarningSequence =
    flowState === FLOW_STATES.WARNING_PHASE_1 ||
    flowState === FLOW_STATES.WARNING_PHASE_2 ||
    flowState === FLOW_STATES.WARNING_PHASE_3;

  const isSuccessScreen = flowState === FLOW_STATES.SUCCESS_MAP;

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col justify-center">
      {/* Background State 1: Warm Cream, Ivory & Soft Sky-Beige */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-[#FBF9F3] via-[#F4EFE4] to-[#EAE2D2]"
      >
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-[#DCE9F4]/60 blur-[100px]" />
        <div className="absolute -bottom-28 right-1/4 w-80 h-80 rounded-full bg-[#E5DEC9]/75 blur-[95px]" />
      </div>

      {/* Background State 2: Warm Cream, Beige & Soft Sage */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isSuccessScreen ? 1 : 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-0 bg-gradient-to-br from-[#F7F4EB] via-[#EBF0E8] to-[#DCE6D9]"
      >
        <div className="absolute -top-24 right-[-3rem] w-96 h-96 rounded-full bg-[#C9DBC4]/55 blur-[105px]" />
        <div className="absolute -bottom-24 left-[-3rem] w-96 h-96 rounded-full bg-[#E9DFC8]/70 blur-[105px]" />
      </motion.div>

      {/* Tombol Mute / Unmute Minimalis di Pojok Kanan Atas */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
        className={`fixed top-4 right-4 z-[60] flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-xl border transition-colors cursor-pointer ${
          isInWarningSequence
            ? 'bg-black/40 border-white/25 text-white hover:bg-black/60'
            : 'bg-white/80 border-[#E2DDD0] text-[#3B352C] hover:bg-white shadow-sm'
        }`}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>

      {/* Floating Time-Aware Banner (Jumat 11:00 - 13:00) */}
      <FloatingTimeBanner show={isJumatanNear && !isInWarningSequence} />

      {/* Konten Utama Bersih di Tengah Layar */}
      <main className="relative z-10 w-full px-4 py-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {flowState === FLOW_STATES.START && (
            <StartScreen
              key="start"
              onSelectYes={handleSelectYes}
              onSelectNo={handleSelectNo}
            />
          )}

          {flowState === FLOW_STATES.SUCCESS_MAP && (
            <SuccessMapScreen
              key="success"
              cameFromWarning={cameFromWarning}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Fullscreen Mode Peringatan Bertahap (State 3) */}
      <AnimatePresence>
        {isInWarningSequence && <WarningSequence currentState={flowState} />}
      </AnimatePresence>
    </div>
  );
}
