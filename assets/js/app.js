


var socket = io.connect();

socket.on('connect', function socketConnected() {

  socket.on('message', cometMessageReceivedFromServer);

    // Subscribe to the user model classroom and instance room
   // io.socket.get('/sessions/subscribe');
  

  });



  var messageDiv = $('#messages'),
   newMessage = $('#new-message'),
    chatWindow = $('#chat'),
    userList = $('#users ul'),
    sendButton = $('#send-message');

 
function cometMessageReceivedFromServer(message) {

  console.log("Here's the message: ", message);

  // Okay, I need to route this message to the appropriate place.

  // This message has to do with the User Model
  if (message.model === 'user') {
    var userId = message.id
    updateUserInDom(userId, message);

    if(message.verb !== "destroy") {
      displayFlashActivity(message);  
    } 
  }  
}

function displayFlashActivity(message) {
  $('#chatAudio')[0].play();
  $(".navbar").after("<div class='alert alert-success'>" + message.data.name + message.data.action + "</div>");
  $(".alert").fadeOut(5000);
}

function updateUserInDom(userId, message) {

  // What page am I on?
  var page = document.location.pathname;

  // Strip trailing slash if we've got one
  page = page.replace(/(\/)$/, '');
  
  // Route to the appropriate user update handler based on which page you're on
  switch (page) {

    // If we're on the User Administration Page (a.k.a. user index)
    case '/user':

      // This is a message coming from publishUpdate
      if (message.verb === 'update') {
        UserIndexPage.updateUser(userId, message);
      }

      // This is a message coming from publishCreate
      if(message.verb === 'create') {
        UserIndexPage.addUser(message);
      }
      // This is a message coming publishDestroy
      if(message.verb === 'destroy') {
        UserIndexPage.destroyUser(userId);
      }
      break;
  }
}

/////////////////////////////////////////////////
// User index page DOM manipulation logic
// (i.e. backbone-style view)
/////////////////////////////////////////////////
var UserIndexPage = {

  // Update the User, in this case their login status
  updateUser: function(id, message) {
    if (message.data.loggedIn) {
      var $userRow = $('tr[data-id="' + id + '"] td img').first();
      $userRow.attr('src', "/images/icon-online.png");
    } else {
      var $userRow = $('tr[data-id="' + id + '"] td img').first();
      $userRow.attr('src', "/images/icon-offline.png");
    }
  },

  // Add a user to the list of users in the User Administration Page
  addUser: function(user) {

  // obj is going to encompass both the new user data as well as the _csrf info from 
  // the layout.ejs file
  var obj = {
    user: user.data,
    _csrf: window.overlord.csrf || ''
  };

  // Add the template to the bottom of the User Administration Page
    $( 'tr:last' ).after(
      
      // This is the path to the templates file
      JST['assets/linker/templates/addUser.ejs']( obj )
    );
  },

  // Remove the user from the User Administration Page
  destroyUser: function(id) {
    $('tr[data-id="' + id + '"]').remove();
  }
}