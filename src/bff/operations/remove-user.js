import { ROLE } from '../constants';
import { sessions } from './../sessions';
import { deleteUser } from '../api';

export const removeUser = (userSession, userId) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: 'У вас нет доступа к данному разделу.',
      response: null,
    };
  }

  return deleteUser(userId).then(() => ({
    error: null,
    response: true,
  }));
};
