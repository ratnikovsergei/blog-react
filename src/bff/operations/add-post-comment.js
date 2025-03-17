import { addComment, getPost } from '../api';
import { ROLE } from '../constants';
import { getPostCommentsWithAuthor } from '../utils';
import { sessions } from '../sessions';

export const addPostComment = async (hash, userId, postId, content) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Для оставления комментария войдите или зарегистрируйтесь.',
      res: null,
    };
  }

  await addComment(userId, postId, content);

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
