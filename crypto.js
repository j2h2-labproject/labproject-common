/*
LabProject
Copyright (C) 2016 Jacob Hartman

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

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
				crypto.pbkdf2(data, salt, RUNTIMES, KEYSIZE, 'sha256', function (error, key) {

					if (!error) {
						callback(null, key.toString('hex'));
					} else {
						callback(error, null);
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
		var hash_algorithm = crypto.createHash('md5');
		get_file_hash(filename, hash_algorithm, callback);
	},
	sha1_file: function(filename,callback){
		var hash_algorithm = crypto.createHash('sha1');
		get_file_hash(filename, hash_algorithm, callback);
	},
	sha256_string: function(value) {
		return crypto.createHash('sha256').update(value).digest("hex");
	}

};

function get_file_hash(filename, hash_algorithm, callback)
	{
		// Derived from example at http://nodejs.org/api/crypto.html
		var filestream = fs.ReadStream(filename);
		filestream.on('data', function(d) {
		  hash_algorithm.update(d);
		});

		filestream.on('end', function() {
		  var hash = hash_algorithm.digest('hex');

		  callback(null, hash);
		});
	}
