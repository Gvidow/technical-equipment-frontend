import axios from 'axios';
import { setBucketItem, setDraftId, setPeoplePerMinute, setTimeInterval, resetBucket } from '../slices/bucketSlice.js';
import { getRequestById } from "../modules/get-request-byid.ts";

import { toast } from 'react-toastify';

export const setBucket = (application) => async (dispatch) => {
  try {
    if (application && application.equipments) {
        dispatch(setBucketItem(application.equipments));
        // dispatch(setPeoplePerMinute(application.application_data.people_per_minute));
        // dispatch(setTimeInterval(application.application_data.time_interval));
    } else if (application) {
        dispatch(setBucketItem([]));
        // dispatch(setPeoplePerMinute(application.application_data.people_per_minute));
        // dispatch(setTimeInterval(application.application_data.time_interval));
    }
  } catch (error) {
    console.error('Ошибка во время установки корзины:', error);
  }
};

export const getBucket = (draft_id, token_type, access_token) => async (dispatch) => {
  try {
    const application = (await getRequestById(draft_id, token_type, access_token)).body;

    if (application && application.equipments) {
        dispatch(setBucketItem(application.equipments));
        // dispatch(setPeoplePerMinute(application.application_data.people_per_minute));
        // dispatch(setTimeInterval(application.application_data.time_interval));
    } else if (application) {
        dispatch(setBucketItem([]));
        // dispatch(setPeoplePerMinute(application.application_data.people_per_minute));
        // dispatch(setTimeInterval(application.application_data.time_interval));
    }
  } catch (error) {
    console.error('Error getBucket:', error);
  }
};

export const addEquipmentToBucket = (equipment_id, type, access_token) => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      `/api/v1/equipment/last/${equipment_id}`,
      null,
      {
        withCredentials: true,
        headers: {
          Authorization: `${type} ${access_token}`,
        },
      }
    );
    
    
    if (response.status === 201) {
      dispatch(setDraftId(response.data.body.draft_id));
      // dispatch(getBucket(response.data.draft_id));
      toast.success('Услуга добавлена в корзину');
    } else if (response.status === 200) {
      toast.success('Услуга добавлена в корзину');
    }

  } catch (error) {
    if (error.response.status === 409) {
        toast.warning('Этот объект моделирования уже есть в корзине');
    } else {
        toast.error('Ошибка, что-то пошло не так');
        console.error('Ошибка во время добавления услуги в корзину:', error);
    }
    
  }
};

export const deleteEquipmentFromBucket = (equipment_id, token_type, access_token) => async (dispatch, getState) => {
  try {
    const { draft_id } = getState().bucket;

    const response = await axios.delete(`/api/v1/order/delete/${equipment_id}`, {
      withCredentials: true,
      headers: {
        Authorization: `${token_type} ${access_token}`
      }
    });

    if (response.status === 200) {
      dispatch(getBucket(draft_id, token_type, access_token));
    } else {
      console.error(`Ошибка во время удаления услуги из корзины. Статус: ${response.status}`);
    }
  } catch (error) {
    console.error('Ошибка во время удаления услуги из корзины:', error);
  }
};

export const setParametersBucket = (people_per_minute, time_interval) => async (dispatch, getState) => {
    try {
      const { draft_id } = getState().bucket;
  
      const response = await axios.put(`http://localhost:80/api/applications/${draft_id}/update/`,
        {people_per_minute, time_interval },
        {withCredentials: true},
      );
  
      if (response.status === 200) {
        dispatch(getBucket(draft_id));
      } else {
        console.error(`Ошибка во время установки параметров черновика. Статус: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка во время установки параметров черновика:', error);
    }
};


export const delBucket = (token_type, access_token) => async (dispatch, getState) => {
    try {
      const draft = getState().bucket;
      if (draft) {
        await axios.delete(`/api/v1/request/delete/${draft.draft_id}`, {
          withCredentials: true,
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        });
      }
      dispatch(resetBucket());
  
    } catch (error) {
      console.error('Ошибка во время формирования заявки:', error);
    }
};


export const sendBucket = (token_type, access_token) => async (dispatch, getState) => {
    try {
      const draft = getState().bucket;
      console.log('111111111111+', draft.draft_id)
      // if (people_per_minute == null || time_interval == null) {
      //   toast.error('Нельзя сформировать заявку без обязательных полей');
      //   return;
      // }
      const response = await axios.put(`/api/v1/request/format/${draft.draft_id}`,
        null,
        {
          withCredentials: true,
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        },
      );
  
      if (response.status === 200) {
        dispatch(resetBucket());
      } else {
        console.error(`Ошибка во время формирования заявки. Статус: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка во время формирования заявки:', error);
    }
};
