/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



    index: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  },
  signup: function (req, res) {

    // Attempt to signup a user using the provided parameters
    var data = {
    
      email: req.param('email'),
      password: req.param('password'),
      FirstName: req.param('FirstName'),
      LastName: req.param('LastName'),
      username: req.param('username'),
    
 
    };
    User.signup(data,function (err, user) {
   
      if (err) {
        return res.negotiate(err);

       console.log( "rrrr"  );
      }
     
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }
      req.session.success ='Signup successful!';
     console.log( user  );
    
      return res.redirect('/');
    });
  },




// function to encode file data to base64 encoded string
/*function base64_encode(file) {
  var fs = require('fs');
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
},*/


  upload: function (req, res) {

 var uploadFile = req.file('uploadFile');
 //convert img 
  //var img = base64_encode(uploadFile);
  uploadFile.upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000
  },function whenDone(err, uploadedFiles) {
    if (err) {
      return res.negotiate(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0){
      return res.badRequest('No file was uploaded');
    }


    // Save the "fd" and the url where the avatar for a user can be accessed
    User.update({id :req.session.User.id }, {

   //    avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),

      // Grab the first file and use it's `fd` (file descriptor)
      avatarFd: uploadedFiles[0].fd
    })
    .exec(function (err){
      if (err) return res.negotiate(err);
      return res.ok();
    });
  });
  res.redirect('/profil');
},
//load image 
load: function (req, res){

  req.validate({
    id: 'string'
  });

  User.findOne(req.session.User.id ).exec(function (err, user){
    if (err) return res.negotiate(err);
    if (!user) return res.notFound();

    // User has no avatar image uploaded.
    // (should have never have hit this endpoint and used the default image)
    if (!user.avatarFd) {
      return res.notFound();
    }

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // Stream the file down
    fileAdapter.read(user.avatarFd)
    .on('error', function (err){
      return res.serverError(err);
    })
    .pipe(res);
  });
},

addDesc : function(req,res ){


User.update({id: req.session.User.id },{desc : req.param('desc')}, function(err, users) {
// Error handling
if (err) {
return console.log(err);
// Updated users successfully!
 } else {console.log('Updated user to have desc ' + users[0].desc);
 req.session.User.desc = users[0].desc; 
  res.redirect('/profil');
}
});


},

update: function (req, res) {

User.update({id: req.session.User.id }, 
      {email: req.param('exampleInputEmail'),
      FirstName: req.param('FirstName'),
      LastName: req.param('LastName'),
      username: req.param('username'),
      job: req.param('job'),
      phone: req.param('phone'),
      soc: req.param('soc')}, function(err, users) {
// Error handling
if (err) {
return console.log(err);
// Updated users successfully!
 } else {

   req.session.User= users[0];
  console.log('Updated user  ' + users[0]);
  res.redirect('/editProfil');
}
});



},
 


findUser : function(req,res){ 


User.findOne({
  id :req.query.id
}).exec(function (err, foundUser){
  if (err) {
    console.log('errr');
  }
  if (!foundUser) {
    console.log('Could not find foundUser, sorry.');
  }

req.session.UserProfil=foundUser;
 res.redirect('/UserProfil');


  

});
},

  showAll: function( res) {
    User.find(function foundUser(err, users) {
      if (err) return res.serverError(err);
      if (!users) res.serverError(err); //('User doesn\'t exist.');
       User.publishCreate({id: users.id});
      
     
    });
  }, 

  //delete user for admin 
   destroy: function (req, res) {
 
    User.findOne(req.param('id'), function foundUser (err, user) {
      if (err) return res.serverError(err);

      if (!user) res.serverError(err); //('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return res.serverError(err);
      });

      res.redirect('/user/index');

    });
  },
    subscribe: function(req, res) {
 
    // Find all current users in the user model
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
 
      // subscribe this socket to the User model classroom
      User.subscribe(req.socket);
 
      // subscribe this socket to the user instance rooms
      User.subscribe(req.socket, users);
 
      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });
  }




};

