import { useNavigate } from 'react-router-dom';
import { H2 } from '../../../../ui';
import { PostPanel } from '../PostPanel/PostPanel';

export const PostContent = ({ post: { id, title, imageUrl, content, publishedAt } }) => {
  const navigate = useNavigate();

  return (
    <div className="post-content">
      <img src={imageUrl || null} alt={title} />
      <H2>{title}</H2>
      <PostPanel
        publishedAt={publishedAt}
        editButton={
          <i
            className="fa fa-pencil-square-o cursor-pointer"
            aria-hidden="true"
            onClick={() => navigate(`/post/${id}/edit`)}
          ></i>
        }
      />
      <div className="post-text">{content}</div>
    </div>
  );
};
