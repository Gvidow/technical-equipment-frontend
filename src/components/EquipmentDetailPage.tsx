import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarTechnicalEquipment from './Navbar';
import Breadcrumbs from './Breadcrumbs';
// import FooterEquipment from './Footer';
import { Link } from 'react-router-dom';
import { EquipmentDetailsImage, getEquipmentDetail } from '../modules/get-equipment-detail';
import './EquipmentDetailsPage.css'

const EquipmentDetailsPage: FC = () => {
  const [details, setDetails] = useState<EquipmentDetailsImage | null>(null);
  const { id } = useParams<{ id: string }>();

  const handlerGetDetail = async () => {
    if (id) {
      const data = await getEquipmentDetail(parseInt(id, 10));
      setDetails(data);
    }
  }

  useEffect(() => {
    handlerGetDetail();
  }, [id]);

  return (
    <div>
        <NavbarTechnicalEquipment />
        <Breadcrumbs items={[
    { label: 'Оборудование', link: '/equipment/feed' },
    { label: `Подробнее`, link: '' }
  ]} />
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
        {/* <FooterEquipment /> */}
    </div>
  );
}

export default EquipmentDetailsPage;
