/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {
	
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
                req.session.user = user ;
                req.session.err=null;
           Sessions.changeEtatToTrue(req.session.user.id);

                 User.publishUpdate(user.id, {
                         loggedIn: true,
                        id: user.id,
                        username: user.username,
                        action: ' has logged in.'
                                  });
                    
    Sessions.create({id : req.session.user.id  , userLog :  req.session.user }).exec(function(error,users){
                    console.log( users  );
                  
                  Sessions.publishCreate( { id: users.id  , userLog: users });
                });

                // Redirect to protected area
                return res.redirect('/welcome');
            });
        });
    },




    logout: function (req, res) {


    req.session.err=null;
    Sessions.findOne( req.session.user.id , function foundUser (err, user) {
      if (err) return res.serverError(err);

      if (!user) res.serverError(err); //('User doesn\'t exist.');

      Sessions.destroy(user.id, function userDestroyed(err) {
        if (err) return res.serverError(err);
      });

    });

 Sessions.changeEtatToFalse(req.session.user.id);
 req.session.user = null;

    return res.redirect('/');
  }


};

