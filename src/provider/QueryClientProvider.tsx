import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

interface QueryClientProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  return (
    <OriginalQueryClientProvider client={queryClient}>
      {children}
    </OriginalQueryClientProvider>
  );
}
