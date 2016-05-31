/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcryptjs');
module.exports = {
schema: true,
  attributes: {

     email: {
      type: 'email',
      required: true,
      unique : true
    },
    password: {
      type: 'string',
      required: true
    },
    username :{
      type: 'string',
      required : true ,
      unique: true
    },

    FirstName: {
    type :'string'

    },
    LastName: {
    type :'string'

    },
    onLine : {
      type: 'boolean' ,
      defaultsTo : false 
    
    },
   
     avatarFd : {
      type :'string',
      defaultsTo : '/images/user.png'
    },

    job :{
      type: 'string',
      defaultsTo: ""
    },
    phone :{
      type: 'string',
      defaultsTo: ''
    },
     soc :{
      type: 'string',
      defaultsTo: ''
    },
    desc :{
      type : 'text'
    }

  },

  beforeCreate: function (values, next) {

    var salt = bcrypt.genSaltSync(10);

    bcrypt.hash(values.password, salt, function (err, hash) {
      if (err) return next(err);
      values.password = hash;
      next();
    });

  },
  

  signup: function (inputs, cb) {
    // Create a user
    User.create({
     
      email: inputs.email,
      password: inputs.password,
      FirstName: inputs.FirstName,
      LastName: inputs.LastName,
      username: inputs.username
      
     }).exec(cb);
  }


};

