import React from 'react';
import { State } from './reducer';
import Postavke from '../types/Postavke';
import CompanyDetails from '../types/CompanyDetails';

export interface MainContextType {
  state: State;
  setShowSetupModal: (v: boolean) => void;
  setCompany: (name: CompanyDetails) => void;
  setSettings: (settings: Postavke) => void;
}

export default React.createContext<MainContextType>(null);
