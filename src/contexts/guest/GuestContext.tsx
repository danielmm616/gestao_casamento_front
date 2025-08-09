import React, { createContext } from 'react';
import type { IGuest } from '../../services/api';

interface GuestContextType {
  guest: IGuest | null;
  setGuest: React.Dispatch<React.SetStateAction<IGuest | null>>;
}

export const GuestContext = createContext<GuestContextType | undefined>(
  undefined,
);
