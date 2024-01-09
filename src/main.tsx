import React from 'react'
import ReactDOM from 'react-dom/client'

import EquipmentsPage from './components/EquipmentsPage'
import EquipmentDetailPage from './components/EquipmentDetailPage'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useNavigate } from 'react-router-dom';

// import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

// const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const base_path = '/*';


function RedirectComponent() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/equipment/feed');
  }, [navigate]);
  return null;
}

const router = createBrowserRouter([
  {
    path: base_path,
    element: <RedirectComponent />
  },
  {
    path: '/equipment/feed',
    element: <EquipmentsPage />
  },
  {
    path: '/equipment/get/:id',
    element: <EquipmentDetailPage />
  }
])


// const RouterComponent = isLocal ? BrowserRouter : HashRouter;

// ReactDOM.render(
//   <RouterComponent>
//     <Routes>
//       <Route path={base_path} element={<RedirectComponent />}/>
//       <Route path="/equipment/feed" element={<App />}/>
//       <Route path="/equipment/get/:id" element={<EquipmentDetailPage />} />
//     </Routes>
//   </RouterComponent>,
//   document.getElementById('root')
// );

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
