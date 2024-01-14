import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import EquipmentsPage from './components/EquipmentsPage'
import EquipmentDetailPage from './components/EquipmentDetailPage'

import 'bootstrap/dist/css/bootstrap.min.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import './index.css';
import store from "./store";

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// const base_path = isLocal ? '/' : 'technical-equipment-frontend/';
const RouterComponent = isLocal ? BrowserRouter : HashRouter;


function RedirectComponent() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/equipment/feed');
  }, [navigate]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterComponent>
      <Routes>
        <Route path='/*' element={<RedirectComponent />}/>
        <Route path='/equipment/feed' element={<EquipmentsPage />}/>
        <Route path='/equipment/get/:id' element={<EquipmentDetailPage />}/>
        {/* <Route path="modelings/:id/" element={<ModelingsDetailsPage />} />
        <Route path="login/" element={<AuthorizationPage />}/>
        <Route path="logout/" element={<Logout />}/>
        <Route path="registration/" element={<RegistrationPage />}/>
        <Route path="modelings/cart/" element={<CartPage />}/>
        <Route path="modelings/applications/" element={<ApplicationsPage />}/>
        <Route path="/modelings/applications/detail/:id" element={<AppDetail />}/> */}
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </RouterComponent>
  </Provider>
  </React.StrictMode>,
)
