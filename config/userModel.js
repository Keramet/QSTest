'use strict';
const mongoose = require('mongoose')
    , bcrypt   = require('bcryptjs')
;


let UserSchema = new mongoose.Schema({
    name: { type    : String,
            unique  : true,
            require : true   },

    password: { type    : String,
                require : true   },

    age: Number
}); 


UserSchema.pre( 'save', function (next) {
    let user = this;

    if ( user.isModified('password') || user.isNew ) {

        bcrypt.genSalt(10, function (err, salt) {
            if (err) { return next(err); }

            bcrypt.hash( user.password, salt, (err, hash) => {
                if (err) { return next(err); }

                user.password = hash;
                next();
            });
        }); 

    } else { return next(); }
});


UserSchema.methods.comparePass = function (pass, cb) {
    bcrypt.compare( pass, this.password, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
}


module.exports = mongoose.model('User', UserSchema);
