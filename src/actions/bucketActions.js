import axios from 'axios';
import { setBucketItem, setDraftId, setPeoplePerMinute, setTimeInterval, resetBucket } from '../slices/bucketSlice.js';
import { getApplicationById } from "../modules/get-application-byid.ts";

import { toast } from 'react-toastify';

export const getBucket = (draft_id) => async (dispatch) => {
  try {
    const application = await getApplicationById(draft_id);

    if (application && application.modeling[0].modeling_id) {
        dispatch(setBucketItem(application.modeling));
        dispatch(setPeoplePerMinute(application.application_data.people_per_minute));
        dispatch(setTimeInterval(application.application_data.time_interval));
    } else if (application) {
        dispatch(setBucketItem([]));
        dispatch(setPeoplePerMinute(application.application_data.people_per_minute));
        dispatch(setTimeInterval(application.application_data.time_interval));
    }
  } catch (error) {
    console.error('Error getBucket:', error);
  }
};

export const addModelingToBucket = (modeling_id) => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      `http://localhost:80/api/modelings/add/`,
      {
        modeling_id,
      },
      {
        withCredentials: true,
      }
    );
    
    
    if (response.status === 201) {
      dispatch(setDraftId(response.data.draft_id));
      // dispatch(getBucket(response.data.draft_id));
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

export const deleteModelingFromBucket = (modeling_id) => async (dispatch, getState) => {
  try {
    const { draft_id } = getState().bucket;

    const response = await axios.delete(`http://localhost:80/api/applications/${draft_id}/delete_modeling/`, {
      data: { modeling_id },
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch(getBucket(draft_id));
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


export const delBucket = () => async (dispatch, getState) => {
    try {
      const { draft_id } = getState().bucket;

      if (draft_id) {
        await axios.delete(`http://localhost:80/api/applications/${draft_id}/user_delete/`, {
          withCredentials: true,
        });
      }
      dispatch(resetBucket());
  
    } catch (error) {
      console.error('Ошибка во время формирования заявки:', error);
    }
};


export const sendBucket = () => async (dispatch, getState) => {
    try {
      const { draft_id, people_per_minute, time_interval } = getState().bucket;
      if (people_per_minute == null || time_interval == null) {
        toast.error('Нельзя сформировать заявку без обязательных полей');
        return;
      }
      const response = await axios.put(`http://localhost:80/api/applications/${draft_id}/user_set_status/`,
        {status: 'WORK', people_per_minute, time_interval },
        {withCredentials: true},
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
