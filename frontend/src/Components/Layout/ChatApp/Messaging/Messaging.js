import React, { useEffect, useState } from 'react'
import ChatAppFooter from '../ChatAppFooter/ChatAppFooter'
import './Messaging.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessage } from '../../../../actions/roomMessageAction';
import Spinner from '../../Spinner/Spinner';
import MessageCard from '../MessageCard/MessageCard';

const Messaging = (props) => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector( (state) => state.roomMessages );
  useEffect(()=>{
    if(props.roomId !== undefined)
      dispatch(getAllMessage(props.roomId, props.showAlert))
      
  }, [dispatch])
  const [chat, setChat] = useState(messages);
  const updateChat = (value) => {
    setChat([...chat, value]);
  }
  return (
    <div className='messages-area'>
      <ul id="messages">
        { loading ? <Spinner /> : messages.map((el)=>{
          return <li key={el._id}><MessageCard msg = {el.msg} from = {el.from} /></li>
        })}
      </ul>
      <ChatAppFooter roomId = {props.roomId} updateChat = {updateChat} />
    </div>
  )
}

export default Messaging