import React from 'react';
import { State, SET_COMPANY, SET_SETTINGS } from './reducer';
import { MainContextType } from './MainContext';
import Postavke from '../types/Postavke';
import CompanyDetails from '../types/CompanyDetails';

function createMainContextValue(
  state: State,
  dispatch: React.Dispatch<any>
): MainContextType {
  return {
    state,
    setSettings: (settings: Postavke) =>
      dispatch({ type: SET_SETTINGS, settings }),
    setCompany: (company: CompanyDetails) =>
      dispatch({ type: SET_COMPANY, company })
  };
}

export default createMainContextValue;
