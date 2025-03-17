import PropTypes from 'prop-types';

export const H3 = ({ children }) => {
  return <span className="h3">{children}</span>;
};

H3.propTypes = {
  children: PropTypes.node.isRequired,
};
