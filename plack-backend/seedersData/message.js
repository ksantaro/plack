// TODO add messenging between two memebers replying to each other
// Inital Message from one to another
// Subsequenct Messages between users numbered
// Make sure users chatting are in the same team

const messages = [];
let chat_id = 0;
let userID;
let message;
let messageID = 0;

for (let x = 0; x < 5; x++) {
    for (let num = 0; num < 6; num++) {
        userID = "10" + x + num;
        message = {
            message_id: messageID,
            chat_id: chat_id,     
            sender_id: parseInt(userID),
            text: "Hello me " + userID,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        messages.push(message);
        chat_id++;
        messageID++;
    }
}

module.exports = messages;