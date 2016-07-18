

  // as soon as this file is loaded, connect automatically, 
var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    console.log("This is from the connect: " ,socket.id );

    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );

  });

  //window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  


if (document.forms['status_update_form']) {
(function($) {



    /**
     * Declare Variables
     */
    var the_form = document.forms['status_update_form'],
        messages_container  = $('#messages_container'),
        chatroom_id = the_form.chatroom_id.value;


    /**
     * Define Functions
     */

    var submitStatusUpdate = function () {

        post_data = {
            chatroom_id: the_form.chatroom_id.value,
            username   : the_form.username.value,
            content    : the_form.content.value
        };

        io.socket.post('/statusupdate', post_data,
            function (data) {
                /* Duplication Here */
                 renderMessage(data);
            });

        the_form.content.value = "";
    };
    var renderMessage = function (msg) {
        // var time = moment(msg.createdAt).format('YYYY-MM-DD HH:mm');
        messages_container.prepend(
            '<li class="list-group-item">' +
                '<h5>' + msg.username + '</h5>' +
                '<p>' + msg.content  + '</p>' +
            '</li>'
            );
    };

    var getPastMessages = function () {
        io.socket.get('/statusupdate?chatroom_id=' + chatroom_id, function (statusupdates) {
            for (var i = 0, len = statusupdates.length; i < len; i++) {
                renderMessage(statusupdates[i]);
            }
        });
    };




    /**
     * Set Event Listeners
     */

    $(the_form).submit( function (event)
    {
        event.preventDefault();
        submitStatusUpdate();
    });

    /**
     * Go!
     */
io.socket.request({
  method: 'get',
  url: '/statusupdate',
  headers: {
    'x-csrf-token': 'ji4brixbiub3'
  }
}, function (resData, jwres) {
  if (jwres.error) {
    console.log(jwres.statusCode); // => e.g. 403
    return;
  }
  console.log(jwres.statusCode); // => e.g. 200
});
    

    getPastMessages();

    io.socket.on('message', function (socket_message) {
        console.info('socket.on statusupdate');

        if (socket_message)
        {
            if (socket_message.data)
            {
                renderMessage(socket_message.data);
            }
        }
    });

})(jQuery);
}