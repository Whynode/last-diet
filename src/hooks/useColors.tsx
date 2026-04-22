import { createContext, useContext, type ReactNode } from 'react';
import { colors, type Colors } from '../lib/theme';

const ColorContext = createContext<Colors>(colors.light);

export function ColorProvider({ children }: { children: ReactNode }) {
  return (
    <ColorContext.Provider value={colors.light}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColors(): Colors {
  return useContext(ColorContext);
}