import React from 'react';
import { State, SET_COMPANY } from './reducer';
import { MainContextType } from './MainContext';

function createMainContextValue(
  state: State,
  dispatch: React.Dispatch<any>
): MainContextType {
  return {
    state,
    setCompany: (name: string) => dispatch({ type: SET_COMPANY, name })
  };
}

export default createMainContextValue;
