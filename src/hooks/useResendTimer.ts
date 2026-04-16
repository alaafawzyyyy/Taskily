'use client';

import { useEffect, useState } from 'react';

export function useResendTimer(initialTime = 300) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => {
    if (isRunning) return;
    setTimeLeft(initialTime);
    setIsRunning(true);
  };

  return { timeLeft, start, isRunning };
}
