import './service/setup.js';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.tsx';
import { Client as Styletron } from 'styletron-engine-monolithic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';

if (import.meta.env.DEV) {
  await import('./mocks/accepted-recommend-mocks.ts');
}

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </Provider>
);
