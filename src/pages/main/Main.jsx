import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, SearchBar } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { request } from '../../utils/request';

export const Main = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  useEffect(() => {
    request(
      `/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { posts, lastPage } }) => {
      setPosts(posts);
      setLastPage(lastPage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, shouldSearch]);

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
          {posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
            <PostCard
              key={id}
              id={id}
              title={title}
              imageUrl={imageUrl}
              publishedAt={publishedAt}
              commentsCount={comments.length}
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
