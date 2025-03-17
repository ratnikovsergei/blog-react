import PropTypes from 'prop-types';

export const Button = ({ children, ...props }) => {
  return (
    <button className="app-button" {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
