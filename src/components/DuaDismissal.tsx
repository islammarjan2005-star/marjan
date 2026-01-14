import { useState, useEffect, useRef } from 'react';
import type { Dua } from '../types';
import { getMorningDuaSequence } from '../data/duas';

interface DuaDismissalProps {
  onComplete: () => void;
}

export const DuaDismissal = ({ onComplete }: DuaDismissalProps) => {
  const [duas, setDuas] = useState<Dua[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    setDuas(getMorningDuaSequence());
  }, []);

  const currentDua = duas[currentIndex];
  const isLastDua = currentIndex === duas.length - 1;

  const handleNext = () => {
    if (isLastDua) {
      onComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    }
  };

  // Touch handling for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const diff = startY.current - currentY.current;
    const newProgress = Math.min(100, Math.max(0, (diff / 200) * 100));
    setProgress(newProgress);
  };

  const handleTouchEnd = () => {
    if (progress > 70) {
      handleNext();
    } else {
      setProgress(0);
    }
  };

  // Mouse handling for scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      setProgress(prev => {
        const newProgress = Math.min(100, prev + 10);
        if (newProgress >= 100) {
          setTimeout(handleNext, 100);
        }
        return newProgress;
      });
    }
  };

  if (!currentDua) {
    return (
      <div className="fixed inset-0 bg-[#0a1612] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-b from-[#0a1612] via-[#0d1f17] to-[#0a1612] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Progress indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
        <div className="flex h-full gap-1 px-4 pt-4">
          {duas.map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? 'bg-emerald-400'
                  : i === currentIndex
                  ? 'bg-emerald-400/50'
                  : 'bg-gray-700'
              }`}
              style={{
                opacity: i === currentIndex ? 0.5 + (progress / 200) : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="h-full flex flex-col items-center justify-center px-8 py-20">
        {/* Counter */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2">
          <span className="text-emerald-400 text-sm">
            {currentIndex + 1} of {duas.length}
          </span>
        </div>

        {/* Arabic text */}
        <div
          className="text-center transition-transform duration-200"
          style={{
            transform: `translateY(-${progress * 0.5}px)`,
            opacity: 1 - (progress / 200),
          }}
        >
          <p
            className="text-3xl md:text-4xl text-white leading-relaxed mb-8 font-['Amiri']"
            dir="rtl"
            style={{ lineHeight: '2.2' }}
          >
            {currentDua.arabic}
          </p>

          {/* Transliteration */}
          <p className="text-lg text-emerald-300/70 italic mb-4">
            {currentDua.transliteration}
          </p>

          {/* Translation */}
          <p className="text-gray-400 text-base max-w-md mx-auto mb-6">
            {currentDua.translation}
          </p>

          {/* Reference */}
          <p className="text-gray-600 text-sm">
            {currentDua.reference}
          </p>
        </div>

        {/* Swipe indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
          <div
            className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-emerald-500/30 flex items-center justify-center"
            style={{
              borderColor: `rgba(16, 185, 129, ${0.3 + progress / 200})`,
              transform: `scale(${1 + progress / 500})`,
            }}
          >
            <svg
              className="w-6 h-6 text-emerald-400 transition-transform"
              style={{ transform: `translateY(-${progress / 20}px)` }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            {isLastDua ? 'Swipe up to complete' : 'Swipe up to continue'}
          </p>
        </div>

        {/* Progress ring */}
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2">
          <svg className="w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(16, 185, 129, 0.2)"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgb(16, 185, 129)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress * 1.76} 176`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
