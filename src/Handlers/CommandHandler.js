const CommandManager = require("./../Commands/CommandManager.js");
const MiscCommands = require("./../Commands/MiscCommands.js");

class CommandHandler
{

	constructor()
	{
		this.commandsMap = new Map();
	}

	handle(message, prefix)
	{
		let commandList = CommandManager.getCommandList();
		let command = message.content.replace(prefix, "").split(" ")[0].toLowerCase();

		if(MiscCommands[command]) {
			this.respondMiscCommand(message, command);
		} else {
			for(var key in commandList) {
				var keys = key.split("|");
				if (keys.includes(command)) {
					this.respondCommand(message, key, command);
				}
			}
		}
	}

	respondCommand(message, key, command)
	{
		let commandList = CommandManager.getCommandList();
		if(this.commandsMap.has(key)) {
			let commandObject = this.commandsMap.get(key);
			commandObject.handle(message);
		} else {
			let commandObject = new commandList[key].command(CommandManager);
			this.commandsMap.set(key, commandObject);
			commandObject.handle(message);
		}
	}

	respondMiscCommand(message, command)
	{
		message.channel.send(MiscCommands[command]);
	}
}

module.exports = CommandHandler;
