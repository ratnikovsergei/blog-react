export const SearchBar = ({ searchPhrase, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Поиск статьи..."
        value={searchPhrase}
        onChange={onChange}
      />
      <div className="search-icon">
        <i className="fa fa-search" aria-hidden="true"></i>
      </div>
    </div>
  );
};
