import { deleteComment, getPost } from '../api';
import { ROLE } from '../constants';
import { getPostCommentsWithAuthor } from '../utils';
import { sessions } from '../sessions';

export const removePostComment = async (hash, postId, commentId) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Удалять комментарии могут только администратор и модератор.',
      res: null,
    };
  }

  await deleteComment(commentId);

  const post = await getPost(postId);

  const commentsWithAuthorName = await getPostCommentsWithAuthor(postId);

  return {
    error: null,
    res: {
      ...post,
      comments: commentsWithAuthorName,
    },
  };
};
