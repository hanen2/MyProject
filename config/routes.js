module.exports.routes = {

  
  '/':  { 
  	view: 'homepage' 
   },

'/lock-screen': {
   view: 'user/lock-screen' 
    },


  '/welcome': {
   view: 'user/welcome' ,
  
    },

  '/hello': {
   view: 'say/Hello' ,
  
    },


  '/UserProfil': {
   view: 'user/UserProfil' ,
  
    },
    '/users': {
   view: 'user/users' ,
  
    },

      '/chatRoom': {
   view: 'user/chatRoom' ,
  
    },

    '/profil': {
   view: 'user/profil' 
    },

    '/inbox': {
   view: 'user/inbox' 
    },

'get /editProfil': {
   view: 'user/editProfil' 
    },


    '/calendar': {
   view: 'user/calendar' 
    },

     

'post /newEvent': 'EventController.newEvent',
'post /upload': 'UserController.upload',
'post /addDesc': 'UserController.addDesc',
  'post /login': 'SessionsController.login',
  'POST /signup': 'UserController.signup',
  '/logout': 'SessionsController.logout',
 // 'GET / user / ' :  'UserController.findAll' , 
  'GET /user?:id?' : 'UserController.findUser'
};
