'use strict';
const  express  = require('express')
    ,  router   = express.Router()
    ,  ErrorAPI = require('../errors/error-handling').ErrorAPI
    ,  User     = require('../db/userModel')
    ;


router.get( '/', (req, res, next) => {

    User.find( (err, users) => {
        if (err) { next(err); }

        res.json(users); 
    });
});

router.get( '/:id', (req, res, next) => {

    User.findOne( {_id: req.params.id}, (err, user) => {
        if (err) { next(err); }

        res.json(user); 
    });
});

router.post( '/', (req, res, next) => {
    let name = req.body.name,
        age  = req.body.age;

    User.create({
        name: name,
        age:  age
    }, (err, user) => {
        if (err) { next(err); }

        // User.find( (err, users) => {
        //     if (err) { next(err); }

            res.json( user ); 
        // });
    });
});


router.post( '/:id', (req, res, next) => {
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
});


router.delete( '/:id', (req, res, next) => {

    User.remove({_id: req.params.id}, (err, user) => {
        if (err) { next(err); }

        // User.find( (err, users) => {
        //     if (err) { next(err); }

            res.json( user ); 
        // });

    });
});


module.exports = router;
