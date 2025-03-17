import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal, removePostAsync, CLOSE_MODAL } from '../../../../store/actions';
import { useServerRequest } from '../../../../hooks';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../store/selectors';
import { checkAccess } from '../../../../utils';
import PropTypes from 'prop-types';

export const PostPanel = ({ id, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();
  const userRole = useSelector(selectUserRole);

  const onPostRemove = (id) => {
    dispatch(
      openModal({
        text: 'Удалить статью?',
        onConfirm: () => {
          dispatch(removePostAsync(requestServer, id)).then(() => navigate('/'));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdmin = checkAccess([ROLE.ADMIN], userRole);

  return (
    <div className="post-panel">
      {publishedAt ? (
        <div>
          <i className="fa fa-calendar-o mr-1" aria-hidden="true"></i>
          {publishedAt}
        </div>
      ) : null}
      {isAdmin && (
        <div className="post-panel-buttons">
          {editButton}
          {publishedAt ? (
            <i
              className="fa fa-trash-o ml-2 cursor-pointer"
              aria-hidden="true"
              onClick={() => onPostRemove(id)}
            ></i>
          ) : null}
        </div>
      )}
    </div>
  );
};

PostPanel.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  editButton: PropTypes.func.isRequired,
};
