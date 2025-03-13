import { Link } from 'react-router-dom';

export const PostCard = ({ id, title, imageUrl, publishedAt, commentsCount }) => {
  const dateOfPublish = publishedAt.substring(0, 10);

  return (
    <div className="post-card">
      <Link to={`/post/${id}`}>
        <img src={imageUrl} alt={title} />
        <div className="post-card-footer">
          <span className="text-sm font-bold">{title}</span>
          <div className="post-card-info">
            <section>
              <i className="fa fa-calendar-o" aria-hidden="true"></i> {dateOfPublish}
            </section>
            <section>
              <i className="fa fa-comment-o" aria-hidden="true"></i> {commentsCount}
            </section>
          </div>
        </div>
      </Link>
    </div>
  );
};
