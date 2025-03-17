import PropTypes from 'prop-types';

export const AuthFormError = ({ children }) => {
  return <div className="error-message">{children}</div>;
};

AuthFormError.propTypes = {
  children: PropTypes.node.isRequired,
};
