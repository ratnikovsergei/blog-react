import { H2 } from '../../ui';

export const Content = ({ children, error }) =>
  error ? (
    <div className="error-content">
      <H2>Ошибка</H2>
      <div>{error}</div>
    </div>
  ) : (
    children
  );
