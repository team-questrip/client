import './App.css';
import ToastProvider from './provider/ToastProvider';
import QueryClientProvider from './provider/QueryClientProvider';
import Router from './router/Router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import BaseUIProvider from './provider/BaseUIProvider';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalErrorFallback from './components/GlobalErrorFallback';

function App() {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <QueryClientProvider>
        <ToastProvider>
          <BaseUIProvider>
            <Router />
          </BaseUIProvider>
        </ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
