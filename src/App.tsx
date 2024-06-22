import { TeraProvider } from 'lib';
import Main from './Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {
  const basename = document.querySelector('base')?.getAttribute('href') ?? '/';
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TeraProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </TeraProvider>
    </QueryClientProvider>
  );
}

export default App;
