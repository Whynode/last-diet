import { useColors } from '../hooks/useColors';
import './ProgressBar.css';

interface ProgressBarProps {
  value: number; // 0..1
  color?: string;
  height?: number;
  className?: string;
}

export function ProgressBar({ value, color, height = 8, className = '' }: ProgressBarProps) {
  const colors = useColors();
  const pct = Math.max(0, Math.min(1, value));
  
  return (
    <div 
      className={`progress-bar ${className}`}
      style={{ 
        backgroundColor: colors.muted, 
        height, 
        borderRadius: height / 2 
      }}
    >
      <div 
        style={{
          width: `${pct * 100}%`,
          backgroundColor: color ?? colors.primary,
          height,
          borderRadius: height / 2,
        }}
      />
    </div>
  );
}