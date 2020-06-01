export type State = {
  companyName: string;
};

export const SET_COMPANY = 'SET_COMPANY';

const mainReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_COMPANY:
      return { ...state, companyName: action.name };
    default:
      return state;
  }
};

export default mainReducer;
