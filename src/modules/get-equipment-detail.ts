import { getImageForEquipment } from './get-equipments';

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
    equipment_image: '/printer-icon.svg',
};

export const getEquipmentDetail = async (id: number): Promise<EquipmentDetailsImage> => {
    try {
        const response = await fetch(`/api/v1/equipment/get/${id}/`, {
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
        return mockEquipmentDetails;
    }
}
