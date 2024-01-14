import axios from 'axios';

import { loginUser } from './authActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const registerUser = (userData) => async (dispatch) => {
    try {
      console.log('reg', userData)
      const response = await axios.post('/api/v1/auth/signup', userData);
      console.log(response)
      dispatch(loginUser(userData.username, userData.password));
      toast.success('Регистрация успешна');
    } catch (error) {
      toast.error('Ошибка при регистрации');
    }
};
