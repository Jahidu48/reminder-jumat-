export const FLOW_STATES = Object.freeze({
  START: 'START',
  WARNING_PHASE_1: 'WARNING_PHASE_1', // 0s - 14.2s: "NGATUR LUWH!"
  WARNING_PHASE_2: 'WARNING_PHASE_2', // 14.2s - 18.55s: "SEKEDAR MENGINGATKAN"
  WARNING_PHASE_3: 'WARNING_PHASE_3', // 18.55s - 19.15s: "PAKAIAN SEMBAHYANG: ON"
  SUCCESS_MAP: 'SUCCESS_MAP',         // State 2: "INFOKAN MASJID TERDEKAT"
});

export const WARNING_TIMINGS = Object.freeze({
  PHASE_1_DURATION_MS: 14200, // Sampai kalimat "...huh capek saya sudah hidup begini ya Allah"
  PHASE_2_DURATION_MS: 4350,  // Kalimat "Allah katakan: Malaikat, karena dia sudah capek, cabut nyawanya!"
  PHASE_3_FLASH_MS: 550,      // Flash putih terang 0.5 detik sebelum masuk layar Masjid
});

export const GOOGLE_MAPS_MASJID_URL =
  'https://www.google.com/maps/search/masjid+terdekat';

export const STICKER_IMAGES = Object.freeze({
  TANYA: '/images/panel-1-tanya.png',
  NGATUR: '/images/panel-2-ngatur.png',
  KERIS: '/images/panel-3-keris.png',
  MASJID: '/images/panel-4-masjid.png',
});

export const AUDIO_SOURCES = Object.freeze({
  CERAMAH_WARNING: '/audio/ceramah-warning.m4a',
  GOOD_ENDING: '/audio/good-ending.mp3',
});

export const DALIL_CONTENT = Object.freeze({
  YES_PATH: {
    arabic:
      'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ',
    translation:
      '“Wahai orang-orang yang beriman! Apabila telah diseru untuk melaksanakan salat pada hari Jumat, maka segeralah kamu mengingat Allah dan tinggalkanlah jual beli.”',
    source: 'QS. Al-Jumu’ah: 9',
    secondaryQuote:
      '“Salat lima waktu dan salat Jumat ke Jumat berikutnya adalah penghapus dosa di antara keduanya, selama dosa-dosa besar dijauhi.” (HR. Muslim No. 233)',
  },
  NO_PATH: {
    arabic:
      'لَيَنْتَهِيَنَّ أَقْوَامٌ عَنْ وَدْعِهِمُ الْجُمُعَاتِ أَوْ لَيَخْتِمَنَّ اللَّهُ عَلَىٰ قُلُوبِهِمْ ثُمَّ لَيَكُونُنَّ مِنَ الْغَافِلِينَ',
    translation:
      '“Hendaklah orang-orang berhenti dari meninggalkan salat Jumat, atau Allah sungguh-sungguh akan mengunci hati mereka, kemudian mereka benar-benar menjadi golongan orang-orang yang lalai.”',
    source: 'HR. Muslim No. 865',
    secondaryQuote:
      '“Apabila telah diseru untuk melaksanakan salat pada hari Jumat, maka segeralah kamu mengingat Allah dan tinggalkanlah jual beli.” (QS. Al-Jumu’ah: 9)',
  },
});
