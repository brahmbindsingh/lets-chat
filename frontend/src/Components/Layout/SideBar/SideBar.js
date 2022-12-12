import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userAction';
import './SideBar.css';

import SideBarHeader from './Header/SideBarHeader';
import Spinner from '../Spinner/Spinner';
import { getAllRooms } from '../../../actions/roomAction';
import RoomListCard from './RoomListCard/RoomListCard';

const SideBar = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector( (state)=>state.user );
    const [keyword, setKeyword] = useState('');
    const handleInput = (e) => {
        setKeyword(e.currentTarget.value);
    }
    const { loading, rooms } = useSelector( (state) => state.rooms );
    useEffect(()=>{
        dispatch(getAllRooms(keyword));
    }, [dispatch, keyword])

  return (
    <div className='sidebar-container'>
        <SideBarHeader name = {user.name} showAlert = {props.showAlert} />
        <div className="room-buttons">
            <button className="create-room" onClick={()=>props.toggleModalActive(true, 'create')}>
                <i className="fa-solid fa-plus"></i>
                <span>Create Room</span>
            </button>
            <button className='join-room' onClick={()=>props.toggleModalActive(true, 'join')}>
                <span>Join Room</span>
            </button>
        </div>
        <input type="text" placeholder='Search' value={keyword} onChange = {handleInput} />
        <ul className="rooms-list">
            {
                loading
                ? <Spinner /> 
                : rooms.map((el)=>{
                    return <li key={el._id}><RoomListCard showAlert = {props.showAlert} userId = {user._id} roomAdmin = {el.roomAdmin} name = {el.name} getActiveRoomId = {props.getActiveRoomId} /></li>
                })
            }
        </ul>
    </div>
  )
}

export default SideBar