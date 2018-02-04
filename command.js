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

var sanitize = require('./sanitize');

var exec = require('child_process').exec;

module.exports = {

    run: function(command, param, callback) {

        command = sanitize.path(command).trim();

        if (param instanceof Array)
            {

                if (command === "") {
                    callback(new Error("Command cannot be blank"), null, null);
                } else {

                    command_string = command;

                    for (var i in param)
                        {
                            s_param = sanitize.parameter(param[i]);
                            if (s_param.indexOf(" ") != -1) {
                                    command_string += " '" + s_param + "'";
                            } else {
                                command_string += " " + s_param;
                            }

                        }


                    child = exec(command_string, function (error, stdout, stderr) {
                        if (!error) {
                            var stdout_lines = stdout.split(/\n/);
                            var stderr_lines = stderr.split(/\n/);

                            for (var i in stdout_lines)
                                {
                                    stdout_lines[i] = stdout_lines[i].trim();
                                }

                            for (var j in stderr_lines)
                                {
                                    stderr_lines[j] = stderr_lines[j].trim();
                                }

                            callback(null, stdout_lines, stderr_lines);
                        }else{
                            callback(error, null, null);
                        }

                    });
                }

            } else {
                callback(new Error("param must be an array"), null, null);
            }

    }
};
