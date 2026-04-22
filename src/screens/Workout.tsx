import { AppHeader } from '../components/AppHeader';
import { Nailong, NailongStatic, type NailongVariant } from '../components/Nailong';
import { ProgressBar } from '../components/ProgressBar';
import { WORKOUT } from '../lib/workout';
import { useProgress } from '../context/ProgressContext';
import { useColors } from '../hooks/useColors';
import './Workout.css';

const MASCOTS: NailongVariant[] = ['babyBow', 'chick', 'babyDaisy', 'cat'];

export function WorkoutScreen() {
  const colors = useColors();
  const { log, toggleWorkout } = useProgress();
  const pct = log.workout.length / WORKOUT.length;

  return (
    <div className="screen" style={{ backgroundColor: colors.background }}>
      <AppHeader rightLabel="HIIT CIRCUIT" />
      
      <div className="scroll-content">
        <div className="intro">
          <h2 style={{ color: colors.foreground }}>
            HIIT Circuit Hari Ini
          </h2>
          <p style={{ color: colors.mutedForeground }}>
            Selesaikan keempat gerakan untuk progres harian.
          </p>
        </div>

        <div 
          className="summary"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <div className="summary-head">
            <Nailong size={48} variant="chick" />
            <div style={{ flex: 1 }}>
              <p className="eyebrow" style={{ color: colors.mutedForeground }}>
                CIRCUIT PROGRESS
              </p>
              <h3 className="summary-value" style={{ color: colors.foreground }}>
                {log.workout.length}/{WORKOUT.length} gerakan
              </h3>
            </div>
            <NailongStatic size={28} variant="cap" />
          </div>
          <ProgressBar value={pct} color={colors.primary} height={8} />
        </div>

        <div style={{ marginTop: 16 }}>
          {WORKOUT.map((ex, i) => (
            <label key={ex.id} className="check-item">
              <input
                type="checkbox"
                checked={log.workout.includes(ex.id)}
                onChange={() => toggleWorkout(ex.id)}
              />
              <div className="check-box good">
                {log.workout.includes(ex.id) ? '✓' : ''}
              </div>
              <NailongStatic size={24} variant={MASCOTS[i % MASCOTS.length]} />
              <div className="check-content">
                <span className="check-title">{ex.name}</span>
                <span className="check-note">{ex.target}</span>
              </div>
            </label>
          ))}
        </div>

        <div 
          className="tip-card"
          style={{ backgroundColor: colors.successSoft }}
        >
          <NailongStatic size={24} variant="kitty" />
          <p style={{ color: colors.primary, flex: 1 }}>
            Istirahat 15 detik antar gerakan. Ulangi 2 set jika mampu, Sayang.
          </p>
        </div>
      </div>
    </div>
  );
}