import { Routes, Route } from 'react-router-dom';
import { AppColumn, Header, Footer } from './components';
import { Authorization } from './pages';
import './Blog.css';

const Content = () => (
  <div className="pt-[140px] pb-[140px]">
    <Routes>
      <Route path="/" element={<div>Главная страница</div>} />
      <Route path="/login" element={<Authorization />} />
      <Route path="/register" element={<div>Регистрация</div>} />
      <Route path="/users" element={<div>Пользователи</div>} />
      <Route path="/post" element={<div>Новая статья</div>} />
      <Route path="/post/:postId" element={<div>Статья</div>} />
      <Route path="*" element={<div>Ошибка</div>} />
    </Routes>
  </div>
);

export const Blog = () => {
  return (
    <AppColumn>
      <Header />
      <Content />
      <Footer />
    </AppColumn>
  );
};
