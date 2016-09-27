'use strict';
const JwtStrategy = require('passport-jwt').Strategy
    , ExtractJwt  = require('passport-jwt').ExtractJwt
    , User        = require('./userModel')
    , SECRET_KEY  = require('./db').secret
;

module.exports = function (passport) {
    let params = {};
    
    params.jwtFromRequest = ExtractJwt.fromAuthHeader();
    params.secretOrKey    = SECRET_KEY;
    
    passport.use( new JwtStrategy( params, (jwtP, done) => {
        User.findOne( {id: jwtP.id}, (err, user) => {
            if (err)  { return done(err, false); }

            if (user) { done(null, user ); }
            else      { done(null, false); }
        });
    }) );
}