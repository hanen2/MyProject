

$(function() {
  $('#choix_users').keyup('input',function(event) {
  if(event.keyCode==13){
  var opt = $('option[value="'+$(this).val()+'"]');
    console.log(opt.attr('id'));
	
		 window.location.href='http://localhost:1337/profil/'+opt.attr('id');
		}
	
  });
});