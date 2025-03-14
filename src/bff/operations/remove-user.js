import { ROLE } from '../constants';
import { sessions } from './../sessions';
import { deleteUser } from '../api';

export const removeUser = async (hash, userId) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'У вас нет доступа к данному разделу.',
      res: null,
    };
  }

  return deleteUser(userId).then(() => ({
    error: null,
    res: true,
  }));
};
