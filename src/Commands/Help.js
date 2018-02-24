const CommandsList = require("./CommandsList.js");
const MiscCommands = require("./MiscCommands.js");

class Help {

	constructor() {
		//Probably don't need this.
		console.log(CommandsList);
	}

	handle(message) {
		message.channel.send("I'll eventually show a list of commands and whatnot");
	}
}


module.exports = Help;