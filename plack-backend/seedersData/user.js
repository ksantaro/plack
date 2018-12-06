const users = [];

let user;
let uniqueID;

for (let teamID = 0; teamID < 5; teamID++) {
    for (let num = 0; num < 6; num++) {
        uniqueID = "10" + teamID + num;
        user = {
            user_id: parseInt(uniqueID),
            team_id: teamID,
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