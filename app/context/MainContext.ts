import React from 'react';
import { State } from './reducer';
import Postavke from '../types/Postavke';

export interface MainContextType {
  state: State;
  setCompany: (name: string) => void;
  setSettings: (settings: Postavke) => void;
}

export default React.createContext<MainContextType>(null);
