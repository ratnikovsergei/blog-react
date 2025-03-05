import { getRoles } from '../api';
import { sessions } from './../sessions';
import { ROLE } from '../constants';

export const fetchRoles = async (hash) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
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
