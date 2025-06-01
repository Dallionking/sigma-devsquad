
import React, { useEffect, useState } from 'react';
import { Sparkles, Star, Trophy } from 'lucide-react';

interface CelebrationAnimationProps {
  onComplete: () => void;
}

export const CelebrationAnimation = ({ onComplete }: CelebrationAnimationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2000
    }));
    setParticles(newParticles);

    // Auto-complete after animation duration
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti-like particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-bounce-gentle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}ms`,
            animationDuration: '2s'
          }}
        >
          {particle.id % 3 === 0 ? (
            <Sparkles className="w-4 h-4 text-yellow-400" />
          ) : particle.id % 3 === 1 ? (
            <Star className="w-3 h-3 text-blue-400" />
          ) : (
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          )}
        </div>
      ))}

      {/* Central celebration burst */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <Trophy className="w-20 h-20 text-yellow-500 animate-pulse-ring" />
          <div className="absolute -inset-4 border-4 border-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -inset-8 border-2 border-yellow-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Success message */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-8 text-center">
        <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 animate-fade-in">
          Setup Complete! 🎉
        </h2>
      </div>
    </div>
  );
};
