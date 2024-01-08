import { FC, useState, useEffect } from 'react';
import { Col, Row, Spinner, Container } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarTechnicalEquipment from './Navbar';
import InputField from './InputField';
import EquipmentCard from './EquipmentCard';
import { EquipmentImage, getEquipments } from '../modules/get-equipments';
import "./EquipmentsPage.css"

const EquipmentsPage: FC = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTitle = queryParams.get('title') || '';
//   const priceParam = queryParams.get('price') || '';

  const [searchValue, setSearchValue] = useState(searchTitle);
  const [equipments, setEquipments] = useState<EquipmentImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState<number | number[]>(0);
  const [maxPrice, setMaxPrice] = useState<number | number[]>(99000);

  const handleSearchSubmit = async () => {
    setLoading(true);
    const currMinPrice = Array.isArray(minPrice) ? minPrice[0] : minPrice
    const currMaxPrice = Array.isArray(maxPrice) ? maxPrice[0] : maxPrice
    const data = await getEquipments(searchValue, currMinPrice, currMaxPrice);
    setEquipments(data);
    setLoading(false);
  }

  const handleMinSliderChange = (value: number | number[]) => {
    setMinPrice(value);
    if (value > maxPrice) {
      setMaxPrice(value);
    }
  };

  const handleMaxSliderChange = (value: number | number[]) => {
    setMaxPrice(value);
    if (value < minPrice) {
      setMinPrice(value);
    }
  };

  useEffect(() => {
    handleSearchSubmit();
  }, []);

  return (
    <div>
      <NavbarTechnicalEquipment />
          <InputField
            value={searchValue}
            setValue={(value)=>{navigateTo(`?title=${value}`); setSearchValue(value)}}
            onSubmit={handleSearchSubmit}
            loading={loading}
            placeholder="Введите поисковый запрос"
            buttonTitle="Искать"
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={handleMinSliderChange}
            setMaxPrice={handleMaxSliderChange}
            lowerTreshold={0}
            upperTreshold={9900}
            step={1000}
            setFilterAfterDate={(date: string) => {
                const queryParams = new URLSearchParams(location.search);
                queryParams.set('createdAfter', date);
                navigateTo(`${location.pathname}?${queryParams.toString()}`);
            }
            }
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
    </div>
  );
}

export default EquipmentsPage;