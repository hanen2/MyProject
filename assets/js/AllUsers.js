io.socket.get('/user', function (AllUsers) {
	
	for (var i = AllUsers.length - 1; i >= 0; i--) {
		//online 
  
        if(AllUsers[i].onLine) {
          if(AllUsers[i].username == 'admin'){
$('#allUsers').append('<tr data-model="user" data-id ="'+AllUsers[i].id+'"> <td ><img src="/images/icon-online.png"></td>'
       +'<td>'+ AllUsers[i].FirstName+'</td>'
        +'<td>'+ AllUsers[i].LastName+'</td>'
        +'<td>'+ AllUsers[i].username+'</td>'
       +'<td>'+ AllUsers[i].email+'</td>  </tr>') ;

          }
          else {
                $('#allUsers').append('<tr data-model="user" data-id ="'+AllUsers[i].id+'"> <td ><img src="/images/icon-online.png"></td>'
       +'<td>'+ AllUsers[i].FirstName+'</td>'
        +'<td>'+ AllUsers[i].LastName+'</td>'
        +'<td>'+ AllUsers[i].username+'</td>'
       +'<td>'+ AllUsers[i].email+'</td>  <td> <a href="/profil/'+AllUsers[i].id+'"> Show  </a> </td> <td>' 
       +'<form action="/user/destroy/'+ AllUsers[i].id+'" method="POST" name="DeleteForm" id="DeleteForm">'
        +'<a onclick=" myFunction() " class="btn btn-sm btn-danger" > Delete </a>'
      +'</form</td> </tr>') ;
          }
  
  }
  //offline 
  else {
         if(AllUsers[i].username == 'admin'){
$('#allUsers').append('<tr data-model="user" data-id ="'+AllUsers[i].id+'"> <td ><img src="/images/icon-offline.png"></td>'
       +'<td>'+ AllUsers[i].FirstName+'</td>'
        +'<td>'+ AllUsers[i].LastName+'</td>'
        +'<td>'+ AllUsers[i].username+'</td>'
       +'<td>'+ AllUsers[i].email+'</td>  </tr>') ;

          }
          else {
                $('#allUsers').append('<tr data-model="user" data-id ="'+AllUsers[i].id+'"> <td ><img src="/images/icon-offline.png"></td>'
       +'<td>'+ AllUsers[i].FirstName+'</td>'
        +'<td>'+ AllUsers[i].LastName+'</td>'
        +'<td>'+ AllUsers[i].username+'</td>'
       +'<td>'+ AllUsers[i].email+'</td>  <td> <a href="/profil/'+AllUsers[i].id+'"> Show  </a> </td> <td>' 
       +'<form action="/user/destroy/'+ AllUsers[i].id+'" method="POST" name="DeleteForm" id="DeleteForm">'
        +'<a onclick=" myFunction() " class="btn btn-sm btn-danger" > Delete </a>'
      +'</form</td> </tr>') ;
          }
  
  }
    

	};
}) ;
function myFunction() {
    var x;
    if (confirm("Are you sure ?")) {
        x = "You pressed OK!";
        console.log(x); 
        $('#DeleteForm').submit();
    }
   console.log(x);
}


io.socket.on('user', function(message){


if (message.verb == 'updated') {
  console.log('user updated' );
  console.log(message.data)
    if (message.data.onLine) {
      var $userRow = $('tr[data-id="' + message.data.idUser + '"] td img').first();
      console.log($userRow)
      $userRow.attr('src', "/images/icon-online.png");
    } else {
      var $userRow = $('tr[data-id="' + message.data.idUser + '"] td img').first();
       console.log($userRow)
      $userRow.attr('src', "/images/icon-offline.png");
    }
};


})











