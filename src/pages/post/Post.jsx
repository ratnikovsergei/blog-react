import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { PostContent, Comments, PostForm } from './components';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../store/selectors';
import { loadPostAsync, RESET_POST_DATA } from '../../store/actions';

export const Post = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isCreating = useMatch('/post');
  const isEditing = useMatch('/post/:id/edit');
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      return;
    }

    dispatch(loadPostAsync(requestServer, params.id));
  }, [dispatch, params.id, requestServer, isCreating]);

  return (
    <div className="post-container">
      {isCreating || isEditing ? (
        <PostForm post={post} />
      ) : (
        <>
          <PostContent post={post} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  );
};
