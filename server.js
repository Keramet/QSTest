'use strict';
const http       = require('http')
    , express    = require('express')
    , logger     = require('morgan')
    , bodyParser = require('body-parser')

    , userRoute  = require('./routes/user')
    , errHandler = require('./errors/error-handling')
    , db         = require('./db/mongoConf')

    , PORT       =  process.env.PORT || 3000
    , app        = express()
    , server     = http.createServer(app)
    ;


app.set( 'port', PORT );

app.use( express.static(__dirname + '/public') );
app.use( '/libs', express.static(__dirname + '/bower_components') ); 

app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use( '/user', userRoute ); 

app.use( errHandler.get404 ); 
app.use( errHandler.onError );

server.listen(PORT, () => console.log('Listen server on port ' + PORT) );

// module.exports = server;