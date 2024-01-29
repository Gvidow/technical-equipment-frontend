import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import EquipmentsPage from './components/EquipmentsPage'
import EquipmentDetailPage from './components/EquipmentDetailPage'
import AuthorizationPage from './components/AuthorizationPage';
import RegistrationPage from './components/RegistrationPage';
import Logout from './components/Logout';
import CartPage from './components/CartPage';
import RequestsPage from './components/RequestsPage';
import RequestDetail from './components/RequestDetail';
import EquipmentsEditPage from './components/EquipmentsEditPage';
import ConstructorEquipment from './components/ConstructorEquipment';

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
  // <React.StrictMode>
    <Provider store={store}>
    <RouterComponent>
      <Routes>
        {/* <Route path='/*' element={<RedirectComponent />}/> */}
        <Route path='/equipment/feed' element={<EquipmentsPage />}/>
        <Route path='/equipment/get/:id' element={<EquipmentDetailPage />}/>
        <Route path="/login" element={<AuthorizationPage />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/signup" element={<RegistrationPage />}/>
        <Route path="/equipment/requests" element={<RequestsPage />}/>
        <Route path="/request/:id" element={<RequestDetail />}/>
        <Route path="/equipment/edit" element={<EquipmentsEditPage />}/>
        <Route path="/equipment/edit/:id" element={<ConstructorEquipment />}/>
        {/* <Route path="/equipment/cart" element={<CartPage />}/> */}
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </RouterComponent>
  </Provider>,
  // </React.StrictMode>,
)
