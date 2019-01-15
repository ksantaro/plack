import axios from 'axios';
import { purgeStoredState } from 'redux-persist';
import storage from 'localforage';

// import { apiHost } from '../config';
const apiHost = "http://localhost:3010" //change on development

// export const LOGIN_REQUEST = 'LOGIN_REQUEST'
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// function requestLogin(creds) {
//   return {
//     type: LOGIN_REQUEST,
//     isFetching: true,
//     isAuthenticated: false,
//     creds
//   }
// }

export const USER_LOGOUT = "USER_LOGOUT";

export const logout = () => (dispatch, getState) => {
  dispatch({type: USER_LOGOUT})
}

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: {token}
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: {error}
})

export const login = (workspace_url, email, password) => (dispatch, getState) => {
  // purgeStoredState({})
  dispatch(logout());
  dispatch(loginStart());
  return axios({
    method: 'post',
    url: `${apiHost}/users/login`,
    data: {
      workspace_url,
      email,
      password,
    }
  }).then((response) => {
    // console.log(response.data);
    const token = response.data.token;
    console.log(token);
    dispatch(loginSuccess(token));
  }).catch((error) => {
    // const {response} = error;
    if (error) {
      // if (specific error) dispatch specificError()
      // console.log(error);
      // console.log(error.response);
      // console.log(error.status);
      // console.log(error.status === 401);
      // console.log(error.response.data);
      if(error.response.status === 401) {
        dispatch(loginError(error.response.data));
      }
      // dispatch(loginError(error.response.data.error));
    }
  });
}