//~ var LABPROJECT_BASE = process.cwd();
//~ var LABPROJECT_SERVER_LIBS = process.cwd() + "/server/lib";

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
							command_string += " " + sanitize.parameter(param[i]);
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
