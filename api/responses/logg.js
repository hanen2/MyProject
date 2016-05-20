
module.exports = function login(inputs) {
  inputs = inputs || {};
  
  var req = this.req;
  var res = this.res;

  // Look up the user
  User.attemptLogin({
    email: inputs.email,
    password: inputs.password
  }, function (err, user) {
    if (err) return res.negotiate(err);
    if (!user) {

      if (req.wantsJSON || !inputs.invalidRedirect) {
        return res.badRequest('Invalid email/password combination.');
        req.session.err=err;
       // console.log('Invalid email/password combinati')
      }
      
      return res.redirect(inputs.invalidRedirect);
      
    }
  
   User.publishUpdate(user.id, { id: user.id, FirstName: user.FirstName, OnLine: true });
    
  req.session.user = user ;

  User.changeEtatToTrue(req.session.user.id);
    Sessions.create({userLog :  req.session.user }).exec(function(error,users){
                    console.log( users);
                    
                }); 
    if (req.wantsJSON || !inputs.successRedirect) {
      return res.ok();
    }

  
    return res.redirect(inputs.successRedirect);
  });

};





