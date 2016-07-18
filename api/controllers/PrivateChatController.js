/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

     privateMsg : function(req,res){

   var datFromClient =req.params.all();
if (req.isSocket && req.method === 'POST'){
      //console.log(datFromClient.to)
PrivateChat.findOne(  { $or: [{ idOwners : req.session.User.id + ' ' +datFromClient.to},
  { idOwners :datFromClient.to + ' ' + 
  req.session.User.id}]}   ).populate('owners').exec(function(err, chat) {
if (!chat || err) {console.log('not found')}
else {
    var tab={
    body : datFromClient.msg,
    from : req.session.User.id,
    avatarFd : req.session.User.avatarFd,
  }
  chat.msgs.push( tab );
   chat.save(function(err){
     // something here
   });
   
    PrivateChat.message(chat.id, {
        to : datFromClient.to ,
        from:  req.session.User.id,
        msg: datFromClient.msg,
        avatarFd :  req.session.User.avatarFd
      });
}
});
}
     
    }



	/*  private: function(req, res) {
   
   var data = req.params.all();
   console.log(data);
   if (req.isSocket && req.method === 'POST') {
    User.findOne(req.session.User.id).exec(function(err, sender) {
      // Publish a message to that user's "room".  In our app, the only subscriber to that
      // room will be the socket that the user is on (subscription occurs in the onConnect
      // method of config/sockets.js), so only they will get this message.
    //Chat.subscribe(req.socket);
    Chat.create(data)
                .exec(function(error, data) {
                    console.log(data);
                    Message.publishCreate({ 
                      id: data.id, 
                         
                      msg: data.msg,
                      To: data.to,
                      
                    });
                });
      Chat.message(data.to, {
        from: sender.username,
        msg: req.param('msg')
      });

    });
   } else if(req.isSocket) console.log('user socket id',req.socket.id) ;

    

  }*/
};

