/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {



    /*index: function(req, res, next) {

   
    User.find(function foundusers(err, users) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  },*/
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
    User.publishCreate(user);

// create all PrivateChat
    User.find(function foundusers(err, all) {
      if (err) return next(err);
else {

//console.log(all)
_.each(all, function(owner) { 

PrivateChat.CreateChat( {owner , user} ,function(error,chat){
     if (error ) {console.log('errr creation privatechat')}
      else {
         console.log(chat);
       chat.owners.add([owner.id , user.id]) ;
console.log(owner.id) ;
  chat.save(function(err) {});
      }
     
  
              } );
  });
}

    });
    
   res.redirect('/AllUsers');
User.publishCreate({ id : user.id,
 email : user.email ,
  username : user.username , 
  FirstName : user.FirstName , 
  LastName : user.LastName , 
  password : user.password  })
           
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
      phone: req.param('phone')}, function(err, users) {
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
  id :req.params['id']
}).exec(function (err, foundUser){
  if (err) {
    console.log('errr');
  }
  if (!foundUser) {
    console.log('Could not find foundUser, sorry.');
    res.redirect('/search')
  }

else {
  req.session.UserProfil=foundUser;
 res.redirect('/UserProfil/'+ foundUser.id); 
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
      
  /* User.publishUpdate(users[0].id, {  
            onLine: false ,
             FirstName : users[0].FirstName , 
              LastName : users[0].LastName ,
               avatarFd : users[0].avatarFd }, req);*/
      res.redirect('/AllUsers');

    });
  },

  EditPassw : function(req,res){

    var lastpassword =req.param('Lastpassword') ;
    var newPassword =req.param('password') ;

    var salt = bcrypt.genSaltSync(10);

    bcrypt.compare(lastpassword, req.session.User.password, function(err, valid) {
        if (err) return next(err);

        // If the password from the form doesn't match the password from the database...
        if (!valid) {
        
          console.log('mahomch egaux') ;
        }
        if (valid ){
          console.log('gad gad');
         
          console.log(req.session.User.password) ;
           bcrypt.hash(newPassword, salt, function (err, hashnew) {
            User.update({id: req.session.User.id}).set({ password: hashnew })
                .exec(function(err, users){
                    if (err) console.log(err);
                    
              console.log('password Updated');
              
                res.redirect('/editProfil');
                     });

              });
        }

    
});



 

  },
    subscribe: function(req, res) {
 

 if (!req.isSocket) { console.log('it is not socket request ') ;}
    // Find all current users in the user model
   else {

     User.find(function foundUsers(err, users) {
      if (err) return next(err);
 
      // subscribe this socket to the User model classroom
     // User.subscribe(req.socket);


  
      // subscribe this socket to the user instance rooms
     User.subscribe(req.socket,users);
     //console.log('hahom lkoll');
      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });

   } 
  }

};

