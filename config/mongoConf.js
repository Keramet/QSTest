'use strict';
const mongoose = require('mongoose'),
	  CONN_STR = require('./db').db
;

mongoose.connect( CONN_STR );

// const conn = module.exports = mongoose.connection;

let conn = mongoose.connection;
let isDB;

conn
    .on( 'connected',  ()=> {
    	isDB = true;
    	console.log(`Connecting to mongoDB....... [ OK ]  \nMongo....... [ ${CONN_STR} ]`);
    })
    .on( 'error',       err=> console.log(`MongoDB connecting error:\n ***  ${err}`) ) 
    .on( 'disconnected', ()=> {
    	console.log(`No DB-connection to....... [ '${CONN_STR}' ]`);
    	isDB = false;
    	// conn._isDisconnected = true;
    });


// If the Node process ends, close the Mongoose connection 
process.on( 'SIGINT', ()=> {
    conn.close( ()=> { 
        console.log(`App has terminated! Connection to mongoDB closed.`); 
        process.exit(0); 
    }); 
});

// module.exports = conn;


// module.exports.check = app => {
// 	console.log("module.exports.check...");

// 	if (isDB) { app.set('isDB', true ); }
// 	else      { app.set('isDB', false); }
// };
