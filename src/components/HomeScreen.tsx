import type { Alarm } from '../types';
import { AlarmCard } from './AlarmCard';

interface HomeScreenProps {
  alarms: Alarm[];
  onCreateAlarm: () => void;
  onEditAlarm: (alarm: Alarm) => void;
  onToggleAlarm: (id: string) => void;
  onDeleteAlarm: (id: string) => void;
}

export const HomeScreen = ({
  alarms,
  onCreateAlarm,
  onEditAlarm,
  onToggleAlarm,
  onDeleteAlarm,
}: HomeScreenProps) => {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="min-h-screen bg-[#0a1612]">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-light text-white mb-1">MARJAN</h1>
        <p className="text-gray-500 text-sm">{greeting}</p>
      </header>

      {/* Main content */}
      <main className="px-6 pb-32">
        {alarms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-emerald-900/30 flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-emerald-500/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl text-gray-400 mb-2">No alarms yet</h2>
            <p className="text-gray-600 text-center max-w-xs">
              Create your first alarm to start waking up with dhikr and barakah
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alarms
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((alarm) => (
                <AlarmCard
                  key={alarm.id}
                  alarm={alarm}
                  onToggle={() => onToggleAlarm(alarm.id)}
                  onEdit={() => onEditAlarm(alarm)}
                  onDelete={() => onDeleteAlarm(alarm.id)}
                />
              ))}
          </div>
        )}
      </main>

      {/* Floating action button */}
      <button
        onClick={onCreateAlarm}
        className="fixed bottom-8 right-6 w-16 h-16 bg-emerald-500 hover:bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Create new alarm"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Bottom safe area */}
      <div className="h-8" />
    </div>
  );
};
