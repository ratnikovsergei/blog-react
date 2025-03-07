import { deleteComment, deletePost, getComments } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (hash, id) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Удалять статьи может только администратор.',
      response: null,
    };
  }

  await deletePost(id);

  const comments = await getComments(id);

  await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

  return {
    error: null,
    response: true,
  };
};
