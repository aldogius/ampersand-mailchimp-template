
/**
 * Module dependencies.
 */

var mcapi = require('mailchimp-api');
var mcApiKey = require('./config.js');
var mc = new mcapi.Mailchimp();





var fs = require('fs');
var html = fs.readFileSync( 'index.html', 'utf8' );



var payload = {
	template_id: '239145', // ita blank canvas
	//template_id: '239149',
	values : {
	  name: "ITA Blank Canvas Test Template",
	  //name: "My Node Test Template",
	  html: html,
	}
};







// /templats/update  

// templates.update

  mc.templates.update( payload, function( data ) {

    console.log( data );

  });
