import { Link } from 'react-router-dom';
import './EquipmentCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { addEquipmentToBucket } from '../actions/bucketActions';


const EquipmentCard = ({
  equipment_id,
  equipment_title,
  equipment_description,
  equipment_image,
}) => {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const isUserAuthorized = isAuthenticated && user && user.role === 'user';
  
  const handleAddToBucket = () => {
    dispatch(addEquipmentToBucket(equipment_id, user.token_type, user.access_token));
  };

  return (
    <div className="custom-card">
      <Link to={`/equipment/get/${equipment_id}`} className="card-href">
        <img src={`${equipment_image}`} alt={equipment_title} className="custom-card-img" />
        <div className="custom-card-body">
          <p className="custom-card-text text-center">{equipment_title}</p>
          <p className="custom-card-price text-center">{equipment_description}</p>
        </div>
      </Link>

      {isUserAuthorized && (
        <div className="add-to-cart-container">
          <button className="add-to-cart-button" onClick={handleAddToBucket}>
            В корзину
          </button>
        </div>
      )}
    </div>
  );
}

export default EquipmentCard;
