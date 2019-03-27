export const FETCH_CHATS = "FETCH_CHATS";
export const NEW_CHAT = "NEW_CHAT";

const apiHost = "http://localhost:3010" //change on development type


export const ON_CHANGE = "ON_CHANGE";

export const onChange = (inputText, index, type) => ({
  type: ON_CHANGE,
  payload: {inputText, index, type}
});

export const changeInput = (inputText, index, type) => (dispatch, getState) => {
  dispatch(onChange(inputText, index, type));
}