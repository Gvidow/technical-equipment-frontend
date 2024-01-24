import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCustomNavigate } from '../modules/redirect'

import NavbarTechnicalEquipment from './Navbar';
import Header from './Header';


import './CartPage.css'

import { getBucket, deleteEquipmentFromBucket, setParametersBucket, sendBucket, delBucket } from '../actions/bucketActions'


const DraftApplicationTable = ({ bucket, user }) => {  
  const navigate = useCustomNavigate();

  const dispatch = useDispatch();

    const [peoplePerMinute, setPeoplePerMinute] = useState(bucket.people_per_minute || '');
    const [timeInterval, setTimeInterval] = useState(bucket.time_interval || '');
  
    const handleApplyParameters = () => {
        const peoplePerMinuteInt = parseInt(peoplePerMinute, 10);
        const timeIntervalInt = parseInt(timeInterval, 10);
        dispatch(setParametersBucket(peoplePerMinuteInt, timeIntervalInt ));  
    };
  
    const handleRemoveEquipment = (equipment_id) => {
      dispatch(deleteEquipmentFromBucket(equipment_id, user.token_type, user.access_token));
    };

    const handleSendBucket = async () => {
        console.log('eeeeeee', bucket)
        await dispatch(sendBucket(user.token_type, user.access_token));
        navigate('/equipment/feed');
    };

    const handleDelBucket = async () => {
      console.log(123445)
      await dispatch(delBucket(user.token_type, user.access_token));
      navigate('/equipment/feed');
    };
    console.log(bucket)

  
    return (
      <div className='draft-container'>
        <div className='draft-title'>Черновая заявка</div>
        <div className='parameters-modeling-box'>
          <div className='rows-param'>
            {/* <button className='accept-draft-button accept-parameters-button' onClick={redirectToDetail}></button> */}
          </div>
        </div>
        <table className="table-bordered">
          <thead>
            <tr>
              <th>Название</th>
              <th>Количество</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bucket.bucketItems.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.title}</td>
                <td>{equipment.count}</td>
                <td>
                  <button className='del-draft-button' onClick={() => handleRemoveEquipment(equipment.id)}>Удалить</button>
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
    if (user && user.role === 'user') {
      dispatch(getBucket(bucket.draft_id, user.token_type, user.access_token));
    } else {
      navigate('/equipment/feed');
    }
  }, [dispatch]);

  return (
    <div>
      <NavbarTechnicalEquipment />
      <Header breadcrumbs={['Оборудование', 'Корзина']} showCart={false} showApp={true}/>
      <div className="applications-container">
        {bucket.draft_id !== null && (
          <DraftApplicationTable
            bucket={bucket}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;
