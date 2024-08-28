import './App.css';
import ToastProvider from './provider/ToastProvider';
import QueryClientProvider from './provider/QueryClientProvider';
import Router from './router/Router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import BaseUIProvider from './provider/BaseUIProvider';

function App() {
  return (
    <QueryClientProvider>
      <ToastProvider>
        <BaseUIProvider>
          <Router />
        </BaseUIProvider>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
