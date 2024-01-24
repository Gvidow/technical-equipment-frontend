import axios from "axios";

export interface EquipmentImage {
  equipment_id: number;
  equipment_title: string;
  equipment_description: string;
  equipment_image: string;
}
  
export interface EquipmentData {
  id: number;
  title: string;
  description: string;
  picture: string;
}

const mockEquipments: EquipmentImage[] = [
  {
      equipment_id: 1,
      equipment_title: 'Принтер',
      equipment_description: 'для печати документов',
      equipment_image: '/printer-icon.svg',
  },
  {
      equipment_id: 2,
      equipment_title: 'Проектор',
      equipment_description: 'Показывает в высоком качестве',
      equipment_image: '/printer-icon.svg',
  },
  {
      equipment_id: 3,
      equipment_title: 'Ноутбук',
      equipment_description: 'если свой забыли',
      equipment_image: '/printer-icon.svg',
  },
];

const MAX_IMAGE_RETRIES = 3;

export const getEquipments = async (equipmentTitle = '', dateAfter='', token_type: string | null, access_token: string | null): Promise<[number | null, EquipmentImage[]]> => {
  try {
    const response = await axios.get(`/api/v1/equipment/list?equipment=${equipmentTitle}${dateAfter !== '' ? `&createdAfter=${dateAfter}`:''}`, {
      withCredentials: true,
      headers: {
        Authorization: `${token_type} ${access_token}`
      }
    });

    if (response.status === 200) {
      const data: EquipmentData[] = response.data.body.equipments;

      const draft_id = response.data.body.last_request_id;

      const equipmentImageData: EquipmentImage[] = [];

      for (const equipment of data) {
          equipmentImageData.push({
          equipment_id: equipment.id,
          equipment_title: equipment.title,
          equipment_description: equipment.description,
          equipment_image: await getImageForEquipment(equipment.picture),
        });
      }    

      return [draft_id, equipmentImageData];
    } else {
      return [null, mockEquipments];
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    return [null, mockEquipments];
  }
}

export async function getImageForEquipment(equipmentUrl: string): Promise<string> {
  try {
    if (equipmentUrl === '') {
      return '/printer-icon.svg';
    }
    const response = await axios.get(equipmentUrl, {
      responseType: 'arraybuffer',
      withCredentials: true,
    });

    if (response.status === 200) {
      const imageBuffer = await response.data;
      const base64String = arrayBufferToBase64(imageBuffer);
      return `data:${response.headers['content-type']};base64,${base64String}`;
    } else {
      return '/printer-icon.svg';
    }
  } catch (error) {
    console.error(`Ошибка получения изображения для модели ${equipmentUrl}: ${error}`);
    return equipmentUrl;
  }
}
  
  
function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const binaryArray = new Uint8Array(arrayBuffer);
  const len = binaryArray.length;
  let binaryString = '';

  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(binaryArray[i]);
  }
  return btoa(binaryString);
}
