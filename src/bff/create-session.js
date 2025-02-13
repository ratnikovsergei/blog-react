import { removeComment } from './session-actions';
import { ROLE_ID } from '../constants';

export const createSession = (roleId) => {
  const session = {
    logout() {
      Object.keys(session).forEach((key) => delete session[key]);
    },
  };

  switch (roleId) {
    case ROLE_ID.ADMIN: {
      session.removeComment = removeComment;
      break;
    }
    case ROLE_ID.MODERATOR: {
      session.removeComment = removeComment;
      break;
    }
    case ROLE_ID.READER: {
      break;
    }
    default:
    // nothing to do here
  }

  return session;
};
