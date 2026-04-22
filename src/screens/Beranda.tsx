import { useEffect, useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { NailongStatic, NailongOnTrack } from '../components/Nailong';
import { ProgressBar } from '../components/ProgressBar';
import { RoadmapGrid } from '../components/RoadmapGrid';
import { StatCard } from '../components/StatCard';
import { WHITELIST } from '../lib/diet';
import { TOTAL_DAYS, getDailyQuote, getPlankTargetForDay, getWeekLabel } from '../lib/constants';
import { WORKOUT } from '../lib/workout';
import { useProgress } from '../context/ProgressContext';
import { useColors } from '../hooks/useColors';
import './Beranda.css';

export function BerandaScreen() {
  const colors = useColors();
  const {
    currentDay,
    log,
    hydrated,
    isAllTasksDone,
    isDayComplete,
    needsWeightForCurrentWeek,
    state,
  } = useProgress();

  const [showFinishConfirm, setShowFinishConfirm] = useState(false);

  useEffect(() => {
    if (hydrated && needsWeightForCurrentWeek()) {
      // Show weight modal
      const weight = prompt('Masukkan berat badan minggu ini (kg):');
      if (weight) {
        const kg = parseFloat(weight);
        if (!isNaN(kg)) {
          setWeightInput(kg);
        }
      }
    }
  }, [hydrated, needsWeightForCurrentWeek]);

  const dietPct = log.whitelist.length / WHITELIST.length;
  const workoutPct = log.workout.length / WORKOUT.length;
  const plankTarget = getPlankTargetForDay(currentDay);
  const plankPct = Math.min(1, log.plankBest / plankTarget);
  const journeyPct = currentDay / TOTAL_DAYS;
  const allTasksDone = isAllTasksDone(currentDay);
  const finalized = isDayComplete(currentDay);

  const status = finalized
    ? { label: 'Selesai', color: colors.primary, soft: colors.successSoft }
    : allTasksDone
    ? { label: 'Siap Lapor', color: colors.accent, soft: colors.successSoft }
    : { label: 'On Track', color: colors.info, soft: colors.infoSoft };

  const lastWeight = state.weights[state.weights.length - 1];

  const handleFinish = () => {
    if (!allTasksDone) return;
    setShowFinishConfirm(true);
  };

  const confirmFinish = () => {
    finalizeDay();
    setShowFinishConfirm(false);
  };

  const setWeightInput = (kg: number) => {
    setWeight(kg);
  };

  return (
    <div className="screen" style={{ backgroundColor: colors.background }}>
      <AppHeader rightLabel={`Hari ${currentDay} / ${TOTAL_DAYS}`} />
      
      <div className="scroll-content">
        <div className="subheader">
          <h2 style={{ color: colors.foreground }}>
            Mas Arya, Nurul Sayang Selesai Progres Hari Ke...
          </h2>
          <p style={{ color: colors.mutedForeground }}>
            {hydrated ? getDailyQuote(currentDay) : ''}
          </p>
        </div>

        {/* Hero Card */}
        <div 
          className="hero-card"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <div className="hero-header">
            <div>
              <p className="eyebrow" style={{ color: colors.mutedForeground }}>
                {getWeekLabel(currentDay)}
              </p>
              <h1 className="hero-title" style={{ color: colors.foreground }}>
                Hari {currentDay}
                <span style={{ color: colors.mutedForeground, fontSize: 16 }}>
                  {'  '}/ {TOTAL_DAYS}
                </span>
              </h1>
            </div>
            <div 
              className="status-pill"
              style={{ backgroundColor: status.soft }}
            >
              <NailongStatic size={16} variant="babyDaisy" />
              <span style={{ color: status.color }}>{status.label}</span>
            </div>
          </div>
          
          <NailongOnTrack progress={journeyPct} variant="babyBow" />
          
          <p className="hero-foot" style={{ color: colors.mutedForeground }}>
            {Math.round(journeyPct * 100)}% perjalanan 30 hari bareng Nurul Sayang
          </p>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <StatCard
            mascot="babyBow"
            label="Diet"
            value={`${log.whitelist.length}/${WHITELIST.length}`}
            progress={dietPct}
            color={colors.primary}
          />
          <StatCard
            mascot="babyDaisy"
            label="Workout"
            value={`${log.workout.length}/${WORKOUT.length}`}
            progress={workoutPct}
            color={colors.accent}
          />
        </div>

        {/* Plank Card */}
        <div 
          className="plank-card"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <div className="hero-header">
            <div>
              <p className="eyebrow" style={{ color: colors.mutedForeground }}>
                THE PLANK MASTER
              </p>
              <h2 className="plank-value" style={{ color: colors.foreground }}>
                {log.plankBest}s
                <span style={{ color: colors.mutedForeground, fontSize: 14 }}>
                  {'  '}/ {plankTarget}s
                </span>
              </h2>
            </div>
            <NailongStatic size={48} variant="cat" />
          </div>
          <ProgressBar
            value={plankPct}
            color={log.plankBest >= plankTarget ? colors.primary : colors.accent}
            height={8}
          />
        </div>

        {/* Weight Card */}
        <button 
          className="weight-card"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
          onClick={() => {
            const weight = prompt('Masukkan berat badan (kg):');
            if (weight) {
              const kg = parseFloat(weight);
              if (!isNaN(kg)) setWeightInput(kg);
            }
          }}
        >
          <NailongStatic size={40} variant="babyBow" />
          <div style={{ flex: 1 }}>
            <p className="eyebrow" style={{ color: colors.mutedForeground }}>
              LAPORAN BERAT BADAN
            </p>
            <p className="weight-value" style={{ color: colors.foreground }}>
              {lastWeight ? `${lastWeight.kg} kg` : 'Belum ada catatan'}
            </p>
            <p className="weight-sub" style={{ color: colors.mutedForeground }}>
              {lastWeight
                ? `Tercatat di Hari ${lastWeight.day}`
                : 'Wajib diisi tiap awal minggu'}
            </p>
          </div>
          <NailongStatic size={24} variant="babyDaisy" />
        </button>

        {/* Finish Button */}
        <button
          onClick={handleFinish}
          disabled={!allTasksDone}
          className="finish-btn"
          style={{
            backgroundColor: allTasksDone ? colors.primary : colors.muted,
            opacity: allTasksDone ? 1 : 0.7,
          }}
        >
          <NailongStatic
            size={26}
            variant={finalized ? 'babyDaisy' : allTasksDone ? 'babyBow' : 'cap'}
          />
          <span style={{ color: allTasksDone ? '#FFFFFF' : colors.mutedForeground }}>
            {finalized
              ? 'Hari Ini Sudah Dilaporkan'
              : allTasksDone
              ? 'Progres Selesai — Lapor ke Mas Arya'
              : 'Selesaikan semua tugas dulu, Sayang'}
          </span>
        </button>

        {/* Section */}
        <div className="section">
          <div className="section-header">
            <h3 style={{ color: colors.foreground }}>Roadmap 30 Hari</h3>
            <p style={{ color: colors.mutedForeground }}>40s · 60s · 90s · 120s</p>
          </div>
          <RoadmapGrid />
        </div>
      </div>

      {/* Finish Confirmation Modal */}
      {showFinishConfirm && (
        <div className="modal-overlay" onClick={() => setShowFinishConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Konfirmasi</h3>
            <p>Nurul Sayang sudah menyelesaikan semua tugas hari ini?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowFinishConfirm(false)}>Belum</button>
              <button onClick={confirmFinish} className="primary">
                Sudah, Sayang!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}