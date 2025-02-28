import { Routes, Route } from 'react-router-dom';
import { AppColumn, Header, Footer } from './components';
import { Authorization, Registration, Users } from './pages';
import './Blog.css';

const Page = () => (
  <div className="p-[120px]">
    <Routes>
      <Route path="/" element={<div>Главная страница</div>} />
      <Route path="/login" element={<Authorization />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/users" element={<Users />} />
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
      <Page />
      <Footer />
    </AppColumn>
  );
};
