import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, useTheme } from 'styled-components';
import Display from './components/display';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import axios from 'axios';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Display />,
      errorElement: <ErrorPage />,
      children: [
        // TODO: add the routes
      ],
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  // const theme = useTheme();

  return (
    // <ThemeProvider theme={theme}>
    //   <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    //   </QueryClientProvider>
    // </ThemeProvider>
  );
}

export default App;
