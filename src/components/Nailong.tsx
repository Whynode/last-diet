import { useEffect, useState } from 'react';
import './Nailong.css';

type NailongVariant = 
  | 'wave' 
  | 'cat' 
  | 'chick' 
  | 'strawberry' 
  | 'cap' 
  | 'kitty' 
  | 'babyBow' 
  | 'babyDaisy';

// Image sources - mapping to local assets
const SOURCES: Record<NailongVariant, string> = {
  wave: '/images/nailong/wave.png',
  cat: '/images/nailong/cat.png',
  chick: '/images/nailong/chick.png',
  strawberry: '/images/nailong/strawberry.png',
  cap: '/images/nailong/cap.png',
  kitty: '/images/nailong/kitty.png',
  babyBow: '/images/nailong/baby-bow.png',
  babyDaisy: '/images/nailong/baby-daisy.png',
};

interface NailongProps {
  size?: number;
  variant?: NailongVariant;
  bounce?: boolean;
  spin?: boolean;
  className?: string;
}

export function Nailong({
  size = 48,
  variant = 'wave',
  bounce = true,
  spin = true,
  className = '',
}: NailongProps) {
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    const classes = [];
    if (bounce) classes.push('bounce');
    if (spin) classes.push('spin');
    setAnimClass(classes.join(' '));
  }, [bounce, spin]);

  return (
    <div 
      className={`nailong ${animClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src={SOURCES[variant]} 
        alt={variant}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

export function NailongStatic({
  size = 24,
  variant = 'wave',
  className = '',
}: {
  size?: number;
  variant?: NailongVariant;
  className?: string;
}) {
  return (
    <img
      src={SOURCES[variant]}
      alt={variant}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}

interface NailongOnTrackProps {
  progress: number;
  height?: number;
  variant?: NailongVariant;
}

export function NailongOnTrack({
  progress,
  height = 10,
  variant = 'wave',
}: NailongOnTrackProps) {
  const pct = Math.max(0, Math.min(1, progress));
  const mascot = 32;
  const trackHeight = Math.max(height, 6);

  return (
    <div 
      className="nailong-track"
      style={{ height: mascot + 4 }}
    >
      <div 
        className="nailong-track-bar"
        style={{ 
          top: (mascot + 4) / 2 - trackHeight / 2,
          height: trackHeight,
        }}
      >
        <div 
          className="nailong-track-fill"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <div 
        className="nailong-track-mascot"
        style={{ 
          left: `${pct * 100}%`,
          marginLeft: -mascot / 2,
        }}
      >
        <Nailong size={mascot} variant={variant} bounce={false} spin={false} />
      </div>
    </div>
  );
}

export type { NailongVariant };