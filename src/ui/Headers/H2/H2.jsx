import PropTypes from 'prop-types';

export const H2 = ({ children }) => {
  return <span className="h2">{children}</span>;
};

H2.propTypes = {
  children: PropTypes.node.isRequired,
};
