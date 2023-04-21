import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from './state/store'
import { Provider } from 'react-redux'
import './App.css'
import Button from '@mui/material/Button';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Topbar from './components/Topbar';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Theme {
    searchBox: {
      borderRadius: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    searchBox?: {
      borderRadius?: number;
    };
  }
}


const theme = createTheme({
  searchBox: {
    borderRadius: 20,
  }
});

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/wishlist",
      element: <Wishlist />,
    }
  ]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
