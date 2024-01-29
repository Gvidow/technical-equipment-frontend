import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateEquipmentDetailAction, getEquipmentDetailAction, createEquipmentAction } from '../actions/equipmentDetailActions';
import { setEquipmentDetailField, toInitState } from '../slices/equipmentDetailSlice.js';
import NavbarAnyMetro from './Navbar';
import Header from './Header';
import { useCustomNavigate } from '../modules/redirect';
import './ConstructorEquipment.css';

import mockImg from '/printer-icon.svg'

const ConstructorEquipment = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (id === "0") {
      const newPath = '/equipment/add';
      window.history.pushState(null, null, newPath);
      dispatch(toInitState());
    } else if (id !== null && id !== "0") {
      dispatch(getEquipmentDetailAction(id));
    }
  }, [id]);

  const details = useSelector((state) => state.equipmentDetail.details);
  console.log(details);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('handleChange:', name, value, files);
  
    dispatch(setEquipmentDetailField({
      fieldName: name ==='equipment_image' ? 'picture' : name,
      fieldValue: name === 'equipment_image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        equipment_title: details.title,
        equipment_description: details.description,
        equipment_image: details.picture,
        load: details.load,
    };

    if (id !== null && id !== "0") {
        await dispatch(updateEquipmentDetailAction(id, data, user.token_type, user.access_token));
        navigate('/equipment/edit');
    } else {
        const resultStatus = await dispatch(createEquipmentAction(data, user.token_type, user.access_token));
        if (resultStatus === 0) {
            navigate('/equipment/edit');
        }
    }
  };

  return (
    <div>
      <NavbarAnyMetro showConstructor={true} />
      <Header breadcrumbs={id && id !== '0' ? ['Услуги', id] : ['Услуги', 'Добавление']} showCart={false} showApp={true} showConstructor={true} />
      <div className="model-card">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="model-card-image">
            {/* <img
              src={details.modeling_image === null ? mockImg : (typeof(details.modeling_image) === 'object') ? 
                URL.createObjectURL(details.modeling_image) : details.modeling_image}
              alt={details?.modeling_name}
              className="model-detail-card"
            /> */}
            <img
              src={typeof(details.picture)==='object' ? (details.picture ? URL.createObjectURL(details.picture) : mockImg) : (details.picture ? details.picture : mockImg) }
              alt={details?.title}
              className="model-detail-card"
            />
            <input className="file-input" type="file" name="equipment_image" onChange={handleChange} accept="image/*" />
          </div>
          <div className="model-card-description">
            <div className="form-field">
                <label htmlFor="equipment_title">Название:</label>
                <input
                  type="text"
                  name="title"
                  value={details.title}
                  onChange={handleChange}
                  placeholder="Введите название"
                  className="form-control"
                />
            </div>
            <div className="form-field">
                <label htmlFor="equipment_description">Описание:</label>
                <textarea
                  name="description"
                  value={details.description}
                  onChange={handleChange}
                  placeholder="Введите описание"
                  className="description-area form-control"
                />
            </div>
            <div className="form-field">
                <button className='btn-save' type="submit">{id === '0' ? 'Создать' : 'Сохранить'}</button>
            </div>
          </div>
        </form>
      </div>
      <button onClick={() => {console.log(details)}}>IIIV</button>
    </div>
  );
};

export default ConstructorEquipment;
