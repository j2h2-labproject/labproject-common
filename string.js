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
