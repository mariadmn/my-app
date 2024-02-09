import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import Display from './components/display';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import useTheme from './components/theme';
import CurrentForecast from './components/Forecast/currentForecast';
import FiveDaysForecast from './components/Forecast/5dayforecast';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    //if realoaded, reset the url
    if (window.location.pathname !== '/') {
      window.location.pathname = '/';
    }
  }, []); 

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Display />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <CurrentForecast />,
        },
        {
          path: "/5days",
          element: <FiveDaysForecast />,
        },
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

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
