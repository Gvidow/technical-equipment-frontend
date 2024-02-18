export interface EquipmentImage {
  equipment_id: number;
  equipment_title: string;
  equipment_description: string;
  equipment_image: string;
  equipment_created_at: string;
}
  
export interface EquipmentData {
  id: number;
  title: string;
  description: string;
  picture: string;
  created_at: string;
}

export const mockEquipments: EquipmentImage[] = [
  {
      equipment_id: 1,
      equipment_title: 'Принтер',
      equipment_description: 'для печати документов',
      equipment_image: '/technical-equipment-frontend/printer-icon.svg',
      equipment_created_at: '12.12.2023',
  },
  {
      equipment_id: 2,
      equipment_title: 'Проектор',
      equipment_description: 'Показывает в высоком качестве',
      equipment_image: '/technical-equipment-frontend/printer-icon.svg',
      equipment_created_at: '12.11.2023',
  },
  {
      equipment_id: 3,
      equipment_title: 'Ноутбук',
      equipment_description: 'если свой забыли',
      equipment_image: '/technical-equipment-frontend/printer-icon.svg',
      equipment_created_at: '12.09.2023',
  },
];

export const getEquipments = async (equipmentTitle = '', dateAfter=''): Promise<EquipmentImage[]> => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/equipment/list?equipment=${equipmentTitle}${dateAfter !== '' ? `&createdAfter=${dateAfter}`:''}`, {
      method: 'GET',
    });

    if (response.ok) {
      const res: any = await response.json();
      const data: EquipmentData[] = res.body.equipments;
      console.log(data)
      const equipmentImageData: EquipmentImage[] = [];

      for (const equipment of data) {
          equipmentImageData.push({
          equipment_id: equipment.id,
          equipment_title: equipment.title,
          equipment_description: equipment.description,
          equipment_image: await getImageForEquipment(equipment.picture),
          equipment_created_at: equipment.created_at
        });
      }      

      return equipmentImageData;
    } else {
      return filterEquipments(mockEquipments, equipmentTitle, dateAfter);
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    return filterEquipments(mockEquipments, equipmentTitle, dateAfter);
  }
}



export async function getImageForEquipment(equipmentUrl: string): Promise<string> {
  try {
    const response = await fetch(equipmentUrl, {
      method: 'GET',
    });

    if (response.ok) {
      const imageBuffer = await response.arrayBuffer();
      const base64String = arrayBufferToBase64(imageBuffer);
      return `data:${response.headers.get('Content-Type')};base64,${base64String}`;
    } else {
      return '/technical-equipment-frontend/printer-icon.svg';
    }
  } catch (error) {
    console.error(`Ошибка получения изображения для модели ${equipmentUrl}: ${error}`);
    return equipmentUrl;
  }
}
  
  
function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const binaryArray = new Uint8Array(arrayBuffer);
  const binaryString = String.fromCharCode(...binaryArray);
  const base64String = btoa(binaryString);
  return base64String;
}

const filterEquipments = (
  data: EquipmentImage[],
  title: string,
  date: string,
) => {
  const filteredData = data.filter((equipment) => {
    const equipmentTitleMatches = equipment.equipment_title.toLowerCase().includes(title.toLowerCase());
    const equipmentDateMatches = compareDates(equipment.equipment_created_at, date) >= 0;
    return equipmentTitleMatches && equipmentDateMatches;
  });

  return filteredData;
};

function compareDates(date1: string, date2: string): number {
  const [day1, month1, year1] = date1.split('.').map(Number);
  const [day2, month2, year2] = date2.split('.').map(Number);

  const dateObject1 = new Date(year1, month1 - 1, day1); // Месяцы в JavaScript начинаются с 0
  const dateObject2 = new Date(year2, month2 - 1, day2);

  if (dateObject1 < dateObject2) {
      return -1;
  } else if (dateObject1 > dateObject2) {
      return 1;
  } else {
      return 0;
  }
}
