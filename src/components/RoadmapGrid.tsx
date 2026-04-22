import { TOTAL_DAYS, getPlankTargetForDay } from '../lib/constants';
import { useProgress } from '../context/ProgressContext';
import { useColors } from '../hooks/useColors';
import './RoadmapGrid.css';

interface RoadmapGridProps {
  onDayPress?: (day: number) => void;
  className?: string;
}

export function RoadmapGrid({ onDayPress, className = '' }: RoadmapGridProps) {
  const colors = useColors();
  const { currentDay, isDayComplete, isAllTasksDone, getDayLog } = useProgress();

  return (
    <div className={`roadmap-grid ${className}`}>
      {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => {
        const isToday = day === currentDay;
        const finalized = isDayComplete(day);
        const tasksDone = isAllTasksDone(day);
        const past = day < currentDay;
        const dayLog = getDayLog(day);
        const partial =
          !finalized &&
          (dayLog.whitelist.length > 0 ||
            dayLog.workout.length > 0 ||
            dayLog.plankBest > 0);

        let bg = colors.card;
        let textColor = colors.mutedForeground;
        let borderColor = colors.border;
        let borderWidth = 1;

        if (finalized) {
          bg = colors.primary;
          textColor = "#FFFFFF";
          borderColor = colors.primary;
        } else if (tasksDone) {
          bg = colors.accent;
          textColor = "#FFFFFF";
          borderColor = colors.accent;
        } else if (partial) {
          bg = colors.successSoft;
          textColor = colors.primary;
          borderColor = colors.accent;
        } else if (past) {
          bg = colors.muted;
        }

        if (isToday) {
          borderColor = colors.primary;
          borderWidth = 2.5;
          if (!finalized && !tasksDone && !partial) {
            bg = colors.successSoft;
            textColor = colors.primary;
          }
        }

        return (
          <button
            key={day}
            onClick={() => onDayPress?.(day)}
            className="roadmap-cell"
            style={{ 
              backgroundColor: bg, 
              borderColor, 
              borderWidth,
              color: textColor 
            }}
          >
            <span className="roadmap-day">{day}</span>
            <span 
              className="roadmap-target"
              style={{ opacity: 0.85 }}
            >
              {getPlankTargetForDay(day)}s
            </span>
          </button>
        );
      })}
    </div>
  );
}