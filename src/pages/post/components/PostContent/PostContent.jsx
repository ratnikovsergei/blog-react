import { H2 } from '../../../../ui';

export const PostContent = ({ post: { id, title, imageUrl, content, publishedAt } }) => {
  return (
    <div className="post-content">
      <img src={imageUrl || null} alt={title} />
      <H2>{title}</H2>
      <div className="post-panel">
        <div>
          <i className="fa fa-calendar-o mr-1" aria-hidden="true"></i>
          {publishedAt}
        </div>
        <div className="post-panel-buttons">
          <i
            className="fa fa-pencil-square-o cursor-pointer"
            aria-hidden="true"
            onClick={() => {}}
          ></i>
          <i
            className="fa fa-trash-o ml-2 cursor-pointer"
            aria-hidden="true"
            onClick={() => {}}
          ></i>
        </div>
      </div>
      <div className="post-text">{content}</div>
    </div>
  );
};
