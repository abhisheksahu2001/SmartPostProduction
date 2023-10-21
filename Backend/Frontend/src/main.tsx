import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './store';
import ContextWrapper from './context/ContextWrapper';

import { Router } from './routes/Router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ContextWrapper>
      <BrowserRouter>
        <ToastContainer />
        <Router />
      </BrowserRouter>
    </ContextWrapper>
  </Provider>
);
