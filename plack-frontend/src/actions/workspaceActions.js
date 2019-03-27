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