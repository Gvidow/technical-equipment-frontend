import axios from 'axios';
import { getRequestsSuccess } from '../slices/requestSlice'

export const getRequests = (token_type, access_token) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v1/request/list`, {
      withCredentials: true,
      headers: {
        Authorization: `${token_type} ${access_token}`
      }
    });
    console.log(response.data.body)
    dispatch(getRequestsSuccess(response.data.body));
  } catch (error) {
    console.error('Ошибка получения списка заявок:', error);
  }
};

export const filterApplicationsUser = (
  data,
  nameUser,
) => {
  console.log(data)
  const filteredData = data.filter((application) => {
    // const applicationNameMatches = application.creator_profile.username.toLowerCase().includes(nameUser.toLowerCase());
    return true;
  });

  return filteredData;
};

export const updateEquipmentResult = (id, modeling_id, new_result) => async () => {
  try {
    await axios.put(`http://localhost:80/api/applications/${id}/update_result_modeling/`, 
    {
      modeling_id,
      new_result,
    },
    {
      withCredentials: true,
    });

  } catch (error) {
    console.error('Ошибка при обновлении результата моделирования:', error);
  }  
}
