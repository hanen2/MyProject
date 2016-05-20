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

     


'post /upload': 'UserController.upload',

  'post /login': 'SessionsController.login',
  'POST /signup': 'UserController.signup',
  '/logout': 'SessionsController.logout',
 // 'GET / user / all' :  'UserController.findAll' , 
 // 'GET / user / nom /: nom' :  'UserController.findByName'
};
