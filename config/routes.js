module.exports.routes = {

  '/':  { 
  	view: 'user/welcome' 
   },

  '/welcome': {
   view: 'user/welcome' ,
  
    },  

     '/FinishedRoom': {
   view: 'user/FinishedRoom' ,
  
    }, 

     '/notifs': {
   view: 'user/notifs' ,
  
    },  
      '/addNewUser': {
   view: 'user/signup' ,
  
    },     

     '/AllUsers': {
   view: 'user/AllUsers' ,
  
    },

  '/UserProfil/:id': {
   view: 'user/UserProfil' ,
  
    },   

    '/profil': {
   view: 'user/profil' 
    }, 

     '/timeLine': {
   view: 'user/timeLine' 
    },

'get /editProfil': {
   view: 'user/editProfil' 
    },

    '/calendar': {
   view: 'user/calendar' 
    }, 

    '/search': {
   view: 'user/search' 
    },

       '/private': {
   view: 'user/private' 
    },

'/Rooms/:id': {
    controller: 'RoomController',
    action: 'render'
  },
  '/notifs/:id': {
    controller: 'NotifController',
    action: 'findNotifById'
  },
    '/finish/:id': {
    controller: 'RoomController',
    action: 'finish'
  },


  '/join/:id': {
    controller: 'RoomController',
    action: 'join'
  },

   '/leave/:id': {
    controller: 'RoomController',
    action: 'leave'
  },
 
'post /newEvent': 'EventController.newEvent',
'post /newRoom': 'RoomController.newRoom',

'post /EditPassw': 'UserController.EditPassw',
'post /upload': 'UserController.upload',
'post /addDesc': 'UserController.addDesc',

  'post /login': 'SessionsController.login',
  'POST /signup': 'UserController.signup',
  '/logout': 'SessionsController.logout',
 // 'GET / user / ' :  'UserController.findAll' , 
 'GET /profil/:id' : 'UserController.findUser'
};
