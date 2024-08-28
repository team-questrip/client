import { ReactNode } from 'react';
import { Client } from 'styletron-engine-monolithic';
import { Provider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';

interface BasaeUIProviderProps {
  children: ReactNode;
}

const engine = new Client();

export default function BaseUIProvider({ children }: BasaeUIProviderProps) {
  return (
    <Provider value={engine}>
      <BaseProvider theme={LightTheme}>{children}</BaseProvider>
    </Provider>
  );
}
