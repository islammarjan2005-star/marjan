import type { Alarm } from '../types';

interface AlarmCardProps {
  alarm: Alarm;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const AlarmCard = ({ alarm, onToggle, onEdit, onDelete }: AlarmCardProps) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return { time: `${displayHours}:${String(minutes).padStart(2, '0')}`, period };
  };

  const { time, period } = formatTime(alarm.time);
  const activeDays = alarm.days.length === 7 ? 'Every day' :
    alarm.days.length === 0 ? 'Once' :
      alarm.days.map(d => DAYS[d]).join(', ');

  return (
    <div
      className={`relative rounded-2xl p-5 transition-all duration-300 ${
        alarm.enabled
          ? 'bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 border border-emerald-700/30'
          : 'bg-gray-900/50 border border-gray-800/30'
      }`}
    >
      <div className="flex items-start justify-between">
        <button onClick={onEdit} className="text-left flex-1">
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-light tracking-tight ${
              alarm.enabled ? 'text-white' : 'text-gray-500'
            }`}>
              {time}
            </span>
            <span className={`text-lg ${
              alarm.enabled ? 'text-emerald-400' : 'text-gray-600'
            }`}>
              {period}
            </span>
          </div>
          {alarm.label && (
            <p className={`mt-1 text-sm ${
              alarm.enabled ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {alarm.label}
            </p>
          )}
          <p className={`mt-2 text-xs ${
            alarm.enabled ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {activeDays} | {alarm.dismissType === 'dua' ? 'Morning Dua' : 'Dhikr'}
          </p>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onDelete}
            className="p-2 text-gray-500 hover:text-red-400 transition-colors"
            aria-label="Delete alarm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            onClick={onToggle}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
              alarm.enabled ? 'bg-emerald-500' : 'bg-gray-700'
            }`}
            aria-label={alarm.enabled ? 'Disable alarm' : 'Enable alarm'}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                alarm.enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
