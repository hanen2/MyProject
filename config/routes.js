module.exports.routes = {

  
  '/':  { 
  	view: 'homepage' 
   },


  'get /signup': { 
  	view: 'user/signup' 
  },


'/lock-screen': {
   view: 'user/lock-screen' 
    },


  '/welcome': {
   view: 'user/welcome' ,
  
    },

    '/profil': {
   view: 'user/profil' 
    },

'get /editProfil': {
   view: 'user/editProfil' 
    },


    '/calendar': {
   view: 'user/calendar' 
    },

     


'post /upload': 'UserController.upload',
  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
  '/logout': 'UserController.logout',
 // 'GET / user / all' :  'UserController.findAll' , 
 // 'GET / user / nom /: nom' :  'UserController.findByName'
};
