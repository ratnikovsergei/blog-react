import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PostContent, Comments } from './components';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../store/selectors';
import { loadPostAsync } from '../../store/actions';

export const Post = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useEffect(() => {
    dispatch(loadPostAsync(requestServer, params.id));
  }, [dispatch, params.id, requestServer]);

  return (
    <div className="post-container">
      <PostContent post={post} />
      <Comments comments={post.comments} postId={post.id} />
    </div>
  );
};
