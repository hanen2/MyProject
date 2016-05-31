/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function(req, res, next) {

   
    Event.find(function foundEvents(err, events) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        events: events
      });
    });
  },

newEvent : function  (req,res) {
  var title=req.param('title');
  var description =req.param('description');
  var date =req.param('date');
    Event.create({ creator : req.session.User.username ,
      titleEvent: title , 
      	Description: description ,
    	 date :date})
                .exec(function(error,events){
                    console.log(events);
   Event.publishCreate({id: events.id, titleEvent : events.titleEvent , creator:events.creator, date :events.date});
  
               res.redirect('/calendar');

                }); 
        
        
}



};

