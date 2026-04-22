import React from 'react';
import { NailongStatic } from './Nailong';
import './AppHeader.css';

interface AppHeaderProps {
  rightLabel?: string;
  className?: string;
}

export function AppHeader({ rightLabel, className = '' }: AppHeaderProps) {
  return (
    <header className={`app-header ${className}`}>
      <div className="app-header-tint" />
      <div className="app-header-row">
        <div className="app-header-brand">
          <NailongStatic size={26} variant="babyBow" />
          <NailongStatic size={20} variant="wave" />
          <span className="app-header-title">JADWAL DIET — NURUL SAYANG</span>
        </div>
        <div className="app-header-right">
          {rightLabel ? <span className="app-header-label">{rightLabel}</span> : null}
          <NailongStatic size={22} variant="babyDaisy" />
        </div>
      </div>
    </header>
  );
}