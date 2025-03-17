import { PaginationButton } from '../../../../ui';
import PropTypes from 'prop-types';

export const Pagination = ({ page, lastPage, setPage }) => {
  return (
    <div className="pagination">
      <PaginationButton disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </PaginationButton>
      <PaginationButton disabled={page === 1} onClick={() => setPage(page - 1)}>
        Предыдущая
      </PaginationButton>
      <div className="current-page">Страница: {page}</div>
      <PaginationButton disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Следующая
      </PaginationButton>
      <PaginationButton disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </PaginationButton>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
