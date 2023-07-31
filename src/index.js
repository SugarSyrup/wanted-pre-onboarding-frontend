import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path:"/signin",
    element: <Login />  
  },
  {
    path:"/signup",
    element: <Signup />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{width:'100%', height:'90vh', display:'flex', alignItems:'center', position:'relative'}}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
