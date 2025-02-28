import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: 'У вас нет доступа к данному разделу.',
      response: null,
    };
  }

  setUserRole(userId, newUserRoleId);

  return {
    error: null,
    response: true,
  };
};
