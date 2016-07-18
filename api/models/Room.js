/**
 * Room.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {


attributes: {

    /**
     * (i.e. My Chat Room)
     */
    title : {
        type: 'string',
       required: true
    },
    desc : {
        type: 'text'
     
    },

    actif : {
        type : 'boolean'
      
    },
    creatorName :{
        type :'string'
    }, 
    creatorId :{
        type :'string'
    },

    messages: { collection: 'Message', via : 'rooms' },
    users: { collection: 'User', via : 'RoomUsers' }
    

  }


};

