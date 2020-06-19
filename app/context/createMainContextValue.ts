import React from 'react';
import { State, SET_COMPANY, SET_SETTINGS } from './reducer';
import { MainContextType } from './MainContext';
import Postavke from '../types/Postavke';

function createMainContextValue(
  state: State,
  dispatch: React.Dispatch<any>
): MainContextType {
  return {
    state,
    setSettings: (settings: Postavke) =>
      dispatch({ type: SET_SETTINGS, settings }),
    setCompany: (name: string) => dispatch({ type: SET_COMPANY, name })
  };
}

export default createMainContextValue;
