import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Blog } from './Blog.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <Blog />
  </Router>
);
