'use strict';
const  express  = require('express')
    ,  router   = express.Router()
    ,  passport = require('passport')
    ,  jwt      = require('jwt-simple')
    ,  ErrorAPI = require('../config/error-handling').ErrorAPI
    ,  User     = require('../config/userModel')
    ,  Client   = require('../config/clientModel')
    ,  SECRET   = require('../config/db').secret
;


router.post( '/signup', (req, res, next) => {
    let newUser;

    if ( !req.body.name || !req.body.password ) {
        res.json({ success: false,
                   message: 'NAME and PASSWORD are required' });
    } else {
        newUser = new User({
            name:     req.body.name,
            password: req.body.password
        });
        newUser.save( function (err) {
            if (err) {
                return res.json({ success: false,
                                  message: 'NAME already exists!' });
            } else {
                return res.json({ success: true,
                                  message: 'New user was created.' });
            }
        });
    }
});


router.post( '/login', (req, res, next) => {
    let token;

    User.findOne( {name: req.body.name}, (err, user) => {
        if (err) { return next(err) ;}

        if (!user) {
            res.json({ success: false,
                       message: 'Login failed: user not found' });
        } else {
            user.comparePass( req.body.password, (err, isMatch) => {
                if ( !err && isMatch ) {
                    token = jwt.encode( user, SECRET );
                    res.json({ success: true,
                               message: 'User has logged in',
                               token:   `JWT ${token}` });
                } else {
                    res.json({ success: false,
                               message:   'Login failed: wrong password' });
                }
            })
        }
    });
});


router.get( '/info',
    passport.authenticate( 'jwt', {session: false} ),

    (req, res, next) => {
        let token = getToken(req.headers),
            decoded;

        if (token) {
            decoded = jwt.decode( token, SECRET );

            User.findOne( {name: decoded.name}, (err, user) => {
                if (err) { next(err); }

                if (!user) {
                    return res.status(403).json({ success: false,
                                                  message: 'Access denied: user not found' });
                } else {
                    res.json({ success: true,
                               message: `Welcome, ${user.name}!` });
                }
            });
        } else {
            res.status(403).json({ success: false,
                                   message: 'Access denied: need token' });
        }
    }
);

router.get( '/users',
    passport.authenticate( 'jwt', {session: false} ),
    checkAuth,
    getAllUsers
);

router.get( '/users/:id',
    passport.authenticate( 'jwt', {session: false} ),
    checkAuth,
    getOneUser
);

router.post( '/users/:id',
    passport.authenticate( 'jwt', {session: false} ),
    checkAuth,
    updateUser
);

router.delete( '/users/:id',
    passport.authenticate( 'jwt', {session: false} ),
    checkAuth,
    deleteOneUser
);


router.get( '/clients',
    passport.authenticate( 'jwt', {session: false} ),
    checkAuth,
    getAllClients
);

router.post( '/clients',
    passport.authenticate( 'jwt', {session: false} ),
    checkAuth,
    createClient
);


router.delete( '/clients/:id',
    passport.authenticate( 'jwt', {session: false} ),
    checkAuth,
    deleteOneClient
);


module.exports = router;


//---------  Functions implementation  ----------//

function getToken (headers) {
    let parts;

    if ( headers && headers.authorization ) {
        parts = headers.authorization.split(' ');

        if (parts.length === 2) { return parts[1]; }
        else                    { return null;      }

    } else { return null; }
}


function checkAuth (req, res, next) {
    let token = getToken(req.headers),
        decoded;

    if (token) {
        decoded = jwt.decode( token, SECRET );

        User.findOne( {name: decoded.name}, (err, user) => {
            if (err) { next(err); }

            if (!user) {
                return res.status(403).json({ success: false,
                                              message: 'Access denied: user not found' });
            } else { 
                next();
            }
        });
    } else {
        res.status(403).json({ success: false,
                               message: 'Access denied: need token' });
    }
}


//-------------  User functions  -------------//

function getAllUsers (req, res, next) {
    User.find( (err, users) => {
        if (err) { next(err); }

        res.json(users); 
    });
}

function getOneUser (req, res, next) {
    User.findOne( {_id: req.params.id}, (err, user) => {
        if (err) { next(err); }

        res.json(user); 
    });
}

function updateUser (req, res, next) {
    let id   = req.params.id,
        name = req.body.name,
        age  = req.body.age,
        changes = {};

    if (name) { changes.name = name; }
    if (age)  { changes.age  = age;  }

    User.findByIdAndUpdate( id, changes, {new: true}, (err, user) => {
        if (err) { next(err); }

        res.json(user); 
    });
}

function deleteOneUser( req, res, next) {
    User.remove( {_id: req.params.id}, (err, user) => {
        if (err) { next(err); }

        res.json( user ); 
    });
}


//------------  Client functions  ------------//

function createClient (req, res, next) {
    let newClient = {  name: req.body.name,
                      phone: req.body.phone,
                      email: req.body.email,
                        age: req.body.age  };

    Client.create( newClient, (err, client) => {
        if (err) { next(err); }

        res.json( client ); 
    });
}

function getAllClients (req, res, next) {
    Client.find( (err, data) => {
        if (err) { next(err); }

        res.json( data ); 
    });
}


function deleteOneClient( req, res, next) {
    Client.remove( {_id: req.params.id}, (err, data) => {
        if (err) { next(err); }

        res.json( data ); 
    });
}

