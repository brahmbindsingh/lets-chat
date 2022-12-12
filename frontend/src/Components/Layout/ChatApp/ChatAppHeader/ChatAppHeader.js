import React from 'react'
import { useSelector } from 'react-redux'
import chatIcon from '../../../../assets/avatar/gamer.png'
import './ChatAppHeader.css'

const ChatAppHeader = (props) => {
    // const {room} = useSelector((state)=>state.room);
  return (
    <div className='chat-app_header'>
        <div className="room-info">
            <img src={chatIcon} alt="room icon" />
            <h3>{props.room.name}</h3>
        </div>
        <div className='room-controls'>
          <i className="fa-solid fa-phone"></i>
        </div>
    </div>
  )
}

export default ChatAppHeader