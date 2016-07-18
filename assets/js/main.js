//************************
  $('#CreateRoom').click(function(){
    document.getElementById('light').style.display='block';
      document.getElementById('fade').style.display='block';
    console.log('clicked')
  })


  var messageDiv = $('#messages'),

  select = $('#users-list'),
   newMessage = $('#new'),
   id_room = $('#id_room'),
   
   FirstName = $('#Name1'),
   LastName = $('#Name2'),
    chatWindow = $('#chat'),
    userList = $('#users'),
    userListRoom = $('#usersInRoom'),
    notifList = $('#notifList ul'),
    send = $('#send-message');   
  var idUserTo  ;
  var idSession= $('#idSession').val();
   var nameUserTo ;
  

  // as soon as this file is loaded, connect automatically,
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  io.socket.on('connect', function socketConnected() {



    // listen for Notif of finished room
     io.socket.on('notif' , function (msg){
    console.log(msg.verb );
  if(msg.verb==='created'){

    $( "#notif" ).append('<span class="badge badge-success pull-right" >  1  </span>');
   
   
  
   notifList.append(' <li id="notif-' + msg.data.id + '"> <a href="/notifs/'+msg.data.id+'"> <div class="task-icon badge badge-success"><i class="icon-user">'
    +'</i></div> '
       +'<span class="badge badge-roundless badge-default pull-right">1min ago</span>'
     +'<p class="task-details">'+ msg.data.obj +'</p> </li>') ;



  Command: toastr["info"](msg.data.obj)

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
  }
   });
   // listen for msg from clients
   io.socket.on('message' , function (msg){
    console.log(msg.verb );
       if(id_room.val()===msg.data.id_room){   
        console.log('new msg ',msg)
     messageDiv.append(
      '<p><strong>' + msg.data.from + ': </strong> ' + msg.data.body
      + '<span class="time"></span>'
      + '</p>'
    );
    }
   });

io.socket.on('room',function(msg){
  console.log(msg);
 
if(msg.data.actif){
 
    
 $('#roomList').append(' <div id="room-'+msg.data.id_room +' " ><a href="/Rooms/'+msg.data.id_room+'">  <div class="inbox-item">'
       +'<div class="inbox-item-img"><img src="/images/teacher-trainig.png" class="img-circle" alt=""></div>'
         +'<p class="inbox-item-author">'+msg.data.title+'</p>'
          +'<p class="inbox-item-text">created by '+ msg.data.creatorName +'</p>'
        +'<p class="inbox-item-date">'+timediff(msg.data.createdAt)+'</p> </div> </a> <div>') ;
        console.log('notif created ',msg) ;
   // alert(msg.data.obj) ;
   
// show notif
  $( "#notif" ).append('<span class="badge badge-success pull-right" >  1  </span>');
   
   
  
   notifList.append(' <li id="notif-' + msg.data.id + '"> <a href="/notifs/'+msg.data.id+'"> <div class="task-icon badge badge-success"><i class="icon-user">'
    +'</i></div> '
       +'<span class="badge badge-roundless badge-default pull-right">1min ago</span>'
     +'<p class="task-details">'+ msg.data.obj +'</p>  </a> <a href="/join/'+msg.data.id_room+'"> join this Room </a> </li>') ;



  Command: toastr["info"](msg.data.obj)

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
   
}else {($('#roomList')).find('#room-' + msg.data.id_room ).remove();}

});
/******
on chat private 

********/
io.socket.on('privatechat' ,function(msg){
  console.log(msg)
  
 
   if(msg.data.to === idSession){
      $('#allmsg').append('  <div class="chat-item chat-item-left">'
                    +'<div class="chat-image">'
                        +'<img src="'+msg.data.avatarFd +'" alt=""> </div>'
                    +'<div class="chat-message"> '+msg.data.msg +' </div> </div>');
      
   }else if (msg.data.from === idSession){
     $('#allmsg').append('  <div class="chat-item chat-item-right">'
                    +'<div class="chat-message"> '+ msg.data.msg+' </div> </div>')
   }
   
  
})

/********
users upadted , login & join room

*****/ 
   io.socket.on('user', function (msg) {
  
  if(msg.verb==='updated') {
    
   if(id_room.val()===msg.data.id_room){   
    if (msg.data.inRoom) {
      userListRoom.append(' <div id="'+msg.data.idUs+'"  > <li class="list-group-item list-group-item-info"> '+msg.data.FirstName+ ' ' +msg.data.LastName+'</li></div>');}
      else {
        userListRoom.find('#'+msg.data.idUs).remove();
      }
    }
  

     if (msg.data.onLine) {

          console.log('user', msg.verb );
          var FirstName = msg.data.FirstName;
           var LastName = msg.data.LastName;
            var avatarFd = msg.data.avatarFd;
            
          userList.append(
            ' <a href="javascript:void(0);" class ="userList" id="' + msg.data.id + '" name="' + FirstName +' '+ LastName + '"> <img src=' + avatarFd + ' alt="">  <span id="name"> ' + FirstName +' '+ LastName + '<img style=" position:relative ;width:7%;height:3%" src="/images/ptvert.png"></span> </a> '
          );
      
        } else {
          userList.find('#' + msg.data.id).remove();
        }
              $('a.userList').bind('click', function(){
   
    idUserTo = $(this).attr("id") ;
   nameUserTo = $(this).text();
console.log(idUserTo);

console.log(nameUserTo);
   $('#UserSelected').text(nameUserTo);

  // show all msg for this selected user

io.socket.get('/privatechat' , function(chat){

var tab=[] ;
var FoundChat ;
 var idSession= $('#idSession').val();
for (var i = chat.length - 1; i >= 0; i--) {

if(chat[i].idOwners == idSession + ' ' + idUserTo || chat[i].idOwners == idUserTo + ' ' +idSession){
 FoundChat = chat[i];
  }
};
console.log(FoundChat) ;

for (var i =0 ;i<FoundChat.msgs.length ;i++) {

 if (FoundChat.msgs[i].from === idSession){
 $('#allmsg').append('  <div class="chat-item chat-item-right">'
                    +'<div class="chat-message"> '+ FoundChat.msgs[i].body+' </div> </div>')
 }else {
    $('#allmsg').append('  <div class="chat-item chat-item-left">'
                    +'<div class="chat-image">'
                        +'<img src="'+FoundChat.msgs[i].avatarFd +'" alt=""> </div>'
                    +'<div class="chat-message"> '+FoundChat.msgs[i].body +' </div> </div>');
 }
};

});

// when close window msgs for this user , delete contents allmsg

$('#ret').click(function(){
   $('#allmsg').text('');
})



});
    } 
    else if (msg.verb === 'created') {
console.log(msg.data) ;

 var link = 'mailto:'+ msg.data.email+''
   + '?cc=hamr.hanen@gmail.com'
  + '&subject=' + escape("New account")
+ '&body=' + escape(' Dear ' + msg.data.FirstName +' ' +msg.data.LastName + ', \n Here are the details of your new ZetaCos account :   '+'\n- Username : '+msg.data.username +'\n- Password : '+ $('#password').val() +'\n you should change your password'+'\nComplete your account informations by clicking this link  http://localhost:1337/profil \n thanks.')
    ;

    window.location.href = link;

    }
  });

    log(
        'Socket is now connected ' , socket.id
    );



  });

  window.socket = socket;

  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }



/***
Room
**/

  var getCurrentsRoom = function () {
    io.socket.get('/room', function (rooms) {
      for (var j = 0, len = rooms.length; j < len; j++) {
       if(rooms[j].actif){
 $('#roomList').append(' <div id="room-'+rooms[j].id_room +' " ><a href="/Rooms/'+rooms[j].id+'">  <div class="inbox-item">'
       +'<div class="inbox-item-img"><img src="/images/teacher-trainig.png" class="img-circle" alt=""></div>'
         +'<p class="inbox-item-author">'+rooms[j].title+'</p>'
          +'<p class="inbox-item-text">created by '+ rooms[j].creatorName +'</p>'
        +'<p class="inbox-item-date">'+timediff(rooms[j].createdAt)+'</p> </div> </a> <div>') ;
       }
    
      }
    });
  };
getCurrentsRoom() ;


/****
Notif
****/
  var getPastNotif = function () {
    io.socket.get('/notif', function (messages) {
      for (var j = 0, len = messages.length; j < len; j++) {
       

 

     if(messages[j].desc === ''){
          $('#all').append('<div class="search-item">'
       +'<h3 class="no-m"><a href="javascript:void(0);">'+messages[j].obj  +'</a></h3>'+timediff(messages[j].createdAt)+' <p></p>'
      + '</div>');

               notifList.append( ' <li id="notif-' + messages[j].id + '"> <a href="/notifs/'+messages[j].id +'"> <div class="task-icon badge badge-success"><i class="icon-user">'
    +'</i></div> '
       +'<span class="badge badge-roundless badge-default pull-right">'+timediff(messages[j].createdAt)+'</span>'
     +'<p class="task-details">'+  messages[j].obj  +'</p>  </li>' ) ;

       }
       else {
                 $('#all').append('<div class="search-item">'
       +'<h3 class="no-m"><a href="javascript:void(0);">'+messages[j].obj  +'</a></h3>'+timediff(messages[j].createdAt)+' <p>'+ messages[j].desc+'</p>'
      + '<a href="/join/'+messages[j].id_room+'"> join this Room ?</a> </div>');
                      notifList.append( ' <li id="notif-' + messages[j].id + '"> <a href="/notifs/'+messages[j].id +'"> <div class="task-icon badge badge-success"><i class="icon-user">'
    +'</i></div> '
       +'<span class="badge badge-roundless badge-default pull-right">'+timediff(messages[j].createdAt)+'</span>'
     +'<p class="task-details">'+  messages[j].obj  +'</p> </a><a href="/join/'+messages[j].id_room+'"> join this Room </a>   </li>' 
       ) ;

     
    
       }

      }


    });
  };
getPastNotif() ;

/***
Send messages room
***/
  var setChatHeight = function () {
    var height = $(window).height();
    chatWindow.height(height - 130);
  };

  setInterval(setChatHeight, 100);

  var renderMessage = function (msg) {
    var time = moment(msg.createdAt).format('YYYY-MM-DD HH:mm');
    messageDiv.append(
      '<p><strong>' + msg.FirstName + ' '+ msg.LastName + ': </strong> ' + msg.body
      + '<span class="time">' + time + '</span>'
      + '</p>'
    );
  };
  var sendMessage = function () {
    io.socket.post('/room/newMsg', { body: newMessage.val() , FirstName : FirstName.val() , LastName : LastName.val() , id_room : id_room.val() },
    function (data) {
      console.log(data) ;
      renderMessage(data);
    });
    newMessage.val('');

  };
  

  send.click(sendMessage);
  newMessage.keydown(function (e) {
    if (e.which === 13) sendMessage();
  });
/****
get all users, selected user and all msgs for this user

***/



  var getUsersAndMsgs = function () {

    io.socket.get('/user', function (users) {
    
    // all connected users 
      for (var i = 0; i < users.length; i++) {

        if (users[i].onLine) {

         console.log(users[i]);

          userList.append(
'  <a href="javascript:void(0);"  id="' + users[i].id + '"  name="'
 + FirstName +' '+ LastName + '" class ="userList"> <img src=' + users[i].avatarFd + ' alt=""><span>'
  + users[i].FirstName +' '+ users[i].LastName 
  + '<img style=" position:relative ;width:7%;height:3%" src="/images/ptvert.png"> </a></span>'
       
          
          );
           $('#' + users[i].id + '').click(function(){
$('#cbp-spmenu-s2').show() ;
 })
        }
      }
      // show user selected 
      $('a.userList').bind('click', function(){
   
    idUserTo = $(this).attr("id") ;
   nameUserTo = $(this).text();
console.log(idUserTo);

console.log(nameUserTo);
   $('#UserSelected').text(nameUserTo);

  // show all msg for this selected user

io.socket.get('/privatechat' , function(chat){

var tab=[] ;
var FoundChat ;
for (var i = chat.length - 1; i >= 0; i--) {

if(chat[i].idOwners == idSession + ' ' + idUserTo || chat[i].idOwners == idUserTo + ' ' +idSession){
 FoundChat = chat[i];
  }
};
console.log(FoundChat) ;

for (var i =0 ;i<FoundChat.msgs.length ;i++) {

 if (FoundChat.msgs[i].from === idSession){
 $('#allmsg').append('  <div class="chat-item chat-item-right">'
                    +'<div class="chat-message"> '+ FoundChat.msgs[i].body+' </div> </div>')
 }else {
    $('#allmsg').append('  <div class="chat-item chat-item-left">'
                    +'<div class="chat-image">'
                        +'<img src="'+FoundChat.msgs[i].avatarFd +'" alt=""> </div>'
                    +'<div class="chat-message"> '+FoundChat.msgs[i].body +' </div> </div>');
 }
};

});

// when close window msgs for this user , delete contents allmsg

$('#ret').click(function(){
   $('#allmsg').text('');
})




});
    });
  };

  getUsersAndMsgs();


/***
send private msg
***/
  $('#msg').keydown(function (e) {
    if (e.which === 13) {

  var val=$('#msg').val() ;
   io.socket.post('/privatechat/privateMsg', { msg : val , to : idUserTo   },
    function (alldata) {
  console.log(alldata) ;
 $('#allmsg').append('  <div class="chat-item chat-item-right">'
                    +'<div class="chat-message"> '+ alldata.msg+' </div> </div>')
    });
    $('#msg').val('');
    }
  });