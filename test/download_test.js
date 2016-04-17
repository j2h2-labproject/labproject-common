var LABPROJECT_COMMON_BASE = process.cwd();

var downloader = require(LABPROJECT_COMMON_BASE + '/download');

var should = require("should");
var fs = require("fs");

describe('download Object:', function(){

	describe('download_file', function(){

		it('should download with no errors, if networking is all setup', function(done){

			downloader.download_file("http://j2h2.com", "/tmp/lp-test", function(err, length, path) {

				if (err) {

					fs.unlink("/tmp/lp-test", function(err) {
						err.should.not.be.instanceof.Error;
						(err == null).should.equal(true);
						done();
					});



				}

				(length > 0).should.be.true;
				fs.unlink("/tmp/lp-test", function(err) {
					done();
				});


			});


		});

		//~ it('should run the command with error from shell', function(done){
//~
			//~ command.run("ls", ["-z"], function(err, stdout, stderr){
				//~
				//~ (err === null).should.be.false;
				//~ err.should.be.instanceof(Error);
				//~ (stdout === null).should.be.true;
				//~ (stderr === null).should.be.true;
				//~
				//~ done();
			//~ });
			//~
		//~ });


	});

});
