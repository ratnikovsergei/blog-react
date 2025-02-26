export const Button = ({ children, ...props }) => {
  return (
    <button className="app-button" {...props}>
      {children}
    </button>
  );
};
