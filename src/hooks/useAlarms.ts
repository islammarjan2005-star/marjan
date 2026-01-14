import { useState, useEffect, useCallback } from 'react';
import type { Alarm } from '../types';
import { saveAlarms, loadAlarms, generateId } from '../utils/storage';

export const useAlarms = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  // Load alarms from storage on mount
  useEffect(() => {
    const stored = loadAlarms();
    setAlarms(stored);
  }, []);

  // Save alarms to storage whenever they change
  useEffect(() => {
    saveAlarms(alarms);
  }, [alarms]);

  const addAlarm = useCallback((alarm: Omit<Alarm, 'id'>) => {
    const newAlarm: Alarm = {
      ...alarm,
      id: generateId(),
    };
    setAlarms(prev => [...prev, newAlarm]);
    return newAlarm;
  }, []);

  const updateAlarm = useCallback((id: string, updates: Partial<Alarm>) => {
    setAlarms(prev =>
      prev.map(alarm =>
        alarm.id === id ? { ...alarm, ...updates } : alarm
      )
    );
  }, []);

  const deleteAlarm = useCallback((id: string) => {
    setAlarms(prev => prev.filter(alarm => alarm.id !== id));
  }, []);

  const toggleAlarm = useCallback((id: string) => {
    setAlarms(prev =>
      prev.map(alarm =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  }, []);

  const getNextAlarm = useCallback((): Alarm | null => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const enabledAlarms = alarms.filter(a => a.enabled);
    if (enabledAlarms.length === 0) return null;

    let nextAlarm: Alarm | null = null;
    let minDiff = Infinity;

    for (const alarm of enabledAlarms) {
      const [hours, minutes] = alarm.time.split(':').map(Number);
      const alarmMinutes = hours * 60 + minutes;

      // Check if alarm is set for today or any day
      const alarmDays = alarm.days.length > 0 ? alarm.days : [0, 1, 2, 3, 4, 5, 6];

      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const checkDay = (currentDay + dayOffset) % 7;
        if (!alarmDays.includes(checkDay)) continue;

        let diff: number;
        if (dayOffset === 0 && alarmMinutes > currentMinutes) {
          diff = alarmMinutes - currentMinutes;
        } else if (dayOffset > 0) {
          diff = dayOffset * 24 * 60 + alarmMinutes - currentMinutes;
        } else {
          // Alarm already passed today, check next week
          diff = 7 * 24 * 60 + alarmMinutes - currentMinutes;
        }

        if (diff < minDiff && diff > 0) {
          minDiff = diff;
          nextAlarm = alarm;
        }
      }
    }

    return nextAlarm;
  }, [alarms]);

  return {
    alarms,
    addAlarm,
    updateAlarm,
    deleteAlarm,
    toggleAlarm,
    getNextAlarm,
  };
};
