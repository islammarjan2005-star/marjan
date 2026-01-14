import type { Alarm } from '../types';

const ALARMS_KEY = 'marjan_alarms';

export const saveAlarms = (alarms: Alarm[]): void => {
  localStorage.setItem(ALARMS_KEY, JSON.stringify(alarms));
};

export const loadAlarms = (): Alarm[] => {
  const stored = localStorage.getItem(ALARMS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const generateId = (): string => {
  return `alarm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
