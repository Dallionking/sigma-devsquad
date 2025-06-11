import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Trophy, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface CompletionCelebrationProps {
  title?: string;
  subtitle?: string;
  message?: string;
  completedSteps?: number;
  totalTime?: string;
  onGetStarted?: () => void;
  getStartedText?: string;
  showConfetti?: boolean;
  className?: string;
}

export function CompletionCelebration({
  title = "Congratulations! 🎉",
  subtitle = "You've completed the onboarding",
  message = "You're all set up and ready to start your journey with us.",
  completedSteps,
  totalTime,
  onGetStarted,
  getStartedText = "Get Started",
  showConfetti = true,
  className,
}: CompletionCelebrationProps) {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti && !hasTriggeredConfetti) {
      setHasTriggeredConfetti(true);
      
      // Trigger confetti from multiple angles
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Confetti from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.2, 0.8) },
          colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
        });
        
        // Confetti from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.2, 0.8) },
          colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showConfetti, hasTriggeredConfetti]);

  const achievements = [
    { icon: Trophy, label: 'Profile Complete', color: 'text-yellow-500' },
    { icon: Star, label: 'First Steps', color: 'text-purple-500' },
    { icon: Rocket, label: 'Ready to Launch', color: 'text-blue-500' },
  ];

  return (
    <div className={cn('text-center space-y-8 py-8', className)}>
      {/* Animated Success Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
        className="relative mx-auto"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
          />
          <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
        </div>
        
        {/* Sparkles around the icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-purple-500" />
        </motion.div>
      </motion.div>

      {/* Title and Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground">{subtitle}</p>
        <p className="text-base text-muted-foreground max-w-md mx-auto">{message}</p>
      </motion.div>

      {/* Stats */}
      {(completedSteps || totalTime) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-8"
        >
          {completedSteps && (
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{completedSteps}</div>
              <div className="text-sm text-muted-foreground">Steps Completed</div>
            </div>
          )}
          {totalTime && (
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalTime}</div>
              <div className="text-sm text-muted-foreground">Time Taken</div>
            </div>
          )}
        </motion.div>
      )}

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-6"
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className={cn(
              'w-12 h-12 rounded-full bg-muted flex items-center justify-center',
              achievement.color
            )}>
              <achievement.icon className="w-6 h-6" />
            </div>
            <span className="text-xs text-muted-foreground">{achievement.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          size="lg"
          onClick={onGetStarted}
          className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          {getStartedText}
          <Rocket className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
            }}
            animate={{
              y: -20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}
