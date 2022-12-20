import React, { useEffect, useState } from 'react'
import ChatAppFooter from '../ChatAppFooter/ChatAppFooter'
import './Messaging.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessage, newMessage, updateMessages } from '../../../../actions/roomMessageAction';
import Spinner from '../../Spinner/Spinner';
import MessageCard from '../MessageCard/MessageCard';
import { UPDATE_ROOM_MESSAGES_SUCCESS } from '../../../../constants/roomMessageConstants';
// import io from 'props.Socket.io-client';

// const Socket = io();

const Messaging = (props) => {

  const dispatch = useDispatch();
  const { messages, loading } = useSelector( (state) => state.roomMessages );

  useEffect(()=>{
    if(props.roomId !== undefined)
      dispatch(getAllMessage(props.roomId, props.showAlert))
  }, [dispatch])

  useEffect(()=>{
    props.Socket.on("get-message", (newMessage)=>{
      // setChats([...chats, newMessage]);
      // dispatch(getAllMessage(props.roomId, props.showAlert));
      dispatch(updateMessages(newMessage));
    })
  }, [props.Socket])

  return (
    <div className='messages-area'>
      <ul id="messages">
        { loading ? <Spinner /> : messages.map((el)=>{
          return <li key={el._id}><MessageCard msg = {el.msg} from = {el.from} /></li>
        })}
      </ul>
      <ChatAppFooter roomId = {props.roomId} Socket = {props.Socket} />
    </div>
  )
}

export default Messaging