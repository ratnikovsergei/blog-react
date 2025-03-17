import { useSelector } from 'react-redux';
import { Error } from '../Error/Error';
import { ERROR, PROP_TYPE } from '../../constants';
import { selectUserRole } from '../../store/selectors';
import { checkAccess } from '../../utils';
import PropTypes from 'prop-types';

export const PrivateContent = ({ children, access, serverError = null }) => {
  const userRole = useSelector(selectUserRole);

  const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
  const error = serverError || accessError;

  return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
  children: PropTypes.node.isRequired,
  access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
  serverError: PROP_TYPE.ERROR,
};
