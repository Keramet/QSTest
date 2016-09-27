'use strict';
const mongoose = require('mongoose');


let ClientSchema = new mongoose.Schema({
    name : { type    : String,
             unique  : true,
             require : true   },
    phone : String,
    email : String,        
    age   : Number
}); 


module.exports = mongoose.model('Client', ClientSchema);