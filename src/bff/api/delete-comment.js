export const deleteComment = (commentId) =>
  fetch(`http://localhost:3001/comments/${commentId}`, {
    method: 'DELETE',
  });
