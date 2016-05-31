
$(document).ready(function(){ 

  $(".fc-day").click(function(){
       
 var D = $(this).attr('data-date');
   
   document.getElementById("date").value = D ;
  document.getElementById('light').style.display='block';
  document.getElementById('fade').style.display='block';
   });

   
 Date.prototype.yyyymmdd = function() {
 	var  date = new Date;
    var  day =date.getDate();
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate()
 // var NewDateEvent = yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
// diffrence between date of event and dateNow
  return (dd-day);
  };

d = new Date("Thu May 29 2016 02:00:00 GMT+0200 (Paris, Madrid (heure d’été))");
d.yyyymmdd();
});
