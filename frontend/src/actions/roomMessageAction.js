import { NEW_MESSAGE_FAIL, NEW_MESSAGE_REQUEST, NEW_MESSAGE_SUCCESS, ROOM_MESSAGES_FAIL, ROOM_MESSAGES_REQUEST, ROOM_MESSAGES_SUCCESS, UPDATE_ROOM_MESSAGES_SUCCESS } from '../constants/roomMessageConstants';

export const getAllMessage = (roomId, showAlert) => async (dispatch) => {
    dispatch({ type: ROOM_MESSAGES_REQUEST });
    const response = await fetch('/api/messages/getAllMessages/'+roomId, {
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
        dispatch({ type: ROOM_MESSAGES_SUCCESS, payload: json.messages });
        // let allMessages = document.querySelectorAll("#messages li");
        // allMessages[allMessages.length - 1].scrollIntoView();        
    }
    else{
        dispatch({ type: ROOM_MESSAGES_FAIL });
        showAlert("danger", json.message);
    }
}

export const newMessage = (roomId, message, Socket) => async (dispatch) => {
    dispatch({ type: NEW_MESSAGE_REQUEST });
    const response = await fetch('/api/messages/new', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4000',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ message: message, roomId: roomId })
    })
    const json = await response.json();
    if(json.success){
        dispatch({ type: NEW_MESSAGE_SUCCESS, payload: json.message });
        window.scrollTo(0, document.querySelector("#messages").scrollHeight);
        Socket.emit("new-message", roomId ,json.message);
    }
    else{
        dispatch({ type: NEW_MESSAGE_FAIL, payload: json.message });
    }
}

export const updateMessages = (message) => async (dispatch) => {
    dispatch({ type: UPDATE_ROOM_MESSAGES_SUCCESS, payload: message })
}