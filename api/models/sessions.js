/**
 * Sessions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
 userLog :{
   required : true
 },

  },
    changeEtatToTrue : function (userId){

User.update({id: userId},{onLine : true }, function(err, users) {
// Error handling
if (err) {
return console.log(err);
// Updated users successfully!
 } else {
console.log("onLine true ");
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
console.log("onLine false ");
}
});

}
};
