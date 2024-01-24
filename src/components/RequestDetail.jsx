import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getRequestById } from '../modules/get-request-byid.ts';
import { setBucket } from '../actions/bucketActions.js';
import { updateEquipmentResult } from '../actions/requestActions.js'

import CartPage from './CartPage.jsx';
import NavbarTechnicalEquipment from './Navbar';
import Header from './Header';

import { toast } from 'react-toastify';

import './CartPage.css';
import './RequestDetail.css';

const ResultsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const statusAliases = {
    operation: 'Сформирована',
    completed: 'Выполнена',
    CANC: 'Отклонена',
  };

  const user = useSelector((state) => state.auth.user);
  const isModerator = (user && user.role === 'moderator') ? true : false;

  const [loadingResults, setLoadingResults] = useState(false);
  const [status, setStatus] = useState(null);
  const [modelingResults, setModelingResults] = useState([]);
  const [draftStatus, setDraftStatus] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [editedIndex, setEditedIndex] = useState(null);

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
        } else {
          setModelingResults(response.equipments);
        }
      } catch (error) {
        console.error('Ошибка при запросе на моделирование', error);
      } finally {
        setLoadingResults(false);
      }
    };
    fetchResults();
  }, [id]);

  const handleResultChange = async (modelingId, newValue) => {
    try {
      await dispatch(updateEquipmentResult(id, modelingId, parseFloat(newValue)));
      const response = await getApplicationById(id);
      setModelingResults(response.modeling);
      toast.success('Изменения записаны');
    } catch (error) {
      console.error('Ошибка при обновлении результата моделирования', error);
    } finally {
      setEditedIndex(null);
    }
  };

  const handleEditButtonClick = (index, value) => {
    setEditedIndex(index);
    setEditedValue(value);
  };

  if (draftStatus) {
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
            <table className='table-applications'>
              <thead>
                <tr>
                  <th>Оборудование</th>
                  <th>Количество, шт.</th>
                  {isModerator && changeStatus && <th>Действие</th>}
                </tr>
              </thead>
              <tbody>
                {modelingResults.map((result, index) => (
                  <tr key={result.id}>
                    <td>{result.title}</td>
                    <td>
                      {isModerator && changeStatus && index === editedIndex ? (
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                      ) : (
                        result.count
                      )}
                    </td>
                    {isModerator && changeStatus && (
                      <td>
                        {index === editedIndex ? (
                          <button className='accept-draft-button' onClick={() => handleResultChange(result.modeling_id, editedValue)}>
                            Сохранить
                          </button>
                        ) : (
                          <button className='accept-draft-button' onClick={() => handleEditButtonClick(index, result.modeling_result)}>
                            Редактировать
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
};

export default ResultsPage;
