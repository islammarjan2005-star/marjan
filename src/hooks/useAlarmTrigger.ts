import { useEffect, useRef, useCallback } from 'react';
import type { Alarm } from '../types';
import { alarmAudio, showNotification } from '../utils/audio';

interface UseAlarmTriggerProps {
  alarms: Alarm[];
  onAlarmTriggered: (alarm: Alarm) => void;
}

export const useAlarmTrigger = ({ alarms, onAlarmTriggered }: UseAlarmTriggerProps) => {
  const triggeredRef = useRef<Set<string>>(new Set());
  const lastMinuteRef = useRef<number>(-1);

  const checkAlarms = useCallback(() => {
    const now = new Date();
    const currentMinute = now.getHours() * 60 + now.getMinutes();
    const currentDay = now.getDay();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Reset triggered alarms on minute change
    if (currentMinute !== lastMinuteRef.current) {
      triggeredRef.current.clear();
      lastMinuteRef.current = currentMinute;
    }

    for (const alarm of alarms) {
      if (!alarm.enabled) continue;
      if (triggeredRef.current.has(alarm.id)) continue;

      // Check if alarm time matches
      if (alarm.time !== currentTime) continue;

      // Check if alarm is set for today
      const alarmDays = alarm.days.length > 0 ? alarm.days : [0, 1, 2, 3, 4, 5, 6];
      if (!alarmDays.includes(currentDay)) continue;

      // Trigger the alarm!
      triggeredRef.current.add(alarm.id);

      // Start alarm sound
      alarmAudio.start();

      // Show notification
      showNotification(
        'MARJAN - Time to wake up!',
        alarm.label || 'Complete your morning dhikr to dismiss'
      );

      // Notify the app
      onAlarmTriggered(alarm);

      // Only trigger one alarm at a time
      break;
    }
  }, [alarms, onAlarmTriggered]);

  useEffect(() => {
    // Check immediately
    checkAlarms();

    // Check every second for precise timing
    const intervalId = setInterval(checkAlarms, 1000);

    return () => clearInterval(intervalId);
  }, [checkAlarms]);

  const stopAlarm = useCallback(() => {
    alarmAudio.stop();
  }, []);

  return { stopAlarm };
};
