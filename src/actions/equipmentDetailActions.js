import { getModelingsDetail } from '../modules/get-modelings-detail';

import { getModelingsDetailsSlice } from '../slices/modelingsDetailsSlice';

export const getModelingsDetails = (id) => async (dispatch) => {
  try {

    const response = await getModelingsDetail(id);

    dispatch(getModelingsDetailsSlice(response));
  } catch (error) {
    console.error(`Ошибка при получении данных о модели ID: ${id}:`, error);
  }
};
