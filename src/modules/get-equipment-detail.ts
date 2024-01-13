import { getImageForEquipment, mockEquipments } from './get-equipments';

export interface EquipmentDetailsData {
    title: string;
    description: string;
    picture: string;
}

export interface EquipmentDetailsImage {
    title: string;
    description: string;
    equipment_image: string;
}

const mockEquipmentDetails: EquipmentDetailsImage = {
    title: 'Оборудование',
    description: 'Подробное описание для данного оборудования',
    equipment_image: '/technical-equipment-frontend/printer-icon.svg',
};

export const getEquipmentDetail = async (id: number): Promise<EquipmentDetailsImage> => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/equipment/get/${id}/`, {
            method: 'GET',
        });
        if (!response.ok) {
            return mockEquipmentDetails;
        }
        const data: EquipmentDetailsData = (await response.json()).body;

        const equipmentImage = await getImageForEquipment(data.picture);
        const updatedEquipmentDetails: EquipmentDetailsImage = {
            ...data,
            equipment_image: equipmentImage,
        };

        return updatedEquipmentDetails;
    } catch (error) {
        let res: EquipmentDetailsImage | null = null;
        mockEquipments.forEach(element => {
            if (element.equipment_id === id) {
                res = {
                    title: element.equipment_title,
                    description: element.equipment_description,
                    equipment_image: element.equipment_image,
                };
            }
        })
        if (res === null) {
            return mockEquipmentDetails;
        } else {
            return res;
        }
    }
}
