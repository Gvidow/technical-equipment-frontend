import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns-tz';
import { getRequests, completeRequest, rejectRequest } from '../actions/requestActions';
import './TableRow.css';
import { Link } from "react-router-dom";

const TableRow = ({ application }) => {
  const statusAliases = {
    operation: 'Сформирована',
    completed: 'Выполнена',
    canceled: 'Отклонена',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isModerator = (user && user.role === 'moderator') ? true : false;

  const redirectToDetail = () => {
    navigate(`/request/${application.id}`);
    // navigate(`/request/87`); // TODO: replace
  };

  const handleComplete = async () => {
    await dispatch(completeRequest(application.id, user.token_type, user.access_token));
    await dispatch(getRequests(user.token_type, user.access_token));
  };

  const handleReject = async () => {
    await dispatch(rejectRequest(application.id, user.token_type, user.access_token));
    await dispatch(getRequests(user.token_type, user.access_token));
  };

  return (
    <tr className='table-row'>
      <td onClick={redirectToDetail}>{application.id}</td>
      <td onClick={redirectToDetail}>{formatTime(application.created_at)}</td>
      <td onClick={redirectToDetail}>{formatTime(application.formated_at)}</td>
      <td onClick={redirectToDetail}>{formatTime(application.completed_at)}</td>
      <td onClick={redirectToDetail}>{application.moderator_profile?.username}</td>
      {isModerator && (
        <td onClick={redirectToDetail}>{application.creator_profile?.username}</td>  
      )}
      <td onClick={redirectToDetail}>{application.reverted !== undefined ? (application.reverted ? 'Да' : 'Нет') : '-'}</td>
      <td onClick={redirectToDetail} className={`status-cell ${application.status.toLowerCase()}`}>
        {statusAliases[application.status]}
      </td>
      {isModerator && (
        <td>
          {application.status === 'operation' && (
            <>
              <Link onClick={handleComplete} className='form-button complete-button'> Завершить </Link>
              <Link onClick={handleReject} className='form-button reject-button'> Отклонить </Link>
            </>
          )
          }
        </td>  
      )}
    </tr>
  );
};

export default TableRow;

const formatTime = (time) => {
    if (!time) {
        return '-';
    }
    // return new Date(time).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return format(new Date(time), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'UTC' });
}