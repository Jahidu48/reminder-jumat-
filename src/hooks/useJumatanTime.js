import { useState, useEffect } from 'react';

function checkIsJumatanWindow(date) {
  const isFriday = date.getDay() === 5; // 5 === Jumat
  const totalMinutes = date.getHours() * 60 + date.getMinutes();
  const isWithinHours = totalMinutes >= 11 * 60 && totalMinutes <= 13 * 60;
  return isFriday && isWithinHours;
}

/**
 * Mengecek hari dan jam perangkat secara berkala.
 * Mengembalikan true pada hari Jumat pukul 11:00 - 13:00.
 */
export function useJumatanTime() {
  const [isJumatanNear, setIsJumatanNear] = useState(() =>
    checkIsJumatanWindow(new Date())
  );

  useEffect(() => {
    const update = () => setIsJumatanNear(checkIsJumatanWindow(new Date()));
    update();
    const intervalId = setInterval(update, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return isJumatanNear;
}
