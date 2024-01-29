import { useState, useEffect } from 'react';
import { Col, Row, Spinner, Container } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { setSearchAfterDate } from '../slices/equipmentSlice';

import {
  setEquipmentsAction,
  setSearchEquipmentTitleAction,
  setSearchEquipmentAfterDateAction
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

  const { searchEquipmentTitle, equipments, loading, searchAfterDate } = useSelector(
    (state) => state.equipment
  );

  

  const navigateTo = useNavigate();

////////////////////////////////////////////////////////////////////

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let searchEquipmentTitleCurrent = queryParams.get('equipment') || '';
  let searchDateCurrent = queryParams.get('createdAfter') || '';

  // const [searchEquipment2, setSearchEquipment] = useState(searchEquipmentTitle);
  // const [searchAfterDate2, setSearchAfterDate] = useState(searchDateCurrent)
  const [equipments2, setEquipments] = useState([]);
  // const [begin, setBegin] = useState(true);
  const [loading2, setLoading] = useState(false);

////////////////////////////////////////////////////////////////////

  const [ reset, setReset] = useState(0);
  if ((searchEquipmentTitle !== '' || searchAfterDate !== '') &&  searchEquipmentTitleCurrent === '' && searchDateCurrent === '') {
    searchEquipmentTitleCurrent = searchEquipmentTitle
    searchDateCurrent = searchAfterDate
    queryParams.set('createdAfter', searchDateCurrent);
    queryParams.set('equipment', searchEquipmentTitleCurrent);
    navigateTo(`${location.pathname}?${queryParams.toString()}`);
  }

  const handleSearchSubmit = async () => {
    if (isAuthenticated) {
      dispatch(setEquipmentsAction(searchEquipmentTitle, searchAfterDate, user.token_type, user.access_token));
    } else {
      dispatch(setEquipmentsAction(searchEquipmentTitle, searchAfterDate));
    }
  }

  useEffect(() => {
    console.log(searchEquipmentTitleCurrent, searchDateCurrent)

    if (searchEquipmentTitleCurrent !== '') {
      dispatch(setSearchEquipmentTitleAction(searchEquipmentTitleCurrent));
    }
    if (searchDateCurrent !== '') {
      dispatch(setSearchEquipmentAfterDateAction(searchDateCurrent));
    }
  
    if (isAuthenticated) {
      dispatch(setEquipmentsAction(searchEquipmentTitleCurrent, searchDateCurrent, user.token_type, user.access_token));
    } else {
      dispatch(setEquipmentsAction(searchEquipmentTitleCurrent, searchDateCurrent));
    }
  }, [reset]);

  return (
    <div>
      <NavbarTechnicalEquipment showConstructor={true} />
      <Header breadcrumbs={['Оборудование']} showCart={true} showApp={true} />
          <InputField
            equipmentTitle={searchEquipmentTitleCurrent}
            reset={()=>{setReset(reset === 0 ? 1 : 0)}}
            setEquipmentTitle={(equipmentTitle)=>{
                // setSearchEquipment(equipmentTitle)
                const queryParams = new URLSearchParams(location.search);
                queryParams.set('equipment', equipmentTitle);
                // console.log(`${location.pathname}?${queryParams.toString()}`)
                navigateTo(`${location.pathname}?${queryParams.toString()}`);
                console.log('setEquipmentTitle: ', equipmentTitle);
                dispatch(setSearchEquipmentTitleAction(equipmentTitle));
            }
          }
            clearParams={()=>{navigateTo('/equipment/feed')}}
            onSubmit={handleSearchSubmit}
            loading={loading}
            placeholder="Введите поисковый запрос"
            buttonTitle="Искать"
            setFilterAfterDate={(date) => {
                const queryParams = new URLSearchParams(location.search);
                queryParams.set('createdAfter', date);
                navigateTo(`${location.pathname}?${queryParams.toString()}`);
                dispatch(setSearchEquipmentAfterDateAction(date));
            }
            }
            searchAfterDate={searchDateCurrent}
          />

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
          {/*<button onClick={()=>{console.log(searchEquipmentTitle, searchAfterDate)}}>III</button>*/}
    </div>
  );
}

export default EquipmentsPage;
