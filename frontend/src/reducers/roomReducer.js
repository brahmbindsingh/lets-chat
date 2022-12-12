import {
  CLEAR_ERRORS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  EXIT_ROOM_FAIL,
  EXIT_ROOM_REQUEST,
  EXIT_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  NEW_ROOM_FAIL,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  USER_ROOMS_FAIL,
  USER_ROOMS_REQUEST,
  USER_ROOMS_SUCCESS,
} from "../constants/roomConstants";

export const roomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case USER_ROOMS_REQUEST:
      return {
        loading: true,
        rooms: [],
      };

    case USER_ROOMS_SUCCESS:
      return {
        loading: false,
        rooms: action.payload,
      };

    case USER_ROOMS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case NEW_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ROOM_SUCCESS:
      return {
        loading: false,
        room: action.payload,
      };

    case NEW_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const joinRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case JOIN_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case JOIN_ROOM_SUCCESS:
      return {
        loading: false,
        room: action.payload,
      };

    case JOIN_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const roomInfoReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ROOM_DETAILS_SUCCESS:
      return {
        loading: false,
        room: action.payload,
      };

    case ROOM_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const exitRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case EXIT_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EXIT_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case EXIT_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
