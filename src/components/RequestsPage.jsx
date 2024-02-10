import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequests } from '../actions/requestActions';
import TableRow from './TableRow';
import { useCustomNavigate } from '../modules/redirect'
import NavbarTec from './Navbar';
import Header from './Header';
// import InputFieldApplications from './InputFieldApplications';

import {
  setSearchUsernameAction, 
  setMinDateAction, 
  setMaxDateAction, 
  setSearchStatusAction
} from '../actions/requestActions'


import './CartPage.css';
import './RequestsPage.css';
import NavbarTechnicalEquipment from './Navbar';

const SHORT_POLLING_INTERVAL = 1000;

const RequestsPage = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const user = useSelector((state) => state.auth.user);

  let applications = useSelector((state) => state.request.requests);

  const { minDate, maxDate, status, username } = useSelector(
    (state) => state.request
  );

  const isModerator = (user && user.role === 'moderator') ? true : false;

  const [selectedStatus, setSelectedStatus] = useState('');

  const handleGetRequests = async () => {
    if (user) {
      await dispatch(getRequests(user.token_type, user.access_token));
      console.log(applications)
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'status-input') {
      if (value === 'reset') {
        setSelectedStatus('');
        console.log('');
        dispatch(setSearchStatusAction(''));
      } else {
        setSelectedStatus(value);
        console.log(value);
        dispatch(setSearchStatusAction(value));
      }
    } else if (id === 'formation-date-from-input') {
      dispatch(setMinDateAction(value));
    } else if (id === 'formation-date-to-input') {
      dispatch(setMaxDateAction(value));
    } else if (id === 'username-input') {
      console.log('Updating username:', value);
      dispatch(setSearchUsernameAction(value));
    }
  };

  useEffect(() => {
    if (status !== '') {
      setSelectedStatus(status);
    }
    handleGetRequests();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        if (user) {
          await dispatch(getRequests(user.token_type, user.access_token));
        } else {
          navigate("/equipment/feed")
        }
      } catch (error) {
        console.error('Ошибка во время получения заявок:', error);
      }
    }, SHORT_POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <NavbarTechnicalEquipment showConstructor={true} />
      <Header breadcrumbs={['Оборудование', 'Заявки']} showCart={false} showApp={false} />
      {/* { isModerator && (
          <InputFieldApplications
            value={nameUser}
            setValue={(value) => dispatch(setSearchValueAction(value))}
            placeholder="Введите имя пользователя"
            status={status}
            setStatus={(value) => dispatch(setSearchStatusAction(value))}
            minDate={minDate}
            maxDate={maxDate}
            setMinDate={(value) => dispatch(setMinDateAction(value))}
            setMaxDate={(value) => dispatch(setMaxDateAction(value))}
          />
        )
      } */}
      <div id='requests-search'>
        <div className="search-bar">
          {/* <input
            type="text"
            id="status-input"
            placeholder="Статус"
            value={status}
            onChange={handleInputChange}
          /> */}
          <div>
            {/* <label htmlFor="status-input">Статус:</label> */}
            <select id="status-input" onChange={handleInputChange} value={selectedStatus}>
              {/* {!selectedStatus && <option value="">Выберите статус</option>} */}
              <option hidden disabled value="">Выберите статус</option>

              <option 
                value="operation"
                hidden={selectedStatus === 'operation'}
                disabled={selectedStatus === 'operation'}
              >
                Сформирована
              </option>

              <option
                value="completed"
                hidden={selectedStatus === 'completed'}
                disabled={selectedStatus === 'completed'}
              >
                Выполнена
              </option>

              <option
                value="canceled"
                hidden={selectedStatus === 'canceled'}
                disabled={selectedStatus === 'canceled'}
              >
                Отклонена
              </option>

              {/* {selectedStatus && <option value="">Выберите статус</option>} */}
              {selectedStatus && <option value="reset">Сбросить</option>}
            </select>
          </div>
          <input
            type="date"
            id="formation-date-from-input"
            placeholder="Дата создания от"
            value={minDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            id="formation-date-to-input"
            placeholder="Дата создания до"
            value={maxDate}
            onChange={handleInputChange}
          />
          {isModerator && (
            <input
              type="text"
              id="username-input"
              placeholder="Имя пользователя"
              value={username}
              onChange={handleInputChange}
            />
          )}
          {/* <button type="button" id="search-button" onClick={handleGetRequests}></button> */}
          <button type="button" class="add-to-cart-button" onClick={handleGetRequests}>
            Искать
          </button>
        </div>
      </div>

      <div className="applications-container">
        <div className='applications-title'>Заявки</div>
        {applications.length > 0 ? (
          <table className='table-applications'>
            <thead>
              <tr>
                <th>№ заявки</th>
                <th>Дата, время создания</th>
                <th>Дата, время формирования</th>
                <th>Дата, время завершения</th>
                <th>Модератор</th>
                {isModerator && (
                  <th>Пользователь</th>  
                )}
                <th>Возвращена</th>
                <th>Статус</th>
                {isModerator && (
                  <th>Действие</th>  
                )}
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                  <TableRow
                    key={application.id}
                    application={application}
                  />
              ))}
            </tbody>
          </table>
        ) : (
          isModerator?
          <p>Пока что нет заявок</p>
          :
          <p>Пока что у Вас нет заявок</p>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
