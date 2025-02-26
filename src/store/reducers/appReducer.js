import { LOGOUT } from '../actions/actionTypes';

const initialAppState = {
  wasLogout: false,
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        wasLogout: !state.wasLogout,
      };
    default:
      return state;
  }
};
