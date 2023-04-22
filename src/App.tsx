import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
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
import Nomatch from './pages/Nomatch';
import { ErrorBoundary } from "react-error-boundary";
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

  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="*" element={<Nomatch />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
