import { PROP_TYPE } from '../../constants';

export const Error = ({ error }) => error && <div className="error">{error}</div>;

Error.propTypes = {
  error: PROP_TYPE.ERROR,
};
