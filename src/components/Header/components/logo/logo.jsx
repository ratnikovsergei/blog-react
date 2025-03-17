import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link className="flex cursor-pointer" to="/">
      <i className="fa fa-code fa-5x" aria-hidden="true"></i>
      <div className="ml-3 -mt-1">
        <div className="font-semibold text-[50px] shadow-text">Блог</div>
        <div className="font-semibold -mt-[15px] ml-[3px] shadow-text">
          веб-разработчика
        </div>
      </div>
    </Link>
  );
};
