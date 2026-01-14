import { useState, useEffect } from 'react';
import type { Alarm } from '../types';

interface AlarmCreatorProps {
  alarm?: Alarm | null;
  onSave: (alarm: Omit<Alarm, 'id'>) => void;
  onCancel: () => void;
}

const DAYS = [
  { key: 0, label: 'S', full: 'Sunday' },
  { key: 1, label: 'M', full: 'Monday' },
  { key: 2, label: 'T', full: 'Tuesday' },
  { key: 3, label: 'W', full: 'Wednesday' },
  { key: 4, label: 'T', full: 'Thursday' },
  { key: 5, label: 'F', full: 'Friday' },
  { key: 6, label: 'S', full: 'Saturday' },
];

export const AlarmCreator = ({ alarm, onSave, onCancel }: AlarmCreatorProps) => {
  const [time, setTime] = useState('06:00');
  const [label, setLabel] = useState('');
  const [days, setDays] = useState<number[]>([1, 2, 3, 4, 5]); // Mon-Fri by default
  const [dismissType, setDismissType] = useState<'dua' | 'dhikr'>('dua');

  useEffect(() => {
    if (alarm) {
      setTime(alarm.time);
      setLabel(alarm.label);
      setDays(alarm.days);
      setDismissType(alarm.dismissType);
    }
  }, [alarm]);

  const toggleDay = (day: number) => {
    setDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort()
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      time,
      label,
      days,
      dismissType,
      enabled: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a1612] px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <h1 className="text-lg font-medium text-white">
            {alarm ? 'Edit Alarm' : 'New Alarm'}
          </h1>
          <button
            onClick={handleSubmit}
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            Save
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Time Picker */}
          <div className="flex justify-center">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-6xl font-light text-white bg-transparent text-center focus:outline-none [color-scheme:dark]"
            />
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Fajr Prayer"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm text-gray-400 mb-3">Repeat</label>
            <div className="flex justify-between gap-2">
              {DAYS.map((day) => (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => toggleDay(day.key)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                    days.includes(day.key)
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  aria-label={day.full}
                >
                  {day.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {days.length === 0 && 'One-time alarm'}
              {days.length === 7 && 'Every day'}
              {days.length > 0 && days.length < 7 && DAYS.filter(d => days.includes(d.key)).map(d => d.full).join(', ')}
            </p>
          </div>

          {/* Dismiss Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-3">Wake-up method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDismissType('dua')}
                className={`p-4 rounded-xl border transition-all ${
                  dismissType === 'dua'
                    ? 'bg-emerald-900/30 border-emerald-600 text-white'
                    : 'bg-gray-900/30 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">📜</div>
                <div className="font-medium">Morning Dua</div>
                <div className="text-xs mt-1 opacity-70">Scroll through duas</div>
              </button>
              <button
                type="button"
                onClick={() => setDismissType('dhikr')}
                className={`p-4 rounded-xl border transition-all ${
                  dismissType === 'dhikr'
                    ? 'bg-emerald-900/30 border-emerald-600 text-white'
                    : 'bg-gray-900/30 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">🤲</div>
                <div className="font-medium">Dhikr</div>
                <div className="text-xs mt-1 opacity-70">Tap through count</div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
