import { CLEAR_ERRORS, NEW_MESSAGE_FAIL, NEW_MESSAGE_REQUEST, NEW_MESSAGE_SUCCESS, ROOM_MESSAGES_FAIL, ROOM_MESSAGES_REQUEST, ROOM_MESSAGES_SUCCESS, UPDATE_ROOM_MESSAGES_SUCCESS } from '../constants/roomMessageConstants';

export const roomMessagesReducer = (state = {messages: []}, action) => {
    switch (action.type) {
        case ROOM_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
            
        case ROOM_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.payload,
            };

        case ROOM_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
            };


        case NEW_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
            
        case UPDATE_ROOM_MESSAGES_SUCCESS:
        case NEW_MESSAGE_SUCCESS:
            return {
                loading: false,
                messages: [...state.messages, action.payload],
            };

        case NEW_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}