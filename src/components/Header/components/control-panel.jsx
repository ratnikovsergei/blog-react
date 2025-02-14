import { Link, useNavigate } from 'react-router-dom';

export const ControlPanel = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end pt-4">
        <Link className="cursor-pointer font-semibold" to="/login">
          Войти
        </Link>
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
