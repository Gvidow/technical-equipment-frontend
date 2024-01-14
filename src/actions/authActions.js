import axios from 'axios';
import { loginSuccess, logoutSuccess } from '../slices/authSlice';
import { resetBucket } from '../slices/bucketSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const loginUser = (login, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/login/', {
      login,
      password,
    }, {
      withCredentials: true,
    });

    dispatch(loginSuccess({ user: response.data }));
    //toast.success('Вход выполнен успешно');
    //redirectTo('/modelings');
  } catch (error) {
    toast.error('Неверный логин или пароль');
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { bucket } = getState();
    const draft_id = bucket.draft_id;

    if (draft_id) {
      await axios.delete(`http://localhost:8080/api/v1/applications/${draft_id}/user_delete/`, {
        withCredentials: true,
      });
    }
    dispatch(resetBucket());

    await axios.get('http://localhost:8080/api/v1/auth/logout/', {
      withCredentials: true,
    });
    
    dispatch(logoutSuccess());

    toast.success('Выход выполнен успешно');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};
