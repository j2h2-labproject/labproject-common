module.exports = {
	is_uuid: function(input){
		//Example: 301e8cd0-b7bc-11e3-aa0c-3fdad5497e70
		var uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
		return uuid_regex.test(input);
	},
	base64_encode: function(input) {
		return (new Buffer(input).toString('base64'));
	},
	base64_decode: function(input) {
		return (new Buffer(input, 'base64').toString('ascii'));
	}
};
