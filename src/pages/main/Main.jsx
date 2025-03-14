import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard, SearchBar } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce, getLastPageFromLinks } from './utils';

export const Main = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const requestServer = useServerRequest();

  useEffect(() => {
    requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
      ({ response: { posts, links } }) => {
        setPosts(posts);
        setLastPage(getLastPageFromLinks(links));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestServer, page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <>
      <SearchBar onChange={onSearch} searchPhrase={searchPhrase} />
      {posts.length > 0 ? (
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
      ) : (
        <div className="no-posts-found">Статьи не найдены</div>
      )}
      {lastPage > 1 && posts.length > 0 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </>
  );
};
