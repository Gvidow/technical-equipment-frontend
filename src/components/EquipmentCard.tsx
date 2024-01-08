import { FC } from 'react';
import { Link } from 'react-router-dom';
import './EquipmentCard.css';

interface Equipment {
  equipment_id: number;
  equipment_title: string;
  equipment_description: string;
  equipment_image: string;
}

const EquipmentCard: FC<Equipment> = ({
  equipment_id,
  equipment_title,
  equipment_description,
  equipment_image,
}) => (
    <div className="custom-card">
    <Link to={`/equipment/get/${equipment_id}`} className="card-href">
      <img src={`${equipment_image}`} alt={equipment_title} className="custom-card-img" />
      <div className="custom-card-body">
        <p className="custom-card-text text-center">{equipment_title}</p>
        <p className="custom-card-price text-center">{equipment_description}</p>
      </div>
    </Link>
  </div>
);

export default EquipmentCard;