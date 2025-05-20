import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from './components';
import { PROP_TYPE, ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../store/selectors';
import { addCommentAsync } from '../../../../store/actions';
import PropTypes from 'prop-types';

export const Comments = ({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();

  const onNewCommentAdd = (postId, content) => {
    dispatch(addCommentAsync(postId, content));
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
                onNewCommentAdd(postId, newComment);
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

Comments.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
  postId: PropTypes.string.isRequired,
};
