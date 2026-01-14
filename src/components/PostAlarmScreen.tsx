import { useEffect, useState } from 'react';
import type { WisdomContent } from '../types';
import { getRandomWisdom } from '../data/wisdom';

interface PostAlarmScreenProps {
  onDismiss: () => void;
}

export const PostAlarmScreen = ({ onDismiss }: PostAlarmScreenProps) => {
  const [wisdom, setWisdom] = useState<WisdomContent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setWisdom(getRandomWisdom());
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  if (!wisdom) return null;

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-b from-[#0a1612] via-[#0d1f17] to-[#0a1612] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="h-full flex flex-col items-center justify-center px-8">
        {/* Success indicator */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Time display */}
        <div className="text-center mb-12">
          <p className="text-5xl font-light text-white mb-2">{currentTime}</p>
          <p className="text-gray-500">{currentDate}</p>
        </div>

        {/* Wisdom content */}
        <div className="max-w-md text-center mb-12">
          <p className="text-xs text-emerald-500 uppercase tracking-widest mb-6">
            {wisdom.type === 'ayah' ? 'Verse of the Day' : 'Hadith of the Day'}
          </p>

          <p
            className="text-2xl md:text-3xl text-white font-['Amiri'] mb-6"
            dir="rtl"
            style={{ lineHeight: '2' }}
          >
            {wisdom.arabic}
          </p>

          <p className="text-gray-300 text-lg mb-4 italic">
            "{wisdom.translation}"
          </p>

          <p className="text-emerald-400/70 text-sm">
            — {wisdom.reference}
          </p>
        </div>

        {/* Encouragement */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            May Allah bless your day with barakah
          </p>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Start Your Day
        </button>
      </div>
    </div>
  );
};
