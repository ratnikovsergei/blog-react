import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../../ui';
import { ROLE } from '../../../constants';
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from '../../../store/selectors';
import { logout } from '../../../store/actions';

export const ControlPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

  const onLogout = () => {
    dispatch(logout(session));
    sessionStorage.removeItem('userData');
  };

  return (
    <div>
      <div className="flex justify-end">
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <div className="font-semibold text-[20px]">
            {login}{' '}
            <button onClick={onLogout}>
              <i className="fa fa-sign-out cursor-pointer" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button onClick={() => navigate(-1)} className="cp-buttons mr-[15px]">
          <i className="fa fa-backward" aria-hidden="true"></i>
        </button>
        <Link to="/post" className="cp-buttons mr-[15px]">
          <i className="fa fa-file-text-o" aria-hidden="true"></i>
        </Link>
        <Link to="/users" className="cp-buttons">
          <i className="fa fa-users" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
};
