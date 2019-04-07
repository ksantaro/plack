import axios from 'axios';
export const FETCH_CHATS = "FETCH_CHATS";
export const NEW_CHAT = "NEW_CHAT";

const apiHost = "http://localhost:3010" //change on development type


export const CHANGE_INPUT = "CHANGE_INPUT";

export const changeInput = (id, text) => ({
  type: CHANGE_INPUT,
  payload: {id, text}
});


export const ON_SELECT = "ON_SELECT";

export const onSelect = (e, chat) => ({
  type: ON_SELECT,
  payload: {type: chat.type, index: chat.index},
})


/* GET WORKSPACE */
export const GET_WORKSPACE_START = "GET_WORKSPACE_START";
export const GET_WORKSPACE_SUCCESS = "GET_WORKSPACE_SUCCESS";
export const GET_WORKSPACE_ERROR = "GET_WORKSPACE_ERROR";

export const getWorkspaceStart = () => ({
  type: GET_WORKSPACE_START
});

export const getWorkspaceSuccess = workspace => ({
  type: GET_WORKSPACE_SUCCESS,
  payload: {workspace}
});

export const getWorkspaceError = error => ({
  type: GET_WORKSPACE_ERROR,
  payload: {error}
})

export const getWorkspace = (workspace_url) => (dispatch, getState) => {
  dispatch(getWorkspaceStart());
  return axios({
    method: 'get',
    url: `${apiHost}/workspaces/workspace-url/${workspace_url}`,
  })
  .then((response) => {
    console.log(response.data);
    const workspace = response.data;
    dispatch(getWorkspaceSuccess(workspace));
  })
  .catch((error) => {
    if (error) {
      console.log(error);
      // if (specific error) dispatch specificError()
      // if(error.response.status === 401) {
      //   dispatch(getWorkspaceError(error.response.data));
      // }
    }
  });
}