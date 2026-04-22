import { useState } from 'react';
import { ColorProvider, useColors } from './hooks/useColors';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { BerandaScreen } from './screens/Beranda';
import { NailongStatic, type NailongVariant } from './components/Nailong';
import './App.css';

function TabIcon({
  variant,
  focused,
  size = 26,
}: {
  variant: NailongVariant;
  focused: boolean;
  size?: number;
}) {
  return (
    <div
      style={{
        width: size + 10,
        height: size + 10,
        borderRadius: (size + 10) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? '#FBD9E5' : 'transparent',
      }}
    >
      <NailongStatic size={focused ? size : size - 2} variant={variant} />
    </div>
  );
}

function AppLayout() {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState('beranda');

  const tabs = [
    { id: 'beranda', label: 'Beranda', icon: 'wave' as NailongVariant },
    { id: 'diet', label: 'Diet', icon: 'strawberry' as NailongVariant },
    { id: 'workout', label: 'Workout', icon: 'chick' as NailongVariant },
    { id: 'plank', label: 'Plank', icon: 'cat' as NailongVariant },
  ];

  return (
    <div className="app">
      {activeTab === 'beranda' && <BerandaScreen />}
      
      {/* Placeholder for other tabs */}
      {activeTab !== 'beranda' && (
        <div className="placeholder">
          <h2>{tabs.find(t => t.id === activeTab)?.label}</h2>
          <p>Coming soon...</p>
        </div>
      )}

      {/* Tab Bar - matching mobile style */}
      <div 
        className="tab-bar"
        style={{ 
          backgroundColor: 'rgba(255,247,251,0.92)',
          borderTopColor: 'rgba(196,54,112,0.18)',
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ color: activeTab === tab.id ? colors.primary : colors.mutedForeground }}
          >
            <TabIcon variant={tab.icon} focused={activeTab === tab.id} />
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ColorProvider>
      <ProgressProvider>
        <AppLayout />
      </ProgressProvider>
    </ColorProvider>
  );
}