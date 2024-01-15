import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(121212121212121212)

  useEffect(() => {
    console.log(2222222222222222222222)
    const handleLogout = async () => {
      await dispatch(logoutUser());
      navigate('/equipment/feed');
    };

    handleLogout();
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Выход</p>
    </div>
  );
};

export default Logout;
