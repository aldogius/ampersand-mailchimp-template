var fileinclude = require('gulp-file-include'),
  gulp = require('gulp'),
  browserSync = require('browser-sync');




var mcapi = require('./node_modules/mailchimp-api/mailchimp');
var fs = require('fs');









// mc.templates.list({}, function( data ) {
//   data.user.forEach(function( template ) {
//     console.log( template.id, template.name, template.preview_image );
//   })
// })


gulp.task('deploy', ['build-html'], function() {

	var html = fs.readFileSync( 'index.html', 'utf8' );

	var mcApiKey = require('./config.js');
	var mc = new mcapi.Mailchimp(mcApiKey);


	var values = {

	  name: "Ampersand Events V2",
	  html: html,

	};
	
	mc.templates.update({ template_id: '239157', values: values }, function(data) {

	// sent
	   console.log( data );

	});
})


gulp.task('default', ['build-html'], function() {


	browserSync({
            server: './',
            files: "build/index.html"
        });
	
	gulp.watch(['./partials/**/*.*', './build/*.html'], ['build-html'], function() {
		setTimeout(function() {
			browserSync.reload();
		}, 100);
	});

});


gulp.task('build-html', function() {

    
    gulp.src('./build/*.html')
    

    .pipe( fileinclude({
        prefix: '@@',
        basepath: './partials/'
    }))

    .pipe(gulp.dest('./'));


});