var crypto = require('crypto');
var fs = require('fs');

var RUNTIMES = 10000;
var KEYSIZE = 128;

module.exports = {
	
	/*
	* This runs SHA256 PBKDF2 on the given data with the given salt.  
	*/
	pbkdf2: function(data, salt, callback) {
		if (data && salt)
			{
				crypto.pbkdf2(data, salt, RUNTIMES, KEYSIZE, 'sha256', function (err, key) {
					
					if (err != null) {
						callback(err, null);
					} else {
						callback(null, key.toString('hex'));
					}
					
				});

			}else{
				callback(new Error("Data and salt must be set"), null);
			}

	},
	random_hash : function(length) {
		
		if (length === undefined) {
			length = 16;
		}
		
		var hash = crypto.randomBytes(length / 2).toString('hex');
		
		return hash;
	},
	md5_file: function(filename,callback){
		var shasum = crypto.createHash('md5');
		get_file_hash(filename,shasum,callback);
	},
	sha1_file: function(filename,callback){
		var shasum = crypto.createHash('sha1');
		get_file_hash(filename,shasum,callback);
	},
	sha256_string: function(value) {
		return crypto.createHash('sha256').update(value).digest("hex");
	}

};

function get_file_hash(filename,shasum,callback)
	{
		// Derived from example at http://nodejs.org/api/crypto.html
		var filestream = fs.ReadStream(filename);
		filestream.on('data', function(d) {
		  shasum.update(d);
		});

		filestream.on('end', function() {
		  var hash = shasum.digest('hex');
		  
		  callback(hash);
		});
	}

