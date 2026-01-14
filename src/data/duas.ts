import type { Dua } from '../types';

export const morningDuas: Dua[] = [
  {
    id: 'dua-1',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur',
    translation: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari',
    category: 'waking',
  },
  {
    id: 'dua-2',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, wa huwa \'ala kulli shay\'in qadir',
    translation: 'None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent.',
    reference: 'Sahih al-Bukhari & Muslim',
    category: 'waking',
  },
  {
    id: 'dua-3',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subhanallahi wa bihamdihi, Subhanallahil-\'Adhim',
    translation: 'Glory is to Allah and praise is to Him. Glory is to Allah, the Magnificent.',
    reference: 'Sahih al-Bukhari & Muslim',
    category: 'morning',
  },
  {
    id: 'dua-4',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur',
    translation: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.',
    reference: 'Sunan at-Tirmidhi',
    category: 'morning',
  },
  {
    id: 'dua-5',
    arabic: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
    transliteration: 'Asbahna \'ala fitratil-Islam, wa \'ala kalimatil-ikhlas, wa \'ala dini nabiyyina Muhammadin sallallahu \'alayhi wa sallam, wa \'ala millati abina Ibrahima hanifan musliman wa ma kana minal-mushrikin',
    translation: 'We have entered a new day upon the natural religion of Islam, the word of sincere devotion, the religion of our Prophet Muhammad (peace be upon him), and the faith of our father Ibrahim, who was upright and Muslim, and was not of those who associate others with Allah.',
    reference: 'Musnad Ahmad',
    category: 'morning',
  },
  {
    id: 'dua-6',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'an, wa rizqan tayyiban, wa \'amalan mutaqabbalan',
    translation: 'O Allah, I ask You for beneficial knowledge, good provision, and deeds that are accepted.',
    reference: 'Sunan Ibn Majah',
    category: 'morning',
  },
  {
    id: 'dua-7',
    arabic: 'رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ',
    transliteration: 'Rabbi a\'udhu bika min hamazatish-shayatin, wa a\'udhu bika rabbi an yahdurun',
    translation: 'My Lord, I seek refuge with You from the incitements of the devils, and I seek refuge with You, my Lord, lest they be present with me.',
    reference: 'Quran 23:97-98',
    category: 'morning',
  },
  {
    id: 'dua-8',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-Sami\'ul-\'Alim',
    translation: 'In the Name of Allah, with Whose Name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    reference: 'Sunan Abu Dawud',
    category: 'morning',
  },
];

export const getRandomDua = (category?: Dua['category']): Dua => {
  const filtered = category
    ? morningDuas.filter(d => d.category === category)
    : morningDuas;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const getMorningDuaSequence = (): Dua[] => {
  // Return a sequence of 3-5 duas for the morning
  const shuffled = [...morningDuas].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
};
