const chats = [];
// let chatToUser;
let chat_id = 0;
let chat;

// for (let x = 0; x < 5; x++) {
//     for (let num = 0; num < 6; num++) {
//         uniqueID = "10" + x + num;
//         chatToUser = {
//             chat_id: chat_num,     
//             user_id: parseInt(uniqueID),
//         }
//         chats.push(chatToUser);
//         chat_num++;
//     }
// }

// for (let x = 0; x < 5; x++) {
//     for (let num = 0; num < 3; num++) {
//         uniqueID = "10" + x + num;
//         chatToUser = {
//             chat_id: chat_num,     
//             user_id: parseInt(uniqueID),
//         }
//         chats.push(chatToUser);
//     }
//     chat_num++;
// }

//all the users have a self chat
for (let x = 0; x < 31; x++) {
    chat = {
        chat_id: chat_id,
        name: "me",
        is_channel: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    chat_id++;
    chats.push(chat);
}

// create regular chats within team members

for (let x = 0; x < 5; x++) {
    // for (let num = 0; num < 3; num++) {
    //     userID = "10" + x + num;
        chat = {
            chat_id: chat_id,
            name: "", // empty means that the chat name will need to be the others in chat
            is_channel: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    // }
    chat_id++;
    chats.push(chat);
}

// creat channel
for (let x = 0; x < 5; x++) {
    // for (let num = 0; num < 3; num++) {
    //     userID = "10" + x + num;
        chat = {
            chat_id: chat_id,
            name: "Channel " + x,
            is_channel: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    // }
    chat_id++;
    chats.push(chat);
}

module.exports = chats;