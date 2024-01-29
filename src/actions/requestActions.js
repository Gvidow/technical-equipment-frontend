import axios from 'axios';
import { getRequestsSuccess,
  setSearchUsername, setMaxDate, setMinDate, setStatus } from '../slices/requestSlice'

import { format } from 'date-fns';

const formatDate = (inputDate) => {
  console.log('eeeeeeee',inputDate)
  const dateObject = new Date(inputDate);

  const formattedDate = format(dateObject, 'dd.MM.yyyy');
  console.log(formattedDate)
  return formattedDate;
};

export const getRequests = (token_type, access_token) => async (dispatch, getState) => {
  try {
    const { minDate, maxDate, status, username } = getState().request;

    const response = await axios.get(`/api/v1/request/list?status=${status}${minDate !== '' ? `&formatedAfter=${formatDate(minDate)}` : ''}${maxDate !== '' ? `&formatedBefore=${formatDate(maxDate)}` : ''}`, {
      withCredentials: true,
      headers: {
        Authorization: `${token_type} ${access_token}`
      }
    });

    const filterData = filterRequestsUser(response.data.body || [], username);

    // console.log(filterData);
    dispatch(getRequestsSuccess(filterData));
  } catch (error) {
    console.error('Ошибка получения списка заявок:', error);
  }
};

export const filterRequestsUser = (
  data,
  username,
) => {
  const filteredData = data.filter((request) => {
    const requestNameMatches = request.creator_profile.username.toLowerCase().includes(username.toLowerCase());
    return requestNameMatches;
  });

  return filteredData;
};


export const setSearchUsernameAction = (searchUsername) => (dispatch) => {
  dispatch(setSearchUsername(searchUsername));
};

export const setMinDateAction = (minDate) => (dispatch) => {
  // const parseMinDate = convertDateString(minDate)
  dispatch(setMinDate(minDate));
};

export const setMaxDateAction = (maxDate) => (dispatch) => {
  // const parseMaxDate = convertDateString(maxDate)
  dispatch(setMaxDate(maxDate));
};

export const setSearchStatusAction = (status) => (dispatch) => {
  dispatch(setStatus(status));
};


// export const updateEquipmentResult = (id, modeling_id, new_result) => async () => {
//   try {
//     await axios.put(`/api/applications/${id}/update_result_modeling/`, 
//     {
//       modeling_id,
//       new_result,
//     },
//     {
//       withCredentials: true,
//     });

//   } catch (error) {
//     console.error('Ошибка при обновлении результата моделирования:', error);
//   }  
// }

export const completeRequest = (id, token_type, access_token) => async () => {
  try {
    await axios.put(`/api/v1/request/status/change/moderator/${id}`, 
    '{"status": "completed"}',
    {
      withCredentials: true,
      headers: {
        Authorization: `${token_type} ${access_token}`
      },
    });

  } catch (error) {
    console.error('Ошибка при завершении заявки:', error);
  }
};

export const rejectRequest = (id, token_type, access_token) => async () => {
  try {
    await axios.put(`/api/v1/request/status/change/moderator/${id}`, 
    '{"status": "canceled"}',
    {
      withCredentials: true,
      headers: {
        Authorization: `${token_type} ${access_token}`
      },
    });

  } catch (error) {
    console.error('Ошибка при отклонении заявки:', error);
  }
};
