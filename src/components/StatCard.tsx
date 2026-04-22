import { NailongStatic, type NailongVariant } from './Nailong';
import { ProgressBar } from './ProgressBar';
import { useColors } from '../hooks/useColors';
import './StatCard.css';

interface StatCardProps {
  mascot: NailongVariant;
  label: string;
  value: string;
  progress: number;
  color: string;
  className?: string;
}

export function StatCard({ mascot, label, value, progress, color, className = '' }: StatCardProps) {
  const colors = useColors();
  return (
    <div 
      className={`stat-card ${className}`}
      style={{ 
        backgroundColor: colors.card, 
        borderColor: colors.border 
      }}
    >
      <div className="stat-card-row">
        <NailongStatic size={28} variant={mascot} />
        <span 
          className="stat-card-label"
          style={{ color: colors.mutedForeground }}
        >
          {label}
        </span>
      </div>
      <span 
        className="stat-card-value"
        style={{ color: colors.foreground }}
      >
        {value}
      </span>
      <ProgressBar value={progress} color={color} height={6} />
    </div>
  );
}