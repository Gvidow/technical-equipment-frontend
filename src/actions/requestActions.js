import axios from 'axios';
import { getRequestsSuccess } from '../slices/requestSlice'

export const getRequests = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/request/list`, {
      withCredentials: true,
    });

    dispatch(getRequestsSuccess(response.data));
  } catch (error) {
    console.error('Ошибка получения списка заявок:', error);
  }
};
