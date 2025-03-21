import PropTypes from 'prop-types';

export const Description = ({ children }) => {
  return <div className="italic text-[18px]/5 font-[400] pt-4">{children}</div>;
};

Description.propTypes = {
  children: PropTypes.node.isRequired,
};
