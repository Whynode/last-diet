import { AppHeader } from '../components/AppHeader';
import { NailongStatic, type NailongVariant } from '../components/Nailong';
import { WHITELIST, BLACKLIST } from '../lib/diet';
import { useProgress } from '../context/ProgressContext';
import { useColors } from '../hooks/useColors';
import './Diet.css';

const WHITE_MASCOTS: NailongVariant[] = ['babyBow', 'strawberry', 'babyDaisy', 'kitty', 'chick', 'babyBow', 'cat', 'babyDaisy'];
const BLACK_MASCOTS: NailongVariant[] = ['babyBow', 'cap', 'babyDaisy', 'kitty', 'babyBow', 'strawberry'];

export function DietScreen() {
  const colors = useColors();
  const { log, toggleWhitelist } = useProgress();

  return (
    <div className="screen" style={{ backgroundColor: colors.background }}>
      <AppHeader rightLabel="AUDIT NUTRISI" />
      
      <div className="scroll-content">
        <div className="intro">
          <h2 style={{ color: colors.foreground }}>
            Audit Nutrisi Harian
          </h2>
          <p style={{ color: colors.mutedForeground }}>
            Centang yang sudah dimakan &amp; yang berhasil dihindari.
          </p>
        </div>

        <div className="section">
          <div className="section-head">
            <NailongStatic size={20} variant="strawberry" />
            <h3 style={{ color: colors.foreground, flex: 1 }}>
              Whitelist · Wajib Dimakan
            </h3>
            <div 
              className="count-pill"
              style={{ backgroundColor: colors.successSoft }}
            >
              <span style={{ color: colors.primary }}>
                {log.whitelist.length}/{WHITELIST.length}
              </span>
            </div>
          </div>
          {WHITELIST.map((item, i) => (
            <label key={item.id} className="check-item">
              <input
                type="checkbox"
                checked={log.whitelist.includes(item.id)}
                onChange={() => toggleWhitelist(item.id)}
              />
              <div className="check-box good">
                {log.whitelist.includes(item.id) ? '✓' : ''}
              </div>
              <NailongStatic size={24} variant={WHITE_MASCOTS[i % WHITE_MASCOTS.length]} />
              <div className="check-content">
                <span className="check-title">{item.name}</span>
                {item.note && <span className="check-note">{item.note}</span>}
              </div>
            </label>
          ))}
        </div>

        <div 
          className="cheer-card"
          style={{ backgroundColor: colors.successSoft }}
        >
          <NailongStatic size={48} variant="kitty" />
          <div style={{ flex: 1 }}>
            <h4 style={{ color: colors.primary }}>
              Semangat, Nurul Sayang!
            </h4>
            <p style={{ color: colors.foreground, fontSize: 12 }}>
              Setiap centang adalah langkah menuju target. Mas Arya bangga!
            </p>
          </div>
        </div>

        <div className="section" style={{ marginTop: 8 }}>
          <div className="section-head">
            <NailongStatic size={20} variant="cap" />
            <h3 style={{ color: colors.foreground, flex: 1 }}>
              Blacklist · Wajib Dihindari
            </h3>
            <div 
              className="count-pill"
              style={{ backgroundColor: colors.destructiveSoft }}
            >
              <span style={{ color: colors.destructive }}>
                0/{BLACKLIST.length}
              </span>
            </div>
          </div>
          {BLACKLIST.map((item, i) => (
            <label key={item.id} className="check-item">
              <input
                type="checkbox"
                // blacklist tracking not implemented yet
              />
              <div className="check-box bad"></div>
              <NailongStatic size={24} variant={BLACK_MASCOTS[i % BLACK_MASCOTS.length]} />
              <div className="check-content">
                <span className="check-title">{item.name}</span>
                {item.note && <span className="check-note">{item.note}</span>}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}