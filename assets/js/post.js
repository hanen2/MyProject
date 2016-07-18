  function timediff(crdate){

var date=new Date(crdate);
var date2 = new Date()
var d= date2 - date ;
d=d/1000;// car le resulta est en milliseconde 


var jour= Math.trunc( d/86400)
var hours = Math.trunc((d%86400)/3600);
var min = Math.trunc(((d%86400)%3600)/60);
//console.log(d)
//console.log(jour+'j' +hours+'  h  '+min+'  min')

if(jour>0){ return(''+jour+'  day ago')}
  else{if(hours>0) return (''+hours+' hours'+' ago')
 
  else return (''+min+' minutes ago');
  }



}
 function  editpost(body,idpub){

    $('#postcontent').html('body');
 //   body=$('#postcontent').val();

  }
 newPost = $('#new-post'),
   usersPost = $('#usersPost'),
   PostList = $('#profile-timeline ul '),
   PostListPro = $('#Userprofile-timeline ul '),
    FirstName = $('#Name1'),
    LastName = $('#Name2'),
    idUser = $('#id').val(),
     PostButton = $('#sendBtn');

 var sendPost = function () {
    io.socket.post('/pub/newPub', { body: newPost.val() , creator : FirstName.val()+' '+LastName.val()},
    function (data) {



    });
    newPost.val('');

  };
  
io.socket.get('/pub',function(pubs){


for (var i=0 ;i<pubs.length ; i++ ){

  if($('#NameProfilUser').val()===pubs[i].creator){
    PostListPro.append('   <li class="timeline-item">' 
   +' <div class="panel panel-white">  <div class="panel-body">'

   +' <div class="timeline-item-header"><p><img src="'+pubs[i].avatarFd+'">'+ pubs[i].creator +' '+'<span>Posted a Status</span></p>'   
    +'<small>'+timediff(pubs[i].createdAt)+'</small> </div>  <div class="timeline-item-post">' 
    + '<p>     '+ pubs[i].body +'   </p> </div> </div> </div> </li>');
  }

  if($('#NameUser').val()===pubs[i].creator){



 

  $('#post').append('   <div class="well">  <h4><div class="profile">'
    +'<div style="position:absolute;top:5%;right:3%; width:20%">'
   +'<a id="showedit" href="javascript:void(0);" > <img src="images/flesh.png" style=" position:absolute;top:2%;right:1%;">'
   +' </a><br><br>'
  +'<div id="edition" style="background-color:#fff;right:18%;width:100%;float:right;display:none">'
  +'<b style="font-size:120%"> '
  + '<a id="editpost" href="" style="text-decoration: none;" '
  + 'data-toggle="modal" data-target="#myModal2"  onclick="editpost(\"'+pubs[i].body+'\",\"'+pubs[i].id+'\")">Edit</a></b><br>'
   +'<b style="font-size:120%;">  <a href="" style="text-decoration: none; color:red" >Delete</a></b>'
   + '</div> </div><h4><div class="profile">' 
    +'<a href="javascript:void(0);" class="showRight2">'
    +'<img src="'+pubs[i].avatarFd+'" alt=""  style=" width: 60px; height: 60px;">'
    +'<span>'+pubs[i].creator+'<small> <br>'+ timediff(pubs[i].updatedAt)+'</small></span></a></h4> '
       +'<p> '+ pubs[i].body+'</p>   </div>') ;


$("#showedit").click(function(){
   $("#edition").toggle('0.0');
});

 
       PostList.append('   <li class="timeline-item">' 
   +' <div class="panel panel-white">  <div class="panel-body">'

   +' <div class="timeline-item-header"><p><img src="'+pubs[i].avatarFd+'">'+ pubs[i].creator +' '+'<span>Posted a Status</span></p>'   
    +'<small></small> </div>  <div class="timeline-item-post">' 
    + '<p>     '+ pubs[i].body +'   </p>'
                                                    +''
                                        +'</div> </div> </div> </li>');

  }
  else {



  $('#post').append('   <div class="well">  <h4><div class="profile">'
    +'<a href="javascript:void(0);" class="showRight2">'
    +'<img src="'+pubs[i].avatarFd+'" alt=""  style=" width: 60px; height: 60px;">'
    +'<span>'+pubs[i].creator+'<small> <br>'+ timediff(pubs[i].updatedAt)+'</small></span></a></h4> '
       +'<p> '+ pubs[i].body+'</p>   </div>') ;






  }
}
})
  PostButton.click(sendPost);

 io.socket.on('connect', function socketConnected() {
  io.socket.on('pub', function (event){
console.log(event);
  $('#post').append('   <div class="well">  <h4><div class="profile"> <img src="'+event.data.avatarFd+'" style=" width: 60px;'
    +'height: 60px;"> '+event.data.creator+'</div></h4>'
       +'<p> '+ event.data.body+'</p>   </div>') ;

   //  console.log($('#NameProfilUser').val());
var time = moment().startOf('hour').fromNow();
 if($('#NameProfilUser').val()===event.data.creator){
  console.log('egaux')
      PostListPro.append('   <li class="timeline-item">' 
   +' <div class="panel panel-white">  <div class="panel-body">'

   +' <div class="timeline-item-header"><p> <img src="'+event.data.avatarFd+'">'+ event.data.creator +' '+'<span>Posted a Status</span></p>'   
    +'<small>'+time+'</small> </div>  <div class="timeline-item-post">' 
    + '<p>     '+ event.data.body +'   </p>'
                                                    +''
                                        +'</div> </div> </div> </li>');
 }

if($('#NameUser').val()===event.data.creator){

   PostList.append('   <li class="timeline-item">' 
   +' <div class="panel panel-white">  <div class="panel-body">'

   +' <div class="timeline-item-header"><p> <img src="'+event.data.avatarFd+'">'+ event.data.creator +' '+'<span>Posted a Status</span></p>'   
    +'<small>'+time+'</small> </div>  <div class="timeline-item-post">' 
    + '<p>     '+ event.data.body +'   </p>'
                                                    +'<div class="timeline-options">'
                                                        +'<a href="#"><i class="icon-like"></i> Like (7)</a>'
                                          +'<a href="#"><i class="icon-bubble"></i> Comment (2)</a>'
                                             +'<a href="#"><i class="icon-share"></i> Share (3)</a>'
                                                    +'</div>'
                                        +'</div> </div> </div> </li>'); 

  
   
}
});
});