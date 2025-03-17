import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
};
