import Postavke from '../types/Postavke';
import CompanyDetails from '../types/CompanyDetails';

export type State = {
  company: CompanyDetails;
  settings: Postavke;
};

export const SET_COMPANY = 'SET_COMPANY';
export const SET_SETTINGS = 'SET_SETTINGS';

const mainReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_SETTINGS:
      return { ...state, settings: action.settings };
    case SET_COMPANY:
      return { ...state, company: action.company };
    default:
      return state;
  }
};

export default mainReducer;
