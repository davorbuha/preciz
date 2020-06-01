import React from 'react';
import { State } from './reducer';

export interface MainContextType {
  state: State;
  setCompany: (name: string) => void;
}

export default React.createContext(null);
