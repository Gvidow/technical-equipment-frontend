import {
    setSearchEquipmentTitle,
    setEquipments,
    setLoading,
    setSearchAfterDate,
} from '../slices/equipmentSlice';
  
import { getEquipments } from '../modules/get-equipments';
import { setDraftId } from '../slices/bucketSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
  
const filterEquipments = (
    data,
    searchEquipmentTitle,
    searchCreatedAfter,
) => {
    const filteredData = data.filter((equipment) => {
      const equipmentTitleMatches = equipment.equipment_title.toLowerCase().includes(searchEquipmentTitle.toLowerCase());
      return equipmentTitleMatches;
    });
  
    return filteredData;
};
  
export const setEquipmentsAction = (searchEquipmentTitle, searchCreatedAfter, token_type, access_token) => async (dispatch, getState) => {
    try {
      console.log(`setEquipmentAction: title='${searchEquipmentTitle}' date='${searchCreatedAfter}'`);
      dispatch(setLoading(true));
      const response = await getEquipments(searchEquipmentTitle, searchCreatedAfter, token_type, access_token);
      const draft_id = response[0];
      const data = response[1];
  
      if (data.length !== 0 && data[0].equipment_image === '/printer-icon.svg' && data[0].equipment_title === 'Принтер') {
        const filteredData = filterModelings(data, searchEquipmentTitle, searchCreatedAfter);
        dispatch(setEquipments(filteredData));
      } else {
        dispatch(setEquipments(data));
      }
  
      dispatch(setLoading(false));
  
      if (draft_id) {
        dispatch(setDraftId( draft_id ));
      }
  
    } catch (error) {
      console.error('Ошибка получения объектов моделирования:', error);
      dispatch(setLoading(false));
    }
};
  
export const setSearchEquipmentTitleAction = (title) => (dispatch) => {
    dispatch(setSearchEquipmentTitle(title));
};

export const setSearchEquipmentAfterDateAction = (date) => (dispatch) => {
    dispatch(setSearchAfterDate(date));
};

export const getEquipmentsForEdit = (token_type, access_token) => async (dispatch) => {
  try {
    const response = await getEquipments('', '', token_type, access_token);
    const data = response[1];
    dispatch(setEquipments(data));
  } catch (error) {
    console.error('Ошибка при получении оборудования:', error);
  }
} 

export const deleteEquipment = (id, token_type, access_token) => async () => {
  try {
    if (id) {
      await axios.delete(`/api/v1/equipment/delete/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      })
    }
  } catch (error) {
    toast.error('Неудалось удалить оборудование')
  }
}
