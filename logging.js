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

var cli_logger = null;
var cli_logger_obj = null;


function is_valid_level(value) {
    if (value != "debug" &&  value != "notice" && value != "warning" && value != "error" && value != "success") {
        return false;
    } else {
        return true;
    }
}

try {
    cli_logger = require("cli-color");
    cli_logger_obj = function() {

        this.colors = {
            "error": cli_logger.redBright,
            "warning": cli_logger.xterm(202),
            "notice": cli_logger.blueBright,
            "debug": cli_logger.cyanBright,
            "success": cli_logger.greenBright
        };

        this.log = function(level, message, callback) {

            if (is_valid_level(level)) {
                if (typeof message == "string")
                    {
                        console.log(this.colors[level]("> " + level.toUpperCase() + ": " + message));
                    }else{
                        console.log(this.colors[level]("> " + level.toUpperCase() + "\n\n"), message, this.colors[level]("\n\n> " + level.toUpperCase()));
                    }
            }

        };
    };
} catch (e) {
    console.log(e);
    console.log("CLI logger is not supported");
}



function logger(name, type) {

    self = this;

    if (type == "cli") {
        if (cli_logger_obj === null) {
            self = null;
            console.log("CLI logger is not enabled");
        } else {
            this.logger_obj = new cli_logger_obj();
        }
    } else {
        self = null;
        console.log("Invalid logger");
    }


    self.setup = function(callback) {
        callback(this.logger_obj);
    };

    self.log = function(level, message, callback) {
        this.logger_obj.log(level, message, callback);
    };

}

module.exports = {
    logger: logger
};
