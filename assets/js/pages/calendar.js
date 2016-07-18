

$(document).ready(function() {

  
    var drag =  function() {
        $('.calendar-event').each(function() {

        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 1111999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });
    });
    };
    
    var removeEvent =  function() {
        $('.remove-calendar-event').click(function() {
        $(this).closest('.calendar-event').fadeOut();
        return false;
    });
    };
    
    $(".add-event").keypress(function (e) {
        if ((e.which == 13)&&(!$(this).val().length == 0)) {
            $('<div class="calendar-event"><p>' + $(this).val() + '</p><a href="javascript:void(0);" class="remove-calendar-event"><i class="fa fa-remove"></i></a></div>').insertBefore(".add-event");
            $(this).val('');
        } else if(e.which == 13) {
            alert('Please enter event name');
        }
        drag();
        removeEvent();
    });
      $(".add-event-date").keypress(function (e) {
        if ((e.which == 13)&&(!$(this).val().length == 0)) {
            $('<div class="calendar-event"><p>' + $(this).val() + '</p><a href="javascript:void(0);" class="remove-calendar-event"><i class="fa fa-remove"></i></a></div>').insertBefore(".add-event-date");
            $(this).val('');
        } else if(e.which == 13) {
            alert('Please enter event name');
        }
        drag();
        removeEvent();
    });
    
    
    drag();
    removeEvent();

  

function allevent(list){

var all= new Array()
console.log($('#creatorEvent').val());
var j= 0 ;
    for (var i = list.length - 1; i >= 0; i--) {
 

if($('#creatorEvent').val()===list[i].creator){
    console.log('egaux')
         tit=list[i].titleEvent ;

     var dateEvent = new Date( list[i].date);
    var dayEvent= dateEvent.getDate();
    var monthEvent = dateEvent.getMonth();
    var yearEvent = dateEvent.getFullYear();
 start = new Date(yearEvent,monthEvent,dayEvent);
  var tab={
    title:tit,
    start:start,
  }
   all[j]=tab;
   j++;
   
  

}


} 
     return all ;
}

    io.socket.get('/event',function(events){

for (var i=0 ; i<events.length ; i ++ ) {
    var di = new Date (events[i].date);
      var month = di.getMonth();
   var day= di.getDate();  


 $('#infoEventG').append('<div class="cd-timeline-img cd-info">'
                
                +' All'
            +'</div> <!-- cd-timeline-img -->'

            +'<div class="cd-timeline-content">'
                +'<h3>'+ events[i].titleEvent+' created by <b>'
                +events[i].creator+'</b> </h3> <p>'+ events[i].Description+'</p> <span class="cd-date">'+ day +'/'+ month +'</span>'
            +'</div> <!-- cd-timeline-content -->') ;

};



var eventss=allevent(events);

    $('#calendar').fullCalendar({
       
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            eventLimit: true, // allow "more" link when too many events
             events:eventss
        });
     $(".fc-day").click(function(){
       
 var D = $(this).attr('data-date');
   
   document.getElementById("date").value = D ;
  document.getElementById('light').style.display='block';
  document.getElementById('fade').style.display='block';
   }); 

       $(".fc-content").click(function(){
       
 var D = $(this).attr('data-date');
   
   document.getElementById("date").value = D ;
  document.getElementById('light').style.display='block';
  document.getElementById('fade').style.display='block';
   });


    });

   
    
});