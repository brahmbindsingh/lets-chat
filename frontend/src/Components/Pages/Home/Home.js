import React, { useEffect, useState } from 'react'
import ChatApp from '../../Layout/ChatApp/ChatApp'
import RoomModal from '../../Layout/Modals/RoomModal'
import SideBar from '../../Layout/SideBar/SideBar'
import './Home.css'

const Home = (props) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalType, setModalType] = useState('');
  const toggleModalActive = (value, type) => {
    setModalType(type);
    setModalActive(value);
  }
  const [activeRoomId, setActiveRoomId] = useState('');
  useEffect(()=>{
    if(sessionStorage.getItem('activeRoomId')){
      setActiveRoomId(sessionStorage.getItem('activeRoomId'));
    }
  }, [])
  const getActiveRoomId = (roomId) => {
    sessionStorage.setItem('activeRoomId', roomId);
    setActiveRoomId(roomId);
  }
  return (
    <div className='home-background'>
      <RoomModal modalActive = {modalActive} toggleModalActive = {toggleModalActive} type = {modalType} showAlert = {props.showAlert} />
      <div className="home-container">
        <SideBar toggleModalActive = {toggleModalActive} showAlert = {props.showAlert} getActiveRoomId = {getActiveRoomId} />
        { (activeRoomId) ? <ChatApp showAlert = {props.showAlert} activeRoomId = {activeRoomId} /> : "Select a room to enter"}
      </div>
    </div>
  )
}

export default Home