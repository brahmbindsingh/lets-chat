import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ChatApp.css'
import ChatAppHeader from './ChatAppHeader/ChatAppHeader'
import Messaging from './Messaging/Messaging'
import { getRoomInfo } from '../../../actions/roomAction';
import Spinner from '../Spinner/Spinner'
import io from 'socket.io-client';

const Socket = io();

const ChatApp = (props) => {
  const {room, loading} = useSelector((state)=>state.roomDetails);
  const [socketConnected, setSocketConnected] = useState(false);
  const { user } = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    Socket.on("connected", () => setSocketConnected(true));
    Socket.emit("setup", user._id);
    dispatch(getRoomInfo(props.activeRoomId, Socket));
  }, [props.activeRoomId])
  return (
    <>
    {loading ? <Spinner /> :
      <div className='chat-app'>
          <ChatAppHeader room = {room} />
          <Messaging roomId = {room._id} showAlert = {props.showAlert} Socket = {Socket} />
      </div>
    }
    </>
  )
}

export default ChatApp