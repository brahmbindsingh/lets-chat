import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewRoom, joinRoom } from '../../../actions/roomAction';
import './RoomModal.css';

const RoomModal = (props) => {

  const [roomName, setRoomName] = useState('');
  const dispatch = useDispatch();

  const generateRoomName = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    setRoomName(generateString(6));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(roomName.length<6){
      props.showAlert("danger", "Room Name cannot be less than 5 char");
      return;
    }
    if(roomName.length>10){
      props.showAlert("danger", "Room name cannot be more than 10 char");
      return;
    }
    if(props.type==='create'){
      dispatch(createNewRoom(roomName, props.showAlert, props.toggleModalActive));
    }
    else{
      dispatch(joinRoom(roomName, props.showAlert, props.toggleModalActive));
    }

  }
  
  const handleInput = (e) => {
    setRoomName(e.currentTarget.value);
  }

  return (
    <div className={`closable-area ${props.modalActive ? 'active' : ''}`}>
      <div className="room-modal">
        <div className="modal-header">
          <h3>{props.type==='create' ? 'Create' : 'Join'} Room</h3>
          <i className="fa-solid fa-xmark" onClick={()=>props.toggleModalActive(false)}></i>
        </div>
        <input type="text" placeholder='Enter Name' value={roomName} onChange={handleInput} />
        { props.type === 'create' && <p onClick={generateRoomName}>Suggestions +</p> }
        <div className="buttons">
          <button className='close-btn' onClick={()=>props.toggleModalActive(false)}>Close</button>
          <button className='create-btn' onClick={handleSubmit}>{props.type==='create' ? 'Create' : 'Join'}</button>
        </div>
      </div>
    </div>
  )
}

export default RoomModal