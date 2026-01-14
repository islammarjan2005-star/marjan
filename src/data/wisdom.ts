import type { WisdomContent } from '../types';

export const wisdomCollection: WisdomContent[] = [
  // Ayahs
  {
    id: 'ayah-1',
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Indeed, with hardship comes ease.',
    reference: 'Quran 94:6',
    type: 'ayah',
  },
  {
    id: 'ayah-2',
    arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    translation: 'And whoever puts their trust in Allah, then He is sufficient for them.',
    reference: 'Quran 65:3',
    type: 'ayah',
  },
  {
    id: 'ayah-3',
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    reference: 'Quran 2:152',
    type: 'ayah',
  },
  {
    id: 'ayah-4',
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    translation: 'Verily, in the remembrance of Allah do hearts find rest.',
    reference: 'Quran 13:28',
    type: 'ayah',
  },
  {
    id: 'ayah-5',
    arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    translation: 'And say, "My Lord, increase me in knowledge."',
    reference: 'Quran 20:114',
    type: 'ayah',
  },
  {
    id: 'ayah-6',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translation: 'Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire.',
    reference: 'Quran 2:201',
    type: 'ayah',
  },
  {
    id: 'ayah-7',
    arabic: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ',
    translation: 'And be patient, for your patience is only through Allah.',
    reference: 'Quran 16:127',
    type: 'ayah',
  },
  {
    id: 'ayah-8',
    arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    translation: 'Indeed, Allah is with the patient.',
    reference: 'Quran 2:153',
    type: 'ayah',
  },
  // Hadiths
  {
    id: 'hadith-1',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    translation: 'Actions are but by intentions.',
    reference: 'Sahih al-Bukhari',
    type: 'hadith',
  },
  {
    id: 'hadith-2',
    arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    translation: 'The best among you is he who learns the Quran and teaches it.',
    reference: 'Sahih al-Bukhari',
    type: 'hadith',
  },
  {
    id: 'hadith-3',
    arabic: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
    translation: 'Cleanliness is half of faith.',
    reference: 'Sahih Muslim',
    type: 'hadith',
  },
  {
    id: 'hadith-4',
    arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ',
    translation: 'Your smile for your brother is charity.',
    reference: 'Sunan at-Tirmidhi',
    type: 'hadith',
  },
  {
    id: 'hadith-5',
    arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ',
    translation: 'Whoever takes a path in pursuit of knowledge, Allah will make easy for them a path to Paradise.',
    reference: 'Sahih Muslim',
    type: 'hadith',
  },
  {
    id: 'hadith-6',
    arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
    translation: 'A Muslim is one from whose tongue and hand other Muslims are safe.',
    reference: 'Sahih al-Bukhari',
    type: 'hadith',
  },
  {
    id: 'hadith-7',
    arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    translation: 'None of you truly believes until he loves for his brother what he loves for himself.',
    reference: 'Sahih al-Bukhari & Muslim',
    type: 'hadith',
  },
  {
    id: 'hadith-8',
    arabic: 'مَنْ صَمَتَ نَجَا',
    translation: 'Whoever remains silent is saved.',
    reference: 'Sunan at-Tirmidhi',
    type: 'hadith',
  },
];

export const getRandomWisdom = (): WisdomContent => {
  return wisdomCollection[Math.floor(Math.random() * wisdomCollection.length)];
};

export const getWisdomByType = (type: 'ayah' | 'hadith'): WisdomContent => {
  const filtered = wisdomCollection.filter(w => w.type === type);
  return filtered[Math.floor(Math.random() * filtered.length)];
};
