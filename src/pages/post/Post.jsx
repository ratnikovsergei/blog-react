import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { Error, PrivateContent } from '../../components';
import { PostContent, Comments, PostForm } from './components';
import { ROLE } from '../../constants';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../store/selectors';
import { loadPostAsync, RESET_POST_DATA } from '../../store/actions';

export const Post = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const isCreating = !!useMatch('/post');
  const isEditing = !!useMatch('/post/:id/edit');
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }

    dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
      setError(postData.error);
      setIsLoading(false);
    });
  }, [dispatch, params.id, requestServer, isCreating]);

  if (isLoading) {
    return null;
  }

  const SpecificPostPage =
    isCreating || isEditing ? (
      <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
        <div className="post-container">
          <PostForm post={post} />
        </div>
      </PrivateContent>
    ) : (
      <div className="post-container">
        <PostContent post={post} />
        <Comments comments={post.comments} postId={post.id} />
      </div>
    );

  return error ? <Error error={error} /> : SpecificPostPage;
};
