import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequests } from '../actions/requestActions';
import TableRow from './TableRow';
import { useCustomNavigate } from '../modules/redirect'
import NavbarTec from './Navbar';
import Header from './Header';
// import InputFieldApplications from './InputFieldApplications';

import {
//   setSearchValueAction,
//   setMaxDateAction,
//   setMinDateAction,
//   setSearchStatusAction,
  filterApplicationsUser,
} from '../actions/requestActions'

const SHORT_POLLING_INTERVAL = 5000

import './CartPage.css'
import NavbarTechnicalEquipment from './Navbar';


const RequestsPage = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const user = useSelector((state) => state.auth.user);

  let applications = useSelector((state) => state.request.requests);

  const { minDate, maxDate, status, nameUser } = useSelector(
    (state) => state.request
  );

  const isModerator = (user && user.role === 'moderator') ? true : false;

  const handleGetRequests = async () => {
    if (user) {
      await dispatch(getRequests(user.token_type, user.access_token));
      console.log(applications)
    }
  };
  useEffect(() => {
    handleGetRequests();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        if (user) {
          await dispatch(getRequests());
        } else {
          navigate('/modelings');
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
                <th>Статус</th>
                {isModerator && (
                  <th>Действие</th>  
                )}
              </tr>
            </thead>

            <tbody>
              {filterApplicationsUser(applications, nameUser).map((application) => (
                  <TableRow
                    key={application.application_id}
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
