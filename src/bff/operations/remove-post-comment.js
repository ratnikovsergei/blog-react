import { deleteComment, getComments, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePostComment = async (hash, postId, commentId) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Удалять комментарии могут только администратор и модератор.',
      response: null,
    };
  }

  await deleteComment(commentId);

  const post = await getPost(postId);

  const comments = await getComments(postId);

  return {
    error: null,
    response: {
      ...post,
      comments,
    },
  };
};
