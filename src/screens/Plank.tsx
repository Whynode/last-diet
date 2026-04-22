import { useState, useEffect, useRef } from 'react';
import { AppHeader } from '../components/AppHeader';
import { NailongStatic } from '../components/Nailong';
import { ProgressBar } from '../components/ProgressBar';
import { TOTAL_DAYS, getPlankTargetForDay, getWeekLabel } from '../lib/constants';
import { useProgress } from '../context/ProgressContext';
import { useColors } from '../hooks/useColors';
import './Plank.css';

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`;
}

export function PlankScreen() {
  const colors = useColors();
  const { currentDay, log, setPlankBest } = useProgress();
  const target = getPlankTargetForDay(currentDay);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
  };
  const handleSave = () => {
    setRunning(false);
    setPlankBest(seconds);
  };

  const pct = Math.min(1, seconds / target);
  const reached = seconds >= target;

  return (
    <div className="screen" style={{ 
      minHeight: '100vh',
      backgroundColor: '#FFF7FB',
      paddingBottom: 130,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppHeader rightLabel="THE PLANK MASTER" />
      
      <div className="scroll-content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="intro" style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 4 }}>
          <h2 style={{ color: '#4A1230', fontFamily: 'Inter', fontWeight: 700, fontSize: 20 }}>
            The Plank Master
          </h2>
          <p style={{ color: '#8B5A6B', fontFamily: 'Inter', fontWeight: 500, fontSize: 12 }}>
            {getWeekLabel(currentDay)} · Target {target} detik
          </p>
        </div>

        <div 
          className="timer-card"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <p className="eyebrow" style={{ color: colors.mutedForeground }}>
            HARI {currentDay} / {TOTAL_DAYS}
          </p>

          <div className="dial-wrap">
            <div className="fighter">
              <NailongStatic size={56} variant="cat" />
            </div>
            <div 
              className="dial"
              style={{ 
                borderColor: reached ? colors.primary : colors.accent,
                backgroundColor: reached ? colors.successSoft : colors.muted,
              }}
            >
              <span 
                className="timer"
                style={{ color: reached ? colors.primary : colors.accent }}
              >
                {fmt(seconds)}
              </span>
              <span className="timer-sub" style={{ color: colors.mutedForeground }}>
                target {target}s
              </span>
            </div>
            <div className="fighter-right">
              <NailongStatic size={56} variant="chick" />
            </div>
          </div>

          <ProgressBar
            value={pct}
            color={reached ? colors.primary : colors.accent}
            height={8}
          />

          <div className="controls">
            {!running ? (
              <button 
                className="btn"
                style={{ backgroundColor: colors.primary }}
                onClick={handleStart}
              >
                <NailongStatic size={20} variant="wave" />
                <span className="btn-text">Mulai</span>
              </button>
            ) : (
              <button 
                className="btn"
                style={{ backgroundColor: colors.accent }}
                onClick={handlePause}
              >
                <NailongStatic size={20} variant="cap" />
                <span className="btn-text">Pause</span>
              </button>
            )}
            <button 
              className="btn-ghost"
              style={{ borderColor: colors.border, backgroundColor: colors.card }}
              onClick={handleReset}
            >
              <NailongStatic size={20} variant="kitty" />
              <span className="btn-ghost-text" style={{ color: colors.foreground }}>
                Reset
              </span>
            </button>
          </div>

          <button 
            className="save-btn"
            style={{ 
              backgroundColor: seconds === 0 ? colors.muted : colors.primary,
              opacity: seconds === 0 ? 0.6 : 1,
            }}
            onClick={handleSave}
            disabled={seconds === 0}
          >
            <NailongStatic size={20} variant="strawberry" />
            <span className="btn-text">Simpan Catatan Hari Ini</span>
          </button>
        </div>

        <div 
          className="best-card"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <div className="best-row">
            <NailongStatic size={36} variant="kitty" />
            <div style={{ flex: 1 }}>
              <p className="eyebrow" style={{ color: colors.mutedForeground }}>
                CATATAN TERBAIK HARI INI
              </p>
              <h3 className="best-value" style={{ color: colors.foreground }}>
                {log.plankBest}s
              </h3>
            </div>
            {log.plankBest >= target && (
              <div 
                className="status-pill"
                style={{ backgroundColor: colors.successSoft }}
              >
                <NailongStatic size={14} variant="wave" />
                <span style={{ color: colors.primary }}>Tercapai</span>
              </div>
            )}
          </div>
        </div>

        <div 
          className="progression-card"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <h4 style={{ color: colors.foreground }}>Progresi Mingguan</h4>
          {[
            { week: 'Minggu 1', target: 40 },
            { week: 'Minggu 2', target: 60 },
            { week: 'Minggu 3', target: 90 },
            { week: 'Minggu 4', target: 120 },
          ].map((row, i) => {
            const active = currentDay > i * 7 && currentDay <= (i + 1) * 7;
            return (
              <div key={row.week} className="progression-row">
                <div 
                  className="week-dot"
                  style={{ backgroundColor: active ? colors.primary : colors.muted }}
                />
                <span 
                  className="week-label"
                  style={{ color: active ? colors.primary : colors.mutedForeground }}
                >
                  {row.week}
                </span>
                <span 
                  className="week-target"
                  style={{ color: active ? colors.foreground : colors.mutedForeground }}
                >
                  {row.target}s
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}