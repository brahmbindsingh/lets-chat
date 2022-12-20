import { DELETE_ROOM_FAIL, DELETE_ROOM_REQUEST, DELETE_ROOM_SUCCESS, EXIT_ROOM_FAIL, EXIT_ROOM_REQUEST, EXIT_ROOM_SUCCESS, JOIN_ROOM_FAIL, JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, NEW_ROOM_FAIL, NEW_ROOM_REQUEST, NEW_ROOM_SUCCESS, ROOM_DETAILS_FAIL, ROOM_DETAILS_REQUEST, ROOM_DETAILS_SUCCESS, USER_ROOMS_FAIL, USER_ROOMS_REQUEST, USER_ROOMS_SUCCESS } from "../constants/roomConstants"

export const getAllRooms = (keyword = '') => async (dispatch) => {
    dispatch({ type: USER_ROOMS_REQUEST });
    const response = await fetch(`/api/room/list?keyword=${keyword}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4000',
            'Access-Control-Allow-Credentials': 'true'
        },
    })
    const json = await response.json();
    if(json.success){
        dispatch({ type: USER_ROOMS_SUCCESS, payload: json.rooms });
    }
    else{
        dispatch({ type: USER_ROOMS_FAIL, payload: "Something went wrong" });
    }
}

export const createNewRoom = (roomId, showAlert, toggleModalActive) => async (dispatch) => {
    dispatch({ type: NEW_ROOM_REQUEST });
    const response = await fetch('/api/room/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4000',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ name: roomId })
    })
    const json = await response.json();
    if(json.success){
        dispatch({ type: NEW_ROOM_SUCCESS, payload: json.roomId });
        toggleModalActive(false);
        showAlert("success", json.message);
    }
    else{
        dispatch({ type: NEW_ROOM_FAIL, payload: json.message });
        showAlert("danger", json.message);
    }
}

export const joinRoom = (roomId, showAlert, toggleModalActive) => async (dispatch) => {
    dispatch({ type: JOIN_ROOM_REQUEST });
    const response = await fetch('/api/room/join', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4000',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ name: roomId })
    })
    const json = await response.json();
    if(json.success){
        dispatch({ type: JOIN_ROOM_SUCCESS, payload: json.room });
        toggleModalActive(false);
        showAlert("success", json.message);
    }
    else{
        dispatch({ type: JOIN_ROOM_FAIL, payload: json.message });
        showAlert("danger", json.message);
    }
}

export const getRoomInfo = (roomId, Socket) => async (dispatch) => {
    dispatch({ type: ROOM_DETAILS_REQUEST });
    const response = await fetch('/api/room/'+roomId, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4000',
            'Access-Control-Allow-Credentials': 'true'
        },
    })
    const json = await response.json();
    if(json.success){
        dispatch({ type: ROOM_DETAILS_SUCCESS, payload: json.room });
        Socket.emit("join room", roomId);
    }
    else{
        dispatch({ type: ROOM_DETAILS_FAIL, payload: json.message });
    }
}

export const exitRoom = (roomId, showAlert) => async (dispatch) => {
    dispatch({ type: EXIT_ROOM_REQUEST });
    const response = await fetch('/api/room/'+roomId, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4000',
            'Access-Control-Allow-Credentials': 'true'
        },
    })
    const json = await response.json();
    if(json.success){
        dispatch({ type: EXIT_ROOM_SUCCESS });
        showAlert("success", json.message)
    }
    else{
        dispatch({ type: EXIT_ROOM_FAIL, payload: json.message });
        showAlert("danger", json.message)
    }
}

export const deleteRoom = (roomId, showAlert, navigate) => async (dispatch) => {
    dispatch({ type: DELETE_ROOM_REQUEST });
    const response = await fetch('/api/room/'+roomId, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4000',
            'Access-Control-Allow-Credentials': 'true'
        },
    })
    const json = await response.json();
    if(json.success){
        dispatch({ type: DELETE_ROOM_SUCCESS });
        if(sessionStorage.getItem('activeRoomId')===roomId){
            sessionStorage.removeItem('activeRoomId');
        }
        navigate("/")
        showAlert("success", json.message)
    }
    else{
        dispatch({ type: DELETE_ROOM_FAIL, payload: json.message });
        showAlert("danger", json.message)
    }
}