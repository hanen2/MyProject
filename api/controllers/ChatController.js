/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 //Chat controller has to add new messages
    // and to send message socket clients when a new message is arrived.
module.exports = {

	addConv:function (req,res) {
        
        var data_from_client = req.params.all();

        if(req.isSocket && req.method === 'POST'){

            // This is the message from connected client
            // So add new conversation
            Chat.create({ user : req.session.user.FirstName , message : data_from_client.message})
                .exec(function(error,users){
                    console.log(users);
                    Chat.publishCreate({id: users.id, message : users.message , user:req.session.user.FirstName});
                }); 
        }
        else if(req.isSocket){
            // subscribe client to model changes 
            Chat.watch(req.socket);
            console.log( 'User subscribed to ' + req.socket.id );
        }
    }   
};

