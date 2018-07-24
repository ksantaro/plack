var pg = require('pg');

var connectionString = 'postgres://plack:plack@localhost:5432/plack';

var currentClient = new function() {
    //Create a new instance of client
    var client = new pg.Client(connectionString);	

    this.setTables = function() {
        // let promiseSetTables = new Promise(function(resolve, reject) {
            client.connect((err)=> {
                if(!err){
                    console.log('CLIENT CONNECTED TO: '+ connectionString);
                    client.query('CREATE TABLE IF NOT EXISTS channels(chid SERIAL PRIMARY KEY, name VARCHAR(50), creatorid INT)');
                    client.query('CREATE TABLE IF NOT EXISTS users(uid SERIAL PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), username VARCHAR(100), email VARCHAR(100) UNIQUE, password VARCHAR(100))');
                    client.query('CREATE TABLE IF NOT EXISTS user_channels(uid INT REFERENCES users, chid INT references channels)');
                    client.query('CREATE TABLE IF NOT EXISTS friends(ufid SERIAL PRIMARY KEY, uid1 INT REFERENCES users, uid2 INT REFERENCES users)');
                    client.query('CREATE TABLE IF NOT EXISTS direct_messages(ufid INT REFERENCES friends, text VARCHAR(300), date DATE, senderid INT REFERENCES users)');
                    client.query('CREATE TABLE IF NOT EXISTS channel_messages(chid INT REFERENCES channels, text VARCHAR(300), date DATE, senderid INT REFERENCES users)')
                        .then(res => {
                            console.log("tables were added") 
                            process.exit(0)
                        });
                }
            });
    }
}

currentClient.setTables();    //Establish connection with client and set tables