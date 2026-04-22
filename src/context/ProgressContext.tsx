import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { TOTAL_DAYS, getPlankTargetForDay } from '../lib/constants';

type ProgressLog = {
  whitelist: string[];
  workout: string[];
  plankBest: number;
};

type ProgressState = {
  weights: { kg: number; day: number }[];
};

interface ProgressContextType {
  currentDay: number;
  log: ProgressLog;
  state: ProgressState;
  hydrated: boolean;
  isAllTasksDone: (day: number) => boolean;
  isDayComplete: (day: number) => boolean;
  needsWeightForCurrentWeek: () => boolean;
  getDayLog: (day: number) => ProgressLog;
  toggleWhitelist: (item: string) => void;
  toggleWorkout: (item: string) => void;
  setPlankBest: (seconds: number) => void;
  setWeight: (kg: number) => void;
  finalizeDay: () => void;
}

const defaultLog: ProgressLog = {
  whitelist: [],
  workout: [],
  plankBest: 0,
};

const defaultState: ProgressState = {
  weights: [],
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [currentDay, setCurrentDay] = useState(1);
  const [log, setLog] = useState<ProgressLog>(defaultLog);
  const [state, setState] = useState<ProgressState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('diet-progress');
      if (saved) {
        const data = JSON.parse(saved);
        setCurrentDay(data.currentDay ?? 1);
        setLog(data.log ?? defaultLog);
        setState(data.state ?? defaultState);
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
    setHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('diet-progress', JSON.stringify({ currentDay, log, state }));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [currentDay, log, state, hydrated]);

  const isAllTasksDone = (day: number) => {
    const plankTarget = getPlankTargetForDay(day);
    return log.whitelist.length > 0 && log.workout.length > 0 && log.plankBest >= plankTarget;
  };

  const isDayComplete = (day: number) => {
    // Simplified - check if current day is finalized
    const savedFinalized = localStorage.getItem(`diet-day-${day}-finalized`);
    return savedFinalized === 'true';
  };

  const needsWeightForCurrentWeek = () => {
    const week = Math.ceil(currentDay / 7);
    const lastWeight = state.weights[state.weights.length - 1];
    const lastWeightWeek = lastWeight ? Math.ceil(lastWeight.day / 7) : 0;
    return week > lastWeightWeek;
  };

  const getDayLog = (_day: number) => log;

  const toggleWhitelist = (item: string) => {
    setLog(prev => {
      const exists = prev.whitelist.includes(item);
      return {
        ...prev,
        whitelist: exists
          ? prev.whitelist.filter(i => i !== item)
          : [...prev.whitelist, item],
      };
    });
  };

  const toggleWorkout = (item: string) => {
    setLog(prev => {
      const exists = prev.workout.includes(item);
      return {
        ...prev,
        workout: exists
          ? prev.workout.filter(i => i !== item)
          : [...prev.workout, item],
      };
    });
  };

  const setPlankBest = (seconds: number) => {
    setLog(prev => ({
      ...prev,
      plankBest: Math.max(prev.plankBest, seconds),
    }));
  };

  const setWeight = (kg: number) => {
    setState(prev => ({
      ...prev,
      weights: [...prev.weights, { kg, day: currentDay }],
    }));
  };

  const finalizeDay = () => {
    localStorage.setItem(`diet-day-${currentDay}-finalized`, 'true');
    if (currentDay < TOTAL_DAYS) {
      setCurrentDay(prev => prev + 1);
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        currentDay,
        log,
        state,
        hydrated,
        isAllTasksDone,
        isDayComplete,
        needsWeightForCurrentWeek,
        getDayLog,
        toggleWhitelist,
        toggleWorkout,
        setPlankBest,
        setWeight,
        finalizeDay,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextType {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return ctx;
}