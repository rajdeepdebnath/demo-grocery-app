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
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
