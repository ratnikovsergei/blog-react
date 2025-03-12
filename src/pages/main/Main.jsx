import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components';

export const Main = () => {
  const [posts, setPosts] = useState([]);
  const requestServer = useServerRequest();

  useEffect(() => {
    requestServer('fetchPosts').then((posts) => {
      setPosts(posts.response);
    });
  }, [requestServer]);

  return (
    <div className="posts-container">
      {posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
        <PostCard
          key={id}
          id={id}
          title={title}
          imageUrl={imageUrl}
          publishedAt={publishedAt}
          commentsCount={commentsCount}
        />
      ))}
    </div>
  );
};
