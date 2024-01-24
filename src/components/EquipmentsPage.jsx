import { useState, useEffect } from 'react';
import { Col, Row, Spinner, Container } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  setEquipmentsAction
} from '../actions/equipmentActions'

import NavbarTechnicalEquipment from './Navbar';
import InputField from './InputField';
import EquipmentCard from './EquipmentCard';
import Header from './Header';

import { getEquipments } from '../modules/get-equipments';
import "./EquipmentsPage.css"
import { setEquipments } from '../slices/equipmentSlice';

const EquipmentsPage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const { searchEquipment, equipments, loading, searchAfterDate } = useSelector(
    (state) => state.equipment
  );

  

  const navigateTo = useNavigate();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const searchEquipmentTitle = queryParams.get('equipment') || '';
  // const searchDate = queryParams.get('createdAfter') || '';

  // const [searchEquipment, setSearchEquipment] = useState(searchEquipmentTitle);
  // const [searchAfterDate, setSearchAfterDate] = useState(searchDate)
  // const [equipments, setEquipments] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [ reset, setReset] = useState(0);

  const handleSearchSubmit = async () => {
    if (isAuthenticated) {
      dispatch(setEquipmentsAction(searchEquipment, searchAfterDate, user.token_type, user.access_token));
    } else {
      dispatch(setEquipmentsAction(searchEquipment, searchAfterDate));
    }
  }

  useEffect(() => {
    handleSearchSubmit();
  }, [reset]);

  return (
    <div>
      <NavbarTechnicalEquipment />
      <Header breadcrumbs={['Оборудование']} showCart={true} showApp={true} />
          {/* <InputField
            equipmentTitle={searchEquipment}
            reset={()=>{setReset(reset === 0 ? 1 : 0)}}
            setEquipmentTitle={(equipmentTitle)=>{
                setSearchEquipment(equipmentTitle)
                const queryParams = new URLSearchParams(location.search);
                queryParams.set('equipment', equipmentTitle);
                console.log(`${location.pathname}?${queryParams.toString()}`)
                navigateTo(`${location.pathname}?${queryParams.toString()}`);
            }}
            clearParams={()=>{navigateTo('/equipment/feed')}}
            onSubmit={handleSearchSubmit}
            loading={loading}
            placeholder="Введите поисковый запрос"
            buttonTitle="Искать"
            setFilterAfterDate={(date) => {
                setSearchAfterDate(date);
                const queryParams = new URLSearchParams(location.search);
                queryParams.set('createdAfter', date);
                navigateTo(`${location.pathname}?${queryParams.toString()}`);
            }
            }
            searchAfterDate={searchAfterDate}
          /> */}

          <Container className="mx-auto">
            <div className={`mx-auto ${loading ? 'custom-loading' : 'custom-container'} text-center d-flex align-items-center justify-content-center`}>
              {loading && <div className="loadingBg"><Spinner animation="border" /></div>}
            </div>
            <div>
              {!equipments?.length ? (
                <div className="text-center сustom-text">К сожалению, пока ничего не найдено :(</div>
              ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {equipments.map((item, index) => (
                    <Col key={index}>
                      <EquipmentCard {...item} />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Container>
    </div>
  );
}

export default EquipmentsPage;
