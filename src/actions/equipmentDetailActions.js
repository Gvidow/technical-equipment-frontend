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



export const createEquipmentAction = (data) => async () => {
  try {
    if (
      data.modeling_image === null ||
      data.modeling_name === '' ||
      data.modeling_name === null ||
      data.modeling_price === '' ||
      data.modeling_price === null ||
      data.load === null
    ) {
      toast.error('Невозможно создавть вид моделирования без обязательных полей');
      return -1;
    }

    const imageName = transliterate(data.modeling_name) + ".jpeg";

    await axios.put(`http://localhost:80/upload-images/${imageName}`, 
      data.modeling_image,
      {
        headers: {
          'Content-Type': 'image/jpeg',
        },
        withCredentials: true,
      }
    );

    await axios.post(`http://localhost:80/api/modelings/create/`, 
      {
        modeling_name: data.modeling_name,
        modeling_description: data.modeling_description,
        modeling_price: data.modeling_price,
        load: data.load,
        modeling_image_url: imageName, 
      },
      {
        withCredentials: true,
      }
    );
    toast.success('Добавлен новый вид моделирования');
    return 0;

  } catch (error) {
    console.error(`Ошибка при изменении данных модели ID: ${id}:`, error);
  }
};
