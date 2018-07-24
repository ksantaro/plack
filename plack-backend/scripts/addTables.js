var pg = require('pg');

var connectionString = 'postgres://plack:plack@localhost:5432/plack';

var currentClient = new function() {
    //Create a new instance of client
    var client = new pg.Client(connectionString);	

    this.setTables = function() {
        let promiseSetTables = new Promise(function(resolve, reject) {
            client.connect((err)=> {
                if(!err){
                    console.log('CLIENT CONNECTED TO: '+ connectionString);
                    client.query('CREATE TABLE IF NOT EXISTS users(uid SERIAL PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), username VARCHAR(100), email VARCHAR(100) UNIQUE, password VARCHAR(100))');
                    resolve("tables were added");
                }
            });
        });

        promiseSetTables.then((successMessage) => {
            console.log(successMessage);
            process.exit(0); // exit nodejs
        });
    }
}

currentClient.setTables();    //Establish connection with client and set tables