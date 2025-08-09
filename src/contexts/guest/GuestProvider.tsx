import { useState, type ReactNode } from 'react';
import { GuestContext } from './GuestContext';
import type { IGuest } from '../../services/api';

export function GuestProvider({ children }: { children: ReactNode }) {
  const [guest, setGuest] = useState<IGuest | null>(null);

  return (
    <GuestContext.Provider value={{ guest, setGuest }}>
      {children}
    </GuestContext.Provider>
  );
}
