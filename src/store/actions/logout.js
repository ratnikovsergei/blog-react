import { LOGOUT } from './actionTypes';
import { server } from '../../bff';

export const logout = (session) => {
  server.logout(session);

  return {
    type: LOGOUT,
  };
};
