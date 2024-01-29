import { getEquipmentDetail } from '../modules/get-equipment-detail';
import axios from 'axios';
import { setEquipmentDetailSlice } from '../slices/equipmentDetailSlice';
import { toast } from 'react-toastify';

export const getEquipmentDetailAction = (id) => async (dispatch) => {
  try {

    const response = await getEquipmentDetail(id);

    dispatch(setEquipmentDetailSlice(response));
  } catch (error) {
    console.error(`Ошибка при получении данных о модели ID: ${id}:`, error);
  }
};

export const updateEquipmentDetailAction = (id, data, token_type, access_token) => async () => {
  try {
    if (id && data.equipment_image !== null) {
      const formData = new FormData();
      formData.append('title', data.equipment_title);
      formData.append('description', data.equipment_description);
      formData.append('picture', data.equipment_image);

      await axios.put(`/api/v1/equipment/edit/${id}`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token_type} ${access_token}`,
          },
        }
      );

      toast.success('Изменения сохранены');
    } else if (id) {
      const formData = new FormData();
      formData.append('title', data.equipment_title);
      formData.append('description', data.equipment_description);

      await axios.put(`/api/v1/equipment/edit/${id}`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token_type} ${access_token}`,
          },
        }
      );
      toast.success('Изменения сохранены');
    }
    
  } catch (error) {
    console.error(`Ошибка при изменении данных модели ID: ${id}:`, error);
  }
};



export const createEquipmentAction = (data, token_type, access_token) => async () => {
  try {
    console.log('create', data);
    
    if (
      data.equipment_title === null || data.equipment_title === ''
    ) {
      toast.error('Название не может быть пустым');
      return -1;
    }

    const formData = new FormData();
    formData.append('title', data.equipment_title);
    formData.append('description', data.equipment_description || '');
    if (data.equipment_image) {
      formData.append('picture', data.equipment_image);
    }

    await axios.post(`/api/v1/equipment/add`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token_type} ${access_token}`,
        },
      }
    );
    toast.success('Добавлено новое оборудования');
    return 0;

  } catch (error) {
    console.error(`Ошибка при добавлении оборудования:`, error);
  }
};
