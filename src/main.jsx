import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles/global.css'

import Signup from './pages/Signup';
import UserLayout from './layout/UserLayout';
import Login from './pages/Login';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

const router = createBrowserRouter([
  {
    path:'',
    element:<UserLayout/>,
   children:[{ 
    path: "/",
    element: <Signup/>,
  },
{
  path:"/login",
  element:<Login/>
},
{
  path:"/product",
  element:<ProductList/>
},
{
  path:"/add",
  element:<AddProduct/>
},
{
  path:"/product/:id",
  element:<ProductDetails/>
},
{
  path:"/cart",
  element:<Cart/>
},
{
  path:"/checkout",
  element:<Checkout/>
},
{
  path:"/orders",
  element:<Orders/>
},
]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    
              <RouterProvider router={router} />

    
  </StrictMode>,
)

