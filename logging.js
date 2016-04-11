
var cli_logger = null;
var cli_logger_obj = null;


function is_valid_level(value) {
	if (value != "debug" &&  value != "notice" && value != "warning" && value != "error") {
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
			
		}
		
		this.log = function(level, message, callback) {
			
			if (is_valid_level(level)) {
				if (typeof message == "string")
					{
						console.log(this.colors[level]("> " + level.toUpperCase() + ": " + message + "\n"));
					}else{
						console.log(this.colors[level]("> " + level.toUpperCase() + "\n\n"), message, this.colors[level]("\n\n> " + level.toUpperCase()));
					}
			}
			
		};
	}
} catch (e) {
	console.log(e);
	console.log("CLI logger is not supported");
}



function logger(name, type) {
	
	self = this;
	
	if (type == "cli") {
		if (cli_logger_obj == null) {
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
}
