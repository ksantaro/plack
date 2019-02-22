const users = [];

let user;
let uniqueID;

for (let workspaceID = 0; workspaceID < 5; workspaceID++) {
    for (let num = 0; num < 6; num++) {
        uniqueID = "10" + workspaceID + num;
        user = {
            user_id: parseInt(uniqueID),
            workspace_id: workspaceID,
            first_name: "first name " + uniqueID,
            last_name: "last name " + uniqueID,
            username: 'username' + uniqueID,
            email: "user" + uniqueID + "@email.com",
            password: "password" + uniqueID,
            createdAt: new Date(),
            updatedAt: new Date(),        
        }
        users.push(user);
    }
}

module.exports = users;