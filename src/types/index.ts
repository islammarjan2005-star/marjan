export interface Alarm {
  id: string;
  time: string; // HH:mm format
  enabled: boolean;
  label: string;
  days: number[]; // 0 = Sunday, 1 = Monday, etc.
  dismissType: 'dua' | 'dhikr';
}

export interface Dua {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  category: 'morning' | 'waking' | 'general';
}

export interface Dhikr {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  count: number; // How many times to recite
}

export interface WisdomContent {
  id: string;
  arabic: string;
  translation: string;
  reference: string;
  type: 'ayah' | 'hadith';
}

export type AppScreen = 'home' | 'create' | 'edit' | 'alarm-active' | 'dua-dismissal' | 'post-alarm';

export interface AlarmState {
  activeAlarm: Alarm | null;
  currentDua: Dua | null;
  currentDhikr: Dhikr | null;
  postAlarmWisdom: WisdomContent | null;
}
