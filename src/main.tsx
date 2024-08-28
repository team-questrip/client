import './service/setup.js';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.tsx';

if (import.meta.env.DEV) {
  await import('./mocks/accepted-recommend-mocks.ts');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
