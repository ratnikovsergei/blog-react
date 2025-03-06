export const PostPanel = ({ publishedAt, editButton }) => {
  return (
    <div className="post-panel">
      <div>
        <i className="fa fa-calendar-o mr-1" aria-hidden="true"></i>
        {publishedAt}
      </div>
      <div className="post-panel-buttons">
        {editButton}
        <i
          className="fa fa-trash-o ml-2 cursor-pointer"
          aria-hidden="true"
          onClick={() => {}}
        ></i>
      </div>
    </div>
  );
};
