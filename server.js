'use strict';
const http      = require('http'),
    express     = require('express'),
    path        = require('path'),

    logger      = require('morgan'),
    bodyParser  = require('body-parser'),
    passport    = require('passport'),

    apiRoute    = require('./routes/api'),
    errHandler  = require('./config/error-handling'),
    DB          = require('./config/mongoConf'),

    app         = express(),
    server      = http.createServer( app ),
    PORT        = process.env.PORT || 3000
;

app.set( 'port', PORT );

app.use( express.static(path.join(__dirname, 'public')) );
app.use( '/libs', express.static(path.join(__dirname, 'bower_components')) ); 

app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use( passport.initialize() );
require('./config/passport')(passport);

app.use( '/api',  apiRoute  ); 

app.use( errHandler.get404 ); 
app.use( errHandler.onError );

server.listen( PORT, ()=> console.log(`Server 'localhost' is listening on port....... [ ${PORT} ]`) );


module.exports = server;
