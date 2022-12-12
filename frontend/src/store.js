import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { deleteRoomReducer, exitRoomReducer, joinRoomReducer, newRoomReducer, roomInfoReducer, roomsReducer } from './reducers/roomReducer';
import { roomMessagesReducer } from './reducers/roomMessageReducer';

const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    rooms: roomsReducer,
    newRoom: newRoomReducer,
    joinRoom: joinRoomReducer,
    roomDetails: roomInfoReducer,
    exitRoom: exitRoomReducer,
    deleteRoom: deleteRoomReducer,
    roomMessages: roomMessagesReducer,
  })
})

export default store;