import { request } from '../../utils/request.js';
import { removeComment } from './remove-comment';

export const removeCommentAsync = (postId, id) => (dispatch) => {
  request(`/api/posts/${postId}/comments/${id}`, 'DELETE').then(() => {
    dispatch(removeComment(id));
  });
};
