import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

import NavbarTechnicalEquipment from './Navbar';
import Header from './Header';

import './EquipmentsEditPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentsForEdit, deleteEquipment } from '../actions/equipmentActions';

const EquipmentsEditPage = () => {
    const dispatch = useDispatch();
    const { equipments } = useSelector(
        (state) => state.equipment
    );
    const user = useSelector((state) => state.auth.user);
    // const [equipmentList, setEquipmentList] = useState([]);

    useEffect(() => {
        dispatch(getEquipmentsForEdit(user.token_type, user.access_token));
    }, [dispatch]);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/equipment/');
    //         setEquipmentList(response.data.equipment || []);
    //     } catch (error) {
    //         console.error('Error fetching equipment list:', error);
    //     }
    // };

    const handleDelete = async (equipment_id) => {
        dispatch(deleteEquipment(equipment_id, user.token_type, user.access_token));
        dispatch(getEquipmentsForEdit(user.token_type, user.access_token));
    };

    return (
        <div>
            <NavbarTechnicalEquipment />
            <Header breadcrumbs={['Услуги']} showCart={false} showApp={false} />
            <div className="myEditEq">
                <div className="equipment-list-container">
                    <h1>Список услуг</h1>
                    <table className="my-excel-table">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Изображение</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipments.map((equipment) => (
                                <tr key={equipment.equipment_id}>
                                    <td>{equipment.equipment_title}</td>
                                    <td>{equipment.equipment_description}</td>
                                    <td>
                                        <img src={equipment.equipment_image} alt={equipment.equipment_title} className="myequipment-image" />
                                    </td>
                                    <td>
                                        <button className="my-delete-button" onClick={() => handleDelete(equipment.equipment_id)}>
                                            удалить
                                        </button>
                                        <Link to={`/equipment/edit/${equipment.equipment_id}`}>
                                            редактировать
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EquipmentsEditPage;
