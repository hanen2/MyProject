/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcryptjs');
module.exports = {

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
    FirstName: {
    type :'string'

    },
    LastName: {
    type :'string'

    },
    onLine : {
      type: 'boolean' ,
      defaultsTo : false ,
      required: true
    },
   
     avatarFd : {
      type :'string',
      defaultsTo : 'c://sails//voip//.tmp//uploads//user.png'
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
      LastName: inputs.LastName
      
     }).exec(cb);
  },



  attemptLogin: function (inputs, cb) {
 // find user
    User.findOne({
      email: inputs.email,
      password: inputs.password
    })
    .exec(cb);
  },

 

  changeEtatToTrue : function (userId){

User.update({id: userId},{onLine : true}, function(err, users) {
// Error handling
if (err) {
return console.log(err);
// Updated users successfully!
 } else {
console.log("Users updated:", users);
}
});

},

changeEtatToFalse : function (userId){

User.update({id: userId},{onLine : false }, function(err, users) {
// Error handling
if (err) {
return console.log(err);
// Updated users successfully!
 } else {
console.log("Users updated:", users);
}
});

}


/* update: function (inputs, cb) {
 
    User.update({
      
      email: inputs.email,
      password: inputs.password,
      FirstName: inputs.FirstName,
      LastName: inputs.LastName
    
       }).exec(cb);
  },*/

};

