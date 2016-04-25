/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    return res.logg({
      email: req.param('email'),
      password: req.param('password'),
      successRedirect: '/welcome',
      invalidRedirect: '/'
    });
  },

  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
   
  
  User.changeEtatToFalse(req.session.user.id);

 req.session.user = null;

    return res.redirect('/');
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {

    // Attempt to signup a user using the provided parameters
    User.signup({
    
      email: req.param('email'),
      password: req.param('password'),
      FirstName: req.param('FirstName'),
      LastName: req.param('LastName'),
    
 
    }, function (err, user) {
   
      if (err) return res.negotiate(err);

 
      req.session.user = user;

       User.changeEtatToTrue(req.session.user.id);
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

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
    User.update({id :req.session.user.id }, {

      

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

  User.findOne(req.session.user.id ).exec(function (err, user){
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


update: function (req, res) {

 User.update({id: req.session.user.id},{
      email: req.param('exampleInputEmail'),
      password: req.param('exampleInputPassword1'),
      FirstName: req.param('FirstName'),
      LastName: req.param('LastName'),
      job: req.param('job'),
      phone: req.param('phone'),
      soc: req.param('soc'),
      

    }, function(err, users) {
        // Error handling
             if (err) {
                 return console.log(err);
              
                      } else {
                      
                         console.log("Users updated:", users);

                         res.redirect('/editProfil');
                         
                        req.session.user = users;
                              }
});
        
    
},



findByName : function(res, req){
  /*var name = req . param ( 'name' ); 
    User . findByName ( name ). done ( function  ( err , users )  { 
      if  ( err )  { 
        res . send ( 400 ); 
      }  else  { 
        res . send ( users ); 
      } 
    }); 
  }*/
},
show: function(req, res) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err || !user) return res.serverError(err);  // !user should be 404
      //res.json(user);
      res.view({user: user});
    });
  },

  showAll: function(req, res) {
    User.find({OnLine: true }, function foundUser(err, users) {
      if (err) return res.serverError(err);
      else {
        res.view({users: users});
      
      }
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

      res.redirect('/user');

    });
  }



};

