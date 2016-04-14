
var LABPROJECT_COMMON_BASE = process.cwd();

var command = require(LABPROJECT_COMMON_BASE + '/command');



var should = require("should");

describe('command Object:', function(){

	describe('Run Command', function(){

		it('should run the command with no errors', function(done){


			command.run("ls", ["-la"], function(err, stdout, stderr){

				(err === null).should.be.false;

				stdout.should.be.instanceof(Array);

				stderr.should.be.instanceof(Array);
				stderr[0].should.equal("");

				done();
			});

		});

		it('should run the command with error from shell', function(done){

			command.run("ls", ["-z"], function(err, stdout, stderr){

				(err === null).should.be.false;
				err.should.be.instanceof(Error);
				(stdout === null).should.be.true;
				(stderr === null).should.be.true;

				done();
			});

		});

		it('should not run the command (second param is not array)', function(done){

			command.run("ls", "-la", function(err, stdout, stderr){
				(err === null).should.be.false;
				err.should.be.instanceof(Error);
				(stdout === null).should.be.true;
				(stderr === null).should.be.true;
				done();
			});

		});

		it('also should not run the command', function(done){

			command.run(";", [], function(err, stdout, stderr){
				(err === null).should.be.false;
				err.should.be.instanceof(Error);
				(stdout === null).should.be.true;
				(stderr === null).should.be.true;
				done();
			});

		});

	});

});
