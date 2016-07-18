/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
newRoom  : function (req,res) {


   Room.create({ title: req.param('nameRoom') ,
     descRoom : req.param('descRoom') ,
     creatorName : req.session.User.FirstName + ' '+req.session.User.LastName ,
     creatorId : req.session.User.id ,
    actif : true }).exec(function(error,chatroom){
      console.log(chatroom)
            
       res.redirect('/Rooms/' + chatroom.id);
       
  User.update({id: req.session.User.id}).set({ RoomUsers : chatroom.id , hasRoom : true})
                .exec(function(err, users){
                    if (err) console.log(err);
                  //  console.log(users);
                  req.session.User.hasRoom = true ;
                    
    });

Notif.create({ obj: 'the Class Room '+ chatroom.title+ ' has started now' ,
 id_room : chatroom.id ,
  desc : ' this Class Room has created by ' + chatroom.creatorName +'.' + chatroom.descRoom})
    .exec(function(error,notif){
                console.log( notif  );
                Room.publishCreate( { 
          creatorName : chatroom.creatorName , 
          title : chatroom.title ,
          actif : true,
          obj : notif.obj , 
          id : notif.id ,id_room : chatroom.id, createdAt : chatroom.createdAt });

                     });
          
              
                });


	
},
render: function(req, res) {

     Room.findOne({ id :req.params['id'] }).exec(function (err, chatroom){
User.findOne({ id :req.session.User.id }).exec(function (err, user){
  console.log(user)
});
  if(err) console.log('errrr')
          if (!chatroom)
          {
              res.redirect('/');
          }
          else
          {
            req.session.Room = chatroom ;
           
               Room.findOne({id : chatroom.id }).populate('users' ).exec(function(err, rooms) {
 
                  //console.log(rooms);
                  req.session.usersRoom = rooms.users ;
                  //console.log('nbre', rooms.users.length);
                  console.log('userss elli f session', req.session.usersRoom);

                   });
                  Room.findOne({id : chatroom.id }).populate('messages' ).exec(function(err, rooms) {
 
               //   console.log(rooms);
                  req.session.msgRoom = rooms.messages ;
                  //console.log('nbre', rooms.users.length);
                  console.log('userss elli f session', req.session.msgRoom);
                   res.view('user/Room', {
                  chatroom: chatroom
              });
   
                   });
                 
                 

          }

});
    },
    newMsg : function(req,res){


var datFromClient =req.params.all();

     Room.findOne({ id :datFromClient.id_room}).exec(function (err, chatroom){

          if (!chatroom || err)
          {
              res.redirect('/');
          }

      Message.create({body: datFromClient.body ,
        from : datFromClient.FirstName + ' '+ datFromClient.LastName ,
        rooms : datFromClient.id_room }).exec(function(error,msg){
                    console.log( msg  );
            Message.publishCreate({ 
                      id: msg.id, 
                      id_room: msg.rooms, 
                      body: msg.body,
                      
                      from:msg.from
                    });
     
        });
 });

  
    },
 

join : function (req,res){

       Room.findOne({ id :req.params['id'] }).exec(function (err, chatroom){

          if (!chatroom || err)
          {
              res.redirect('/');
          }
      if(chatroom.actif){
              User.update({id: req.session.User.id}).set({ RoomUsers : chatroom.id , hasRoom : true })
                .exec(function(err, users){
                    if (err) console.log(err);
          req.session.User.hasRoom = true ;
          User.publishUpdate(users[0].id, { 
             inRoom : true,
             id_room : users[0].RoomUsers,
             FirstName : users[0].FirstName , 
              LastName : users[0].LastName ,
              idUs : users[0].id ,
               avatarFd : users[0].avatarFd }, req);

                res.redirect('/Rooms/'+chatroom.id ) ;
             
    });
      }
      else {
        console.log('saye kemlet') ;
        req.session.StatusRoom = 'this room finished' ;
        res.redirect('/FinishedRoom');
      } 
        });


},

finish : function(req,res){


 Room.update({id :req.params['id']}).set({ actif : false })
                .exec(function(err, room){
                    if (err) console.log(err);
                 console.log(room[0].actif);

                     Room.publishUpdate(room[0].id, { 
             id_room : room[0].id, 
               actif : false }, req);
req.session.Room =null ;

 User.update({id :req.session.User.id}).set({ hasRoom : false })
                .exec(function(err, user){

if (err) console.log('errr');
else {
  console.log('user hasRoom false ');
     req.session.User.hasRoom = false ;
}

                });
Notif.create({ obj: 'the Class Room '+ room[0].title+ ' has finished now' , id_room :room[0].id ,
desc : ''})
    .exec(function(error,notif){
                console.log( notif  );
                Notif.publishCreate( { 
       
          actif : true,
          obj : notif.obj , 
          id : notif.id ,id_room : room[0].id });

                     });
                     res.redirect('/welcome')
                    
    });
      

},
leave: function(req,res){

       Room.findOne({ id :req.params['id'] }).exec(function (err, chatroom){

          if (!chatroom || err)
          {
              res.redirect('/');
          }
      if(chatroom.actif){

              User.update({id: req.session.User.id}).set({ RoomUsers : null , hasRoom : false })
                .exec(function(err, users){
                    if (err) console.log(err);
          req.session.User.hasRoom = false ;
          User.publishUpdate(users[0].id, { 
               inRoom : false,
             id_room : users[0].RoomUsers,
             FirstName : users[0].FirstName , 
              LastName : users[0].LastName ,
              idUs : users[0].id ,
               avatarFd : users[0].avatarFd }, req);

                res.redirect('/welcome' ) ;
             
    });
      }
     
        });


}



};

