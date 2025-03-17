import PropTypes from 'prop-types';

export const PaginationButton = ({ children, ...props }) => {
  return (
    <button className="pagination-button" {...props}>
      {children}
    </button>
  );
};

PaginationButton.propTypes = {
  children: PropTypes.node.isRequired,
};
