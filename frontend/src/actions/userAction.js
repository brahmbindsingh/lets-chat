import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

const SERVER_BASE_URL = 'http://localhost:4000'

export const login = (email, password, showAlert, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const response = await fetch('/api/auth/login', {
      method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4000',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ email: email, password: password })
    });
    const json = await response.json();
    if(json.success){
      dispatch({ type: LOGIN_SUCCESS, payload: json.user });
      showAlert("success", json.message);
      navigate('/');
    }
    else{
      dispatch({ type: LOGIN_FAIL, payload: json.message });
      showAlert("danger", json.message);
    }
}

export const register = (name, email, password, showAlert, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4000',
          'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({ name: name, email: email, password: password })
  });
  const json = await response.json();
  if(json.success){
    dispatch({ type: REGISTER_USER_SUCCESS });
    showAlert("success", json.message);
    navigate('/login');
  }
  else{
    dispatch({ type: REGISTER_USER_FAIL, payload: json.message });
    showAlert("danger", json.message);
  }
}

export const getUserDetails = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  const response = await fetch('/api/auth/me', {
    method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4000',
          'Access-Control-Allow-Credentials': 'true'
      },
  });
  const json = await response.json();
  if(json.success){
    dispatch({ type: LOAD_USER_SUCCESS, payload: json.user });
  }
  else{
    dispatch({ type: LOAD_USER_FAIL, payload: json.message });
  }
}

export const logout = (showAlert, navigate) => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4000',
          'Access-Control-Allow-Credentials': 'true'
      },
  });
  const json = await response.json();
  if(json.success){
    dispatch({ type: LOGOUT_SUCCESS });
    showAlert("success", json.message);
    sessionStorage.removeItem('activeRoomId');
    navigate('/');
  }
  else{
    dispatch({ type: LOGOUT_FAIL, payload: json.message });
    showAlert("danger", json.message);
  }
}