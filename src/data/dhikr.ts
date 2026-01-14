import type { Dhikr } from '../types';

export const morningDhikr: Dhikr[] = [
  {
    id: 'dhikr-1',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subhanallah',
    translation: 'Glory be to Allah',
    count: 33,
  },
  {
    id: 'dhikr-2',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'All praise is due to Allah',
    count: 33,
  },
  {
    id: 'dhikr-3',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    count: 33,
  },
  {
    id: 'dhikr-4',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illallah',
    translation: 'There is no god but Allah',
    count: 10,
  },
  {
    id: 'dhikr-5',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    translation: 'I seek forgiveness from Allah',
    count: 10,
  },
  {
    id: 'dhikr-6',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'La hawla wa la quwwata illa billah',
    translation: 'There is no power nor strength except through Allah',
    count: 10,
  },
];

export const getRandomDhikr = (): Dhikr => {
  return morningDhikr[Math.floor(Math.random() * morningDhikr.length)];
};

export const getQuickDhikrSequence = (): Dhikr[] => {
  // Return a simplified sequence for quick wake-up
  return morningDhikr.slice(0, 3).map(d => ({
    ...d,
    count: Math.min(d.count, 10), // Cap at 10 for quicker dismissal
  }));
};
