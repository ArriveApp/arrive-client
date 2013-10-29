#! /usr/local/bin/node

var fs = require('fs');

function replace_string_in_file(filename,to_replace,replace_with) {
  var data = fs.readFileSync(filename, 'utf8');
  var result = data.replace( new RegExp(to_replace,"g"), replace_with);
  fs.writeFileSync(filename, result, 'utf8');
}

var config_env = {};

function init_config(){
	config_env["local"] = "http://localhost:3000";
	config_env["test"] = "http://arrive-server-dev.herokuapp.com";
	config_env["production"] = "http://arrive-server.herokuapp.com";
}

function run(){
	init_config();

	var env = process.env.TARGET;
	
	if (env == undefined)
		env = "production";
	
	replace_string_in_file("./www/js/app/app.js","server: \"\.*\"", "server: " + "\"" + config_env[env] + "\"");
}

run();
