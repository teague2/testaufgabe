import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductListPage from './pages/ProductList';
import ProductDetailPage from './pages/ProductDetail';
import App from './App';
import CartPage from './pages/Cart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App /></div>,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
