import axios from 'axios';
import { purgeStoredState } from 'redux-persist';
import storage from 'localforage';

const apiHost = "http://localhost:3010" //change on development type

/* USER LOGOUT */
export const USER_LOGOUT = "USER_LOGOUT";

export const logout = () => (dispatch, getState) => {
  dispatch({type: USER_LOGOUT})
}

/* LOGIN */
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

export const login = (workspace_url, username, password) => (dispatch, getState) => {
  dispatch(logout()); //resets the user state
  dispatch(loginStart());
  return axios({
    method: 'post',
    url: `${apiHost}/users/login`,
    data: {
      workspace_url,
      username,
      password,
    }
  })
  .then((response) => {
    const token = response.data.token;
    dispatch(loginSuccess(token));
  })
  .catch((error) => {
    if (error) {
      // if (specific error) dispatch specificError()
      if(error.response.status === 401) {
        dispatch(loginError(error.response.data));
      }
    }
  });
}

/* GET CURRENT USER */
export const GET_CURRENT_USER_START = "GET_CURRENT_USER_START";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_ERROR = "GET_CURRENT_USER_ERROR";

export const getCurrentUserStart = () => ({
  type: GET_CURRENT_USER_START
});

export const getCurrentUserSuccess = (userData, isAuthenticated) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: {userData, isAuthenticated}
});

export const getCurrentUserError = error => ({
  type: GET_CURRENT_USER_ERROR,
  payload: {error}
})

export const getCurrentUser = (token) => (dispatch, getState) => {
  dispatch(getCurrentUserStart());
  return axios({
    method: 'get',
    url: `${apiHost}/users/isAuthenticated`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then((response) => {
    const userData = response.data.userData.user;
    const isAuthenticated = response.data.isAuthenticated;
    dispatch(getCurrentUserSuccess(userData, isAuthenticated));
  })
  .catch((error) => {
    if (error) {
      // if (specific error) dispatch specificError()
      console.log(error);
      if(error.response && error.response.status === 401) {
        dispatch(getCurrentUserError(error.response.data));
      }
    }
  });
}

/* Create User */
export const CREATE_USER_START = "CREATE_USER_START";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";

export const createUserStart = () => ({
  type: CREATE_USER_START
});

export const createUserSuccess = (userData, isAuthenticated) => ({
  type: CREATE_USER_SUCCESS,
  payload: {userData, isAuthenticated}
});

export const createUserError = error => ({
  type: CREATE_USER_ERROR,
  payload: {error}
})

// workspace_url, workspace_name, username, email, password

export const createUser = (workspace, username, email, password) => (dispatch, getState) => {
  //workspace_url cannot cause an error since it is checked in frontend
  dispatch(createUserStart());
  console.log(workspace);
  return axios({
    method: 'post',
    url: `${apiHost}/users/create`,
    data: {
      workspace,
      username,
      email,
      password,
    }
  })
  .then((response) => {
    console.log(response);
    const {newUser, workspace, token} = response.data;
    dispatch(loginSuccess(token))
    // dispatch(login(workspace.workspace_url, newUser.username, newUser.password)) //will need to convert unhash passwords first
  })
  .catch((error) => {
    if (error) {
      console.log(error);
      if(error.response && error.response.status === 401) {
        dispatch(createUserError(error.response.data));
      }
    }
  });
}