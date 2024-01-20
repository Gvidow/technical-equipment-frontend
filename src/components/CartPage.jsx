import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCustomNavigate } from '../modules/redirect'

import NavbarAnyMetro from './Navbar';
import Header from './Header';


import './CartPage.css'

import { getBucket, deleteModelingFromBucket, setParametersBucket, sendBucket, delBucket } from '../actions/bucketActions'


const DraftApplicationTable = ({ bucket }) => {  
  const navigate = useCustomNavigate();

  const dispatch = useDispatch();

    const [peoplePerMinute, setPeoplePerMinute] = useState(bucket.people_per_minute || '');
    const [timeInterval, setTimeInterval] = useState(bucket.time_interval || '');
  
    const handleApplyParameters = () => {
        const peoplePerMinuteInt = parseInt(peoplePerMinute, 10);
        const timeIntervalInt = parseInt(timeInterval, 10);
        dispatch(setParametersBucket(peoplePerMinuteInt, timeIntervalInt ));  
    };
  
    const handleRemoveModeling = (modeling_id) => {
      dispatch(deleteModelingFromBucket(modeling_id));
    };

    const handleSendBucket = async () => {
        await dispatch(sendBucket());
        navigate('/equipment/feed');
    };

    const handleDelBucket = async () => {
      await dispatch(delBucket());
      navigate('/equipment/feed');
    };
  
    return (
      <div className='draft-container'>
        <div className='draft-title'>Черновая заявка</div>
        <div className='parameters-modeling-box'>
          <div className='rows-param'>
            <div className='param-output'>
                <strong>Людей в минуту:</strong>
                {bucket.people_per_minute !== null ? (
                    <span className="set">{bucket.people_per_minute}</span>
                ) : (
                    <span className="not-set">Значение не установлено</span>
                )}
            </div>
            
            <div className='param-output'>
                <strong>Интервал времени:</strong>
                {bucket.time_interval !== null ? (
                    <span className="set">{bucket.time_interval}</span>
                ) : (
                    <span className="not-set">Значение не установлено</span>
                )}
            </div>
          </div>
          <div className='rows-param'>
            <div className='input-form'>
              <label htmlFor="peoplePerMinute">Людей в минуту:</label>
                <input
                  type="number"
                  id="peoplePerMinute"
                  value={peoplePerMinute}
                  onChange={(e) => setPeoplePerMinute(e.target.value)}
                />
            </div>
            <div className='input-form'>
              <label htmlFor="timeInterval">Интервал времени:</label>
              <input
                type="number"
                id="timeInterval"
                value={timeInterval}
                onChange={(e) => setTimeInterval(e.target.value)}
              />
            </div>
            <button className='accept-draft-button accept-parameters-button' onClick={handleApplyParameters}>Применить параметры</button>
          </div>
        </div>
        <table className="table-bordered">
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена, руб.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bucket.bucketItems.map((service) => (
              <tr key={service.modeling_id}>
                <td>{service.modeling_name}</td>
                <td>{service.modeling_price}</td>
                <td>
                  <button className='del-draft-button' onClick={() => handleRemoveModeling(service.modeling_id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="buttons-container">
          <button className='del-draft-button main-draft-button' onClick={handleDelBucket}>Удалить заявку</button>
          <button className='accept-draft-button main-draft-button' onClick={handleSendBucket}>Сформировать заявку</button>
        </div>
      </div>
    );
  };

const CartPage = () => {
  const user = useSelector((state) => state.auth.user);
  const bucket = useSelector((state) => state.bucket);

  const dispatch = useDispatch();

  const navigate = useCustomNavigate();

  useEffect(() => {
    if (user && user.role === 'USR') {
      dispatch(getBucket(bucket.draft_id));
    } else {
      navigate('/modelings');
    }
  }, [dispatch]);

  return (
    <div>
      <NavbarAnyMetro />
      <Header showCart={false} showApp={true}/>
      <div className="applications-container">
        {bucket.draft_id !== null && (
          <DraftApplicationTable
            bucket={bucket}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;
