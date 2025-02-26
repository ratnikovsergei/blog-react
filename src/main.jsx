import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { Blog } from './Blog.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <Blog />
    </Provider>
  </Router>
);
