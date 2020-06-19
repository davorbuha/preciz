import Postavke from '../types/Postavke';

export type State = {
  companyName: string;
  settings: Postavke;
};

export const SET_COMPANY = 'SET_COMPANY';
export const SET_SETTINGS = 'SET_SETTINGS';

const mainReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_SETTINGS:
      return { ...state, settings: action.settings };
    case SET_COMPANY:
      return { ...state, companyName: action.name };
    default:
      return state;
  }
};

export default mainReducer;
