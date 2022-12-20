import React, { useEffect } from 'react';
import './RoomListCard.css';
import roomIcon from '../../../../assets/avatar/gamer.png';
import { useDispatch } from 'react-redux';
import { deleteRoom, exitRoom } from '../../../../actions/roomAction';
import {useNavigate} from 'react-router-dom';

const RoomListCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(()=>{

  // }, [dispatch])
  return (
    <div className='room-card'>
      <div className="room-info" onClick={()=>props.getActiveRoomId(props.name)}>
        <img src={roomIcon} alt="room-avatar" />
        <h3>{props.name}</h3>
      </div>
      <div className="room-menus">
        { props.userId !== props.roomAdmin._id ? <p onClick={()=>dispatch(exitRoom(props.name, props.showAlert))}>Exit</p> :
        <p onClick={()=>dispatch(deleteRoom(props.name, props.showAlert, navigate))}>Delete</p>}
      </div>
    </div>
  )
}

export default RoomListCard