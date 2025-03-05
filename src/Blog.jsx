import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppColumn, Header, Footer } from './components';
import { Authorization, Registration, Users, Post } from './pages';
import { setUser } from './store/actions';
import './Blog.css';

const Page = () => (
  <div className="page">
    <Routes>
      <Route path="/" element={<div>Главная страница</div>} />
      <Route path="/login" element={<Authorization />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/users" element={<Users />} />
      <Route path="/post" element={<div>Новая статья</div>} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="*" element={<div>Ошибка</div>} />
    </Routes>
  </div>
);

export const Blog = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
  }, [dispatch]);

  return (
    <AppColumn>
      <Header />
      <Page />
      <Footer />
    </AppColumn>
  );
};
