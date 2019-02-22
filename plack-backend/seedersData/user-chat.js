const userChats = [];
// let chatToUser;
let chat_id = 0;
let userChat;

//all the users have a self chat
for (let x = 0; x < 5; x++) {
    for (let num = 0; num < 6; num++) {
        userID = "10" + x + num;
        userChat = {
            chat_id: chat_id,     
            user_id: parseInt(userID),
        }
        userChats.push(userChat);
        chat_id++;
    }
}

// create regular chats within team members
for (let x = 0; x < 5; x++) {
    for (let num = 0; num < 3; num++) {
        userID = "10" + x + num;
        userChat = {
            chat_id: chat_id,
            user_id: parseInt(userID),
        }
        userChats.push(userChat);
    }
    chat_id++;
}

// create a channel
for (let x = 0; x < 5; x++) {
    for (let num = 0; num < 3; num++) {
        userID = "10" + x + num;
        userChat = {
            chat_id: chat_id,
            user_id: parseInt(userID),
        }
        userChats.push(userChat);
    }
    chat_id++;
}

module.exports = userChats;