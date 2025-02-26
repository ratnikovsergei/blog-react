import { ROLE } from '../../constants';
import { LOGOUT, SET_USER } from '../actions/actionTypes';

const initialUserState = {
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  session: null,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return initialUserState;
    default:
      return state;
  }
};
