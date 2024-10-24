import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

interface QueryClientProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error(error),
  }),
});

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  return (
    <OriginalQueryClientProvider client={queryClient}>
      {children}
    </OriginalQueryClientProvider>
  );
}
