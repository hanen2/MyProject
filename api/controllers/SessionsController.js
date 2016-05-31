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
            if (err || !user) {
                return res.send('Invalid email and password combination!', 500);
            }

            // Compare the passwords
            bcrypt.compare(password, user.password, function(err, valid) {
                if(err || !valid) { 
                  return res.send('Invalid email and password combination!', 500) ;
              req.session.err='Invalid email and password combination' ;
                }
                   

                // The user has authenticated successfully, set their session
                req.session.authenticated = true;
                req.session.User = user ;
                req.session.err=null;
                Sessions.changeEtatToTrue(user.id);

                 User.publishUpdate(user.id, {
                         loggedIn: true,
                        id: user.id,
                        username: user.username,
                        action: ' has logged in.'
                                  });
                    
    Sessions.create({id : req.session.User.id  , userLog :  req.session.User }).exec(function(error,users){
                    console.log( users  );
                  
                  Sessions.publishCreate( { id: users.id  , username: users.username });
                });

                // Redirect to protected area
                return res.redirect('/welcome');
            });
        });
    },




    logout: function (req, res) {


    req.session.err=null;
      Sessions.changeEtatToFalse(req.session.User.id);

              
    Sessions.findOne( req.session.User.id , function foundUser (err, user) {
      if (err) return res.serverError(err);

      if (!user) res.serverError(err); //('User doesn\'t exist.');

      Sessions.destroy(user.id, function userDestroyed(err) {
        if (err) return res.serverError(err);
      });
   User.publishUpdate(user.id, {
                         loggedIn: false,
                        id: user.id,
                        username: user.username,
                        action: ' has logged in.'
                                  });

    });

 
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

