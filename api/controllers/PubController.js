/**
 * PubController
 *
 * @description :: Server-side logic for managing pubs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newPub :function  (req,res) {
		
		var data = req.params.all(); 

		 if (req.isSocket && req.method === 'POST'){
         Pub.create({ 
          body : data.body ,
          creator : data.creator ,
          avatarFd : req.session.User.avatarFd ,
           PostUsers : req.session.User.id}) .exec(function(error,publication){
                console.log( publication  );

               User.findOne({  id : req.session.User.id}).exec(function (err, user){
  if (err) {
    console.log('errr');
  }
  if (!user) {
    console.log('Could not find user, sorry.');
  }
  var len = user.pubs.length ;
  
       User.update({id: user.id}).set({ pubs : publication })
                .exec(function(err, users){
                    if (err) console.log(err);
                   // console.log(users);
                    
             });
});
         
                Pub.publishCreate( {  body : publication.body , 
                  id : publication.id ,
                  creator : publication.creator,
                  avatarFd : publication.avatarFd,
                   PostUsers : publication.PostUsers });
             
                     });
		 }
	}
};

