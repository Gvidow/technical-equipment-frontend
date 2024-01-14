import { getEquipmentDetail } from '../modules/get-equipment-detail';

import { getEquipmentDetailSlice } from '../slices/equipmentDetailSlice';

export const getEquipmentDetailAction = (id) => async (dispatch) => {
  try {

    const response = await getEquipmentDetail(id);

    dispatch(getEquipmentDetailSlice(response));
  } catch (error) {
    console.error(`Ошибка при получении данных о модели ID: ${id}:`, error);
  }
};
