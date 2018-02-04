var LABPROJECT_COMMON_BASE = process.cwd();

var loop = require(LABPROJECT_COMMON_BASE + '/loop');
var command = require(LABPROJECT_COMMON_BASE + '/command');

var should = require("should");

describe('loop Object:', function(){

    describe('Run Command', function(){

        it('should loop through the objects in order', function(done){

      var expect_next = 0;
      var test_array = ['/bin', '/sbin', '/etc'];

      loop.foreach(
        test_array,
        function(loc, data, pass_data, next) {
          loc.should.equal(expect_next);
          data.should.equal(test_array[expect_next]);
          if (loc > 0) {
            pass_data.should.equal(test_array[loc - 1])
          } else {
            (pass_data === null).should.equal(true);
          }

          expect_next += 1;

          command.run("ls", ["-la", data], function(err, stdout, stderr){
                    (err === null).should.equal(true);

                    stdout.should.be.instanceof(Array);
                    stderr.should.be.instanceof(Array);
                    stderr[0].should.equal("");

                    next(null, test_array[loc]);
                });
        },
        function(error, result) {
          (error === null).should.be.false;
          result.should.equal('/etc');
          done();
        });


        });


    });

});
