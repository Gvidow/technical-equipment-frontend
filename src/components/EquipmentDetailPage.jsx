import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavbarTechnicalEquipment from './Navbar';
import Header from './Header';
import { Link } from 'react-router-dom';
import { getEquipmentDetailAction } from '../actions/equipmentDetailActions';
import './EquipmentDetailPage.css'

const EquipmentDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const details = useSelector((state) => state.equipmentDetail.details);

  useEffect(() => {
    // console.log('EquipmentDetailsPage:::', details)
    if (id) {
      dispatch(getEquipmentDetailAction(id));
    }
  }, [id, dispatch, details?.title]);

  return (
    <div>
        <NavbarTechnicalEquipment />
        <Header breadcrumbs={['Оборудование', details?.title]} showCart={false} showApp={true}/>
        <div className="model-card">
            <div className="model-card-image">
                <img src={`${details?.equipment_image}`} alt={details?.title} className="model-detail-card" />
            </div>
            <div className="model-card-description">
                <h2>{details?.title}</h2>
                <p>{details?.description}</p>
                <Link to="/equipment/feed" className="btn-back-to-models">Вернуться к услугам</Link>
            </div>
        </div>
    </div>
  );
}

export default EquipmentDetailsPage;
