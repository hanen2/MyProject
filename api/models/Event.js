/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var moment = require('moment');
module.exports = {

  attributes: {

     creator : { 
      type : 'string'
             },

       titleEvent : {
	  type :'string',
	  required: true 
          },
        date : {
	      type :'datetime'
          },

            Description :{
            type :'text'
          },
  }

};

