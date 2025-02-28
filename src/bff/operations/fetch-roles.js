import { getRoles } from '../api';
import { sessions } from './../sessions';
import { ROLE } from '../constants';

export const fetchRoles = async (userSession) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: 'У вас нет доступа к данному разделу.',
      response: null,
    };
  }

  const roles = await getRoles();

  return {
    error: null,
    response: roles,
  };
};
