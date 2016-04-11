var LABPROJECT_COMMON_BASE = process.cwd();

var crypto = require(LABPROJECT_COMMON_BASE + '/crypto');

var should = require("should");

describe('crypto functions:', function(){
	
	describe('random_hash', function(){
	  
		it('by default, returns a random hash of 16 chars long', function(){
			
			hash_store = [];
			
			for (var i = 0; i < 100; i++) {
				
				var hash = crypto.random_hash();
				
				hash.length.should.equal(16);
				
				if (hash_store.indexOf(hash) !== -1) {
					should.fail(hash_store.indexOf(hash), 0, "Hash is random and should not repeat", "==");
				} else {
					hash_store.push(hash);
				}
			}
			
		});
		
		it('returns a random string of the given length', function(){
			
			hash_store = [];
			
			for (var i = 0; i < 100; i++) {
				
				var hash = crypto.random_hash(32);
				
				hash.length.should.equal(32);
				
				if (hash_store.indexOf(hash) !== -1) {
					should.fail(hash_store.indexOf(hash), 0, "Hash is random and should not repeat", "==");
				} else {
					hash_store.push(hash);
				}
			}
			
		});
		
	});
	  
	describe('pbkdf2', function(done){


		it('returns a salted hash', function(){
			
			var hash = crypto.pbkdf2('test', 'salt', function(error, result) {
				(error === null).should.equal.true;
				result.should.equal('d1605387b718397374bcfd7d87ef90b12c8ed1dc2ea2180f92bbc7810d5b9f1797aafe306c583fdd47e7252187148e257df7caf429268826ae1d7d4f89f0b46966a7825def5a1e7bd829be6babe47ef175c6096866f505a97d6bd0a11c5604919cf091ab858f4677b96f48ef92a6ebb3c39574eb1b3353e0bfa98d25619d1e20');
			});
			
			
		});


		});

	describe('sha256_string', function(){


		it('returns a sha256 hash', function(){
			
			var hash = crypto.sha256_string('test');
			hash.should.equal('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
			
		});


	});

	describe('md5_file', function(){

		it('returns a md5 hash of a file', function(){
			
			var hash = crypto.md5_file('./crypto.js', function(error, result) {
				reslt.should.equal('6af30b20fde9afe71101e5b846b16a6a');
			});
			
		});


	});
	
	describe('sha1_file', function(){

		it('returns a sha1 hash of a file', function(){
			
			var hash = crypto.sha1_file('./crypto.js', function(error, result) {
				reslt.should.equal('f71c5df757815f8dbad680d27573d557bda98a0e');
			});
			
		});


	});

});

