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
  foreach: function(input_array, each_function, callback) {

    function looper(location, input_array, each_function, pass_data, callback) {
      if (location >= input_array.length) {
        callback(null, pass_data);
      } else {
        each_function(location, input_array[location], pass_data, function(error, next_data) {
          if (!error) {
            looper(location+1, input_array, each_function, next_data, callback);
          } else {
            callback(error, next_data);
          }
        });
      }
    }

    looper(0, input_array, each_function, null, callback);
  }
};
