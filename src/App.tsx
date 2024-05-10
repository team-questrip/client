import './App.css';
import Home from './Pages/Home';
import Frame from './design/Frame';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Frame>
        <Home />
      </Frame>
    </QueryClientProvider>
  );
}

export default App;
