import { useState, useEffect, useCallback } from 'react';
import type { Dhikr } from '../types';
import { getQuickDhikrSequence } from '../data/dhikr';

interface DhikrDismissalProps {
  onComplete: () => void;
}

export const DhikrDismissal = ({ onComplete }: DhikrDismissalProps) => {
  const [dhikrSequence, setDhikrSequence] = useState<Dhikr[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setDhikrSequence(getQuickDhikrSequence());
  }, []);

  const currentDhikr = dhikrSequence[currentIndex];
  const targetCount = currentDhikr?.count || 0;
  const isComplete = count >= targetCount;
  const isLastDhikr = currentIndex === dhikrSequence.length - 1;

  const handleTap = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    if (isComplete) {
      if (isLastDhikr) {
        onComplete();
      } else {
        setCurrentIndex(prev => prev + 1);
        setCount(0);
      }
    } else {
      setCount(prev => prev + 1);
    }
  }, [isAnimating, isComplete, isLastDhikr, onComplete]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleTap();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTap]);

  if (!currentDhikr) {
    return (
      <div className="fixed inset-0 bg-[#0a1612] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const progress = (count / targetCount) * 100;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-b from-[#0a1612] via-[#0d1f17] to-[#0a1612] overflow-hidden select-none"
      onClick={handleTap}
    >
      {/* Progress dots */}
      <div className="absolute top-8 left-0 right-0 flex justify-center gap-2 px-4">
        {dhikrSequence.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < currentIndex
                ? 'bg-emerald-400'
                : i === currentIndex
                ? 'bg-emerald-400/50 w-8'
                : 'bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="h-full flex flex-col items-center justify-center px-8">
        {/* Arabic text with pulse animation */}
        <div
          className={`text-center transition-transform duration-150 ${
            isAnimating ? 'scale-95' : 'scale-100'
          }`}
        >
          <p
            className="text-5xl md:text-6xl text-white mb-6 font-['Amiri']"
            dir="rtl"
            style={{ lineHeight: '1.8' }}
          >
            {currentDhikr.arabic}
          </p>

          {/* Transliteration */}
          <p className="text-xl text-emerald-300/70 italic mb-2">
            {currentDhikr.transliteration}
          </p>

          {/* Translation */}
          <p className="text-gray-400 text-base max-w-sm mx-auto">
            {currentDhikr.translation}
          </p>
        </div>

        {/* Counter */}
        <div className="mt-16 relative">
          {/* Background ring */}
          <svg className="w-40 h-40 -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="rgba(16, 185, 129, 0.15)"
              strokeWidth="6"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="rgb(16, 185, 129)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${progress * 4.4} 440`}
              className="transition-all duration-150"
            />
          </svg>

          {/* Count display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-5xl font-light transition-all duration-150 ${
                isComplete ? 'text-emerald-400' : 'text-white'
              } ${isAnimating ? 'scale-110' : 'scale-100'}`}
            >
              {count}
            </span>
            <span className="text-gray-500 text-sm mt-1">
              / {targetCount}
            </span>
          </div>
        </div>

        {/* Instruction */}
        <div className="mt-12 text-center">
          {isComplete ? (
            <div className="space-y-2">
              <div className="text-emerald-400 text-lg font-medium">
                {isLastDhikr ? 'All Complete!' : 'Complete!'}
              </div>
              <p className="text-gray-500 text-sm">
                {isLastDhikr ? 'Tap to finish' : 'Tap to continue'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-400 text-lg">Tap anywhere to count</p>
              <p className="text-gray-600 text-sm">
                {targetCount - count} remaining
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tap ripple effect */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 rounded-full animate-ping" />
        </div>
      )}
    </div>
  );
};
