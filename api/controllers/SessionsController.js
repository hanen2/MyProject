/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {



    index: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    Sessions.find(function foundUsers(err, users) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  },
	
login: function(req, res) {

        // Get password and email from request
        var email = req.param('email');
        var password = req.param('password');

        // No email/password entered
        if(!(email && password)) {
            return res.send('No email or password specified!', 500);
        }
        // Lookup the user in the database
        User.findOne({
            email: email
        }).exec(function (err, user) {

            // Account not found
            
            
                  if (!user) {
        var noAccountError = [{
          name: 'noAccount',
          message: 'The email address ' + req.param('email') + ' not found.'
        }]
        req.session.flash = {
          err: noAccountError
        }
        res.redirect('/');
        return;
      }
            

            // Compare the passwords
            bcrypt.compare(password, user.password, function(err, valid) {
                if(err ) return next(err); 
                
                  if (!valid) {
          var usernamePasswordMismatchError = [{
            name: 'usernamePasswordMismatch',
            message: 'Invalid username and password combination.'
          }]
          req.session.flash = {
            err: usernamePasswordMismatchError
          }
          res.redirect('/');
          return;
        }

                   

                // The user has authenticated successfully, set their session
                req.session.authenticated = true;
                req.session.User = user ;
                req.session.err=null;
              //  Sessions.changeEtatToTrue(user.id);

                User.update({id: req.session.User.id}).set({ onLine: true ,hasRoom : false  })
                .exec(function(err, users){
                  req.session.User.hasRoom =false ;
                    if (err) console.log(err);
                       console.log(users[0].onLine);
 
               //sails.sockets.broadcast('userList', { user: users.username });

           User.publishUpdate(users[0].id, {  
            onLine: true ,
            idUser : users[0].id,
             FirstName : users[0].FirstName , 
              LastName : users[0].LastName ,
               avatarFd : users[0].avatarFd }, req);

                           //return res.ok();
                     });

 
 /*   Sessions.create({id : req.session.User.id  , userLog :  req.session.User }).exec(function(error,users){
                    console.log( users  );
                  
                  Sessions.publishCreate( { id: users.id  , username: users.username });
                });*/

                return res.redirect('/welcome');
            });
        });
    },




    logout: function (req, res) {


   User.update({id: req.session.User.id}).set({ onLine: false }) .exec(function(err, users){
                 
                    if (err) console.log(err);
                       console.log(users[0].onLine);
 
               
          User.publishUpdate(users[0].id, {  
            onLine: false ,
             FirstName : users[0].FirstName , 
              LastName : users[0].LastName ,
               avatarFd : users[0].avatarFd }, req);

                           //return res.ok();
                     });

              
 /*   Sessions.findOne( req.session.User.id , function foundUser (err, user) {
      if (err) return res.serverError(err);

      if (!user) res.serverError(err); //('User doesn\'t exist.');

      Sessions.destroy(user.id, function userDestroyed(err) {
        if (err) return res.serverError(err);
      });
  

    });
*/
 
 req.session.User = null;

    return res.redirect('/');
  },
     subscribe: function(req, res) {
 
    // Find all current users in the user model
    Sessions.find(function foundUsers(err, users) {
      if (err) return next(err);
 
      // subscribe this socket to the User model classroom
      Sessions.subscribe(req.socket);
      console.log("User subscribe ", req.socket);
      // subscribe this socket to the user instance rooms
      Sessions.subscribe(req.socket, users);
 
      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });
  }



};

