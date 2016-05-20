/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



newEvent : function  (req,res) {
   var data_from_client = req.params.all();

        if(req.isSocket && req.method === 'POST'){

    Event.create({ creator : req.session.user.FirstName ,
    	titleEvent: data_from_client.titleEvent ,
    	 date : data_from_client.date})
                .exec(function(error,events){
                    console.log(events);
   Event.publishCreate({id: events.id, titleEvent : events.titleEvent , creator:events.creator, date :events.date});
                }); 
        }
        else if(req.isSocket){
            
            Event.watch(req.socket);
            console.log( 'creator subscribed to ' + req.socket.id );
        }
}



};

