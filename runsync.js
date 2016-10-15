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

var function_list = [];

module.exports = {
	run: function(end){
		if (function_list.length>0)
			{
				var torun = function_list.shift();
				torun(function(){
					module.exports.run(end);
				});
			}else{
				end();
			}

	},
	next: function(newfunction)
		{
			function_list.push(newfunction);
		}
};
