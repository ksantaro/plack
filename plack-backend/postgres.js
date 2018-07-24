var pg = require('pg');

var connectionURL = 'postgres://plack:plack@localhost:5432/plack';

var currentClient = new function() {
    //Create a new instance of client
    var client = new pg.Client(connectionURL);	

    //Establish connection with client
    this.connect = function() {
        client.connect((err)=> {
            if(!err){
                console.log('connected to : '+ connectionURL);
            }
        });
    }
    //Get client
    this.getClient = function() {
        return client;
    }
}

module.exports = currentClient;