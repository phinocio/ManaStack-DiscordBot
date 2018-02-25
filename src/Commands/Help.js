
class Help {

	constructor(CommandsList, MiscCommands)
	{
		this.commandsList = CommandsList;
		this.miscCommands = MiscCommands;
	}

	handle(message) {
		message.channel.send("I'll eventually show a list of commands and whatnot");
		console.log(this.commandsList);
	}
}


module.exports = Help;