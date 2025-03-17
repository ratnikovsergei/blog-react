import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../../../hooks';
import {
  removeCommentAsync,
  openModal,
  CLOSE_MODAL,
} from '../../../../../../store/actions';
import { selectUserRole } from '../../../../../../store/selectors';
import { ROLE } from '../../../../../../constants';

export const Comment = ({ postId, id, author, content, publishedAt }) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const userRole = useSelector(selectUserRole);

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: 'Удалить комментарий?',
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, postId, id));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

  return (
    <div className="user-comment">
      <div className="user-comment-wrapper">
        <div className="user-comment-header">
          <div className="user-comment-author">
            <i className="fa fa-user-circle-o mr-1" aria-hidden="true"></i>
            {author}
          </div>
          <div className="user-comment-published-at">
            <i className="fa fa-calendar-o mr-1" aria-hidden="true"></i>
            {publishedAt}
          </div>
        </div>
        <div className="text-[15px]">{content}</div>
      </div>
      {isAdminOrModerator && (
        <i
          className="fa fa-trash-o delete-comment-btn"
          aria-hidden="true"
          onClick={() => onCommentRemove(id)}
        ></i>
      )}
    </div>
  );
};
