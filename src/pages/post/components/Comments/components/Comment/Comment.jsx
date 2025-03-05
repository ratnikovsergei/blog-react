export const Comment = ({ id, author, content, publishedAt }) => {
  return (
    <div className="user-comment">
      <div className="user-comment-wrapper">
        <div className="user-comment-header">
          <div className="user-comment-author">
            <i className="fa fa-user-circle-o mr-1" aria-hidden="true"></i>
            {author}
          </div>
          <div className="user-comment-published-at">
            <i className="fa fa-calendar-o mr-1" aria-hidden="true"></i>
            {publishedAt}
          </div>
        </div>
        <div className="user-comment-text">{content}</div>
      </div>
      <i
        className="fa fa-trash-o cursor-pointer"
        aria-hidden="true"
        onClick={() => {
          /* TODO - удалить комментарий */
        }}
      ></i>
    </div>
  );
};
