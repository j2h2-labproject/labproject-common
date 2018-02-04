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
    // Only allows letters, numbers
    alphanum_string: function(input){
        return input.replace(/[^a-zA-Z0-9]/g,"");
    },
    // Only allows letters, numbers and - and _, for names
    simple_string: function(input){
        return input.replace(/[^a-zA-Z0-9\-_.]/g,"");
    },
    // For descriptions and sentences, no html
    simple_text: function(input){
        input = input.replace(/<[^>]*>/g,"");
        return input.replace(/[^- a-zA-Z0-9'"\(\)%&.?!@$#=:\_\s]/g,"");
    },
    path: function(input){
        return input.replace(/[^-a-zA-Z0-9\/._ ]/g,"");
    },
    parameter: function(input){
        return input.replace(/[^-a-zA-Z0-9_=./ ]/g,"");
    },
    safe_command: function(input){
        return input.replace(/[^-a-zA-Z0-9_]/g,"");
    }
};
