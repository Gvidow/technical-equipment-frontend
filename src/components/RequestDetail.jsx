import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getRequestById } from '../modules/get-request-byid.ts';
import { setBucket, deleteEquipmentFromBucket, delBucket, sendBucket } from '../actions/bucketActions.js';
import { updateEquipmentResult } from '../actions/requestActions.js'

import CartPage from './CartPage.jsx';
import NavbarTechnicalEquipment from './Navbar';
import Header from './Header';

import { toast } from 'react-toastify';

import './CartPage.css';
import './RequestDetail.css';
// import { isDraft } from '@reduxjs/toolkit';

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusAliases = {
    operation: 'Сформирована',
    completed: 'Выполнена',
    canceled: 'Отклонена',
    entered: 'Черновик',
  };

  const bucket = useSelector((state) => state.bucket);
  const user = useSelector((state) => state.auth.user);
  const isModerator = (user && user.role === 'moderator') ? true : false;

  const [loadingResults, setLoadingResults] = useState(false);
  const [status, setStatus] = useState(null);
  const [equipmentResults, setEquipmentResults] = useState([]);
  const [draftStatus, setDraftStatus] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [editedEquipmentCount, setEditedEquipmentCount] = useState('');
  // const [editedIndex, setEditedIndex] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoadingResults(true);
        const response = (await getRequestById(id, user.token_type, user.access_token)).body;
        setStatus(response.status);
        console.log('use effect')
        console.log(response.status)
        setChangeStatus(response.status === 'operation');
        setDraftStatus(response.status === 'entered');
        if (response.status === 'entered') {
          dispatch(setBucket(response));
          setEquipmentResults(response.equipments);
        } else {
          setEquipmentResults(response.equipments);
        }
      } catch (error) {
        console.error('Ошибка при запросе на моделирование', error);
      } finally {
        setLoadingResults(false);
      }
    };
    fetchResults();
  }, [id]);

  const handleResultChange = async (equipmentId, newValue) => {
    try {
      await dispatch(updateEquipmentResult(id, equipmentId, parseFloat(newValue)));
      const response = await getApplicationById(id);
      setEquipmentResults(response.body.equipments);
      toast.success('Изменения записаны');
    } catch (error) {
      console.error('Ошибка при обновлении результата моделирования', error);
    } finally {
      // setEditedIndex(null);
    }
  };

  const handleRemoveEquipment = (equipment_id) => {
    dispatch(deleteEquipmentFromBucket(equipment_id, user.token_type, user.access_token));
  };

  const handleEditButtonClick = (value) => {
    // setEditedIndex(index);
    setEditedEquipmentCount(value);
  };

  const handleDelBucket = async () => {
    await dispatch(delBucket(user.token_type, user.access_token));
    navigate('/equipment/feed');
  };

  const handleSendBucket = async () => {
    await dispatch(sendBucket(user.token_type, user.access_token));
    navigate('/equipment/feed');
  };

  if (0 === 1) {
    return <CartPage />
  } else {
    return (
      <div>
        <NavbarTechnicalEquipment showConstructor={true} />
        <Header breadcrumbs={['Оборудование', 'Заявки', id]} showCart={false} showApp={true} />
        <div className="applications-container">
          <div className='applications-title'> Заявка № {id} </div>
          {status && (
            <p> Статус: {statusAliases[status]} </p>
          )}
          {loadingResults ? (
            <p>Загрузка...</p>
          ) : (
            // <table className='table-applications'>
            //   <thead>
            //     <tr>
            //       <th>Оборудование</th>
            //       <th>Количество, шт.</th>
            //       {isModerator && changeStatus && <th>Действие</th>}
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {modelingResults.map((result, index) => (
            //       <tr key={result.id}>
            //         <td>{result.title}</td>
            //         <td>
            //           {isModerator && changeStatus && index === editedIndex ? (
            //             <input
            //               type="text"
            //               value={editedValue}
            //               onChange={(e) => setEditedValue(e.target.value)}
            //             />
            //           ) : (
            //             result.count
            //           )}
            //         </td>
            //         {isModerator && changeStatus && (
            //           <td>
            //             {index === editedIndex ? (
            //               <button className='accept-draft-button' onClick={() => handleResultChange(result.modeling_id, editedValue)}>
            //                 Сохранить
            //               </button>
            //             ) : (
            //               <button className='accept-draft-button' onClick={() => handleEditButtonClick(index, result.modeling_result)}>
            //                 Редактировать
            //               </button>
            //             )}
            //           </td>
            //         )}
            //       </tr>
            //     ))}
            //   </tbody>
            // </table>
            <div>
              <h3>Оборудование:</h3>
              <ul>
                    {(draftStatus && bucket.bucketItems ? bucket.bucketItems : equipmentResults).map((equipment) => (
                        // <p>{item.id}</p>
                        <li key={equipment.id}>
                            <h4>{equipment.title}</h4>
                            <p>{equipment.description}</p>
                            <img src={equipment.picture || '/printer-icon.svg'} alt={equipment.title} />

                            <div>
                                <label htmlFor={`productionCount-${equipment.id}`}>Количество:</label>
                                <input
                                    type="number"
                                    id={`productionCount-${equipment.id}`}
                                    value={equipment.count || 1}
                                    className="counter"
                                    onChange={(e) => setEditedValue(e.target.value)}
                                    disabled={!draftStatus}
                                />
                                {draftStatus && user && (
                                    <div>
                                        <button className="okey">
                                            Изменить количество
                                        </button>
                                        <button onClick={() => handleRemoveEquipment(equipment.id, user.token_type, user.access_token)} className="delete">
                                            Удалить из заявки
                                        </button>
                                    </div>
                                )}
                            </div>

                        </li>
                    ))}
                </ul>
                {draftStatus && (
                    <div>
                        <button onClick={handleSendBucket} className="okey">
                            Оформить заявку
                        </button>
                        <button onClick={handleDelBucket} className="delete">
                            Удалить заявку
                        </button>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default RequestDetail;
