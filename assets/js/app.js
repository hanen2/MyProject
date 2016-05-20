

/**
 * Chat Room
 */

(function($) {

  var userList = $('#users ul');
  socket.request('/user');

  var getUsers = function () {
    socket.get('/user', function (users) {
      console.log(users);
      for (var i = 0; i < users.length; i++) {
        if (users[i].OnLine === true) {
          userList.append(
            '<li id="user-' + users[i].id + '">' + users[i].FirstName + '</li>'
          );
        }
      }
    });
  };


  getUsers();

})(jQuery);
