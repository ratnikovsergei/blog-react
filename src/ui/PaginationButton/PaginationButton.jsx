export const PaginationButton = ({ children, ...props }) => {
  return (
    <button className="pagination-button" {...props}>
      {children}
    </button>
  );
};
