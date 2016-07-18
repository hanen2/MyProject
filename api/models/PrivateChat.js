



module.exports = {

  attributes: {

 idOwners : { type : 'string' , 
                unique : true
                },
   msgs :'array',
   owners: {
      collection: 'user',
      via: 'PrivateChats'
    }
    

  },
    beforeCreate: function(values, next) {
        values.msgs = new Array();
        next();
    },

    CreateChat : function(inputs,cb){
 
  PrivateChat.create({idOwners : inputs.owner.id +' '+ inputs.user.id}).exec(cb);



    }
};
