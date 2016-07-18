/**
 * NotifController
 *
 * @description :: Server-side logic for managing notifs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

findNotifById : function  (req,res) {



Notif.findOne({id : req.params['id']}).exec(function (err, notifs){
	if (err) console.log('errrr');
	
req.session.notif = notifs ;

  res.view('user/notif', {
                  notifs: notifs
              });



});
}
};

