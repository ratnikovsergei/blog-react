import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, userId, newUserRoleId) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
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
