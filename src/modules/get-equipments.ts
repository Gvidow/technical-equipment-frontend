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
  
  export const getEquipments = async (title = '', minPrice = 0, maxPrice = 99000): Promise<EquipmentImage[]> => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/equipment/list?title=${title}`, {
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
          });
        }      
  
        return equipmentImageData;
      } else {
        return mockEquipments;
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
      return mockEquipments;
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
        return '/printer-icon.svg';
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