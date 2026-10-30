import { useState, useRef, useEffect, useCallback } from 'react';
import { AUDIO_SOURCES } from '../constants/flowConfig';

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(false);
  const ceramahRef = useRef(null);
  const goodEndingRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    const ceramah = new Audio(AUDIO_SOURCES.CERAMAH_WARNING);
    ceramah.preload = 'auto';
    ceramah.volume = 0.95;

    const goodEnding = new Audio(AUDIO_SOURCES.GOOD_ENDING);
    goodEnding.preload = 'auto';
    goodEnding.loop = true;
    goodEnding.volume = 0.72;

    ceramahRef.current = ceramah;
    goodEndingRef.current = goodEnding;

    return () => {
      ceramah.pause();
      goodEnding.pause();
      ceramahRef.current = null;
      goodEndingRef.current = null;
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (ceramahRef.current) {
      ceramahRef.current.muted = isMuted;
    }
    if (goodEndingRef.current) {
      goodEndingRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const getAudioCtx = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new Ctx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const stopAll = useCallback(() => {
    if (ceramahRef.current) {
      ceramahRef.current.pause();
      ceramahRef.current.currentTime = 0;
    }
    if (goodEndingRef.current) {
      goodEndingRef.current.pause();
      goodEndingRef.current.currentTime = 0;
    }
  }, []);

  const playCeramahWarning = useCallback(() => {
    if (goodEndingRef.current) {
      goodEndingRef.current.pause();
      goodEndingRef.current.currentTime = 0;
    }
    getAudioCtx();
    if (ceramahRef.current) {
      ceramahRef.current.currentTime = 0;
      ceramahRef.current.muted = isMuted;
      ceramahRef.current.play().catch(() => {});
    }
  }, [getAudioCtx, isMuted]);

  const playGoodEnding = useCallback(() => {
    if (ceramahRef.current) {
      ceramahRef.current.pause();
      ceramahRef.current.currentTime = 0;
    }
    getAudioCtx();
    if (goodEndingRef.current) {
      goodEndingRef.current.currentTime = 0;
      goodEndingRef.current.muted = isMuted;
      goodEndingRef.current.play().catch(() => {});
    }
  }, [getAudioCtx, isMuted]);

  // Efek kilatan bilah keris tipis saat masuk Fase 2 ("SEKEDAR MENGINGATKAN")
  const playKerisAccent = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(2400, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.45);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.46);
  }, [getAudioCtx, isMuted]);

  // Efek shimmer lembut saat Flash Putih Fase 3 ("PAKAIAN SEMBAHYANG: ON")
  const playFlashAccent = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.04 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + 0.52);
    });
  }, [getAudioCtx, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    isMuted,
    toggleMute,
    ceramahRef,
    playCeramahWarning,
    playGoodEnding,
    playKerisAccent,
    playFlashAccent,
    stopAll,
  };
}
