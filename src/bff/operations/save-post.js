import { updatePost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Вы не моете этого делать.',
      response: null,
    };
  }

  const updatedPost = await updatePost(newPostData);

  return {
    error: null,
    response: updatedPost,
  };
};
