import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from './components';
import { ROLE } from '../../../../constants';
import { selectUserId, selectUserRole } from '../../../../store/selectors';
import { addCommentAsync } from '../../../../store/actions';
import { useServerRequest } from '../../../../hooks';

export const Comments = ({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(requestServer, userId, postId, content));
    setNewComment('');
  };

  const isGuest = userRole === ROLE.GUEST;

  return (
    <div className="comments">
      {!isGuest && (
        <>
          <div className="new-comment">
            <textarea
              name="new-comment"
              value={newComment}
              placeholder="Комментарий..."
              onChange={({ target }) => setNewComment(target.value)}
              className="new-comment-text"
            ></textarea>
            <i
              className="fa fa-paper-plane-o ml-1 mt-1 cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                onNewCommentAdd(userId, postId, newComment);
              }}
            ></i>
          </div>
        </>
      )}
      <div className="comments-list">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            postId={postId}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};
