const CommandsList = require("./../Commands/CommandsList.js");
const MiscCommands = require("./../Commands/MiscCommands.js");

class CommandHandler {

	constructor() {
		this.commandsMap = new Map();
	}

	handle(message, prefix) {
		let command = message.content.replace(prefix, "").split(" ")[0].toLowerCase();

		if (MiscCommands[command]) {

			this.respondMiscCommand(message, command);

		} else {

			for (var key in CommandsList) {
				var keys = key.split("|");

				if (keys.includes(command)) {
					this.respondCommand(message, key);
				}
			}
		}
	}

	respondCommand(message, key) {
		if (this.commandsMap.has(key)) {
			let commandObject = this.commandsMap.get(key);
			commandObject.handle(message);

			//console.log("Mapped Command Called!");
		} else {

			let commandObject = new CommandsList[key].command;

			this.commandsMap.set(key, commandObject);
			commandObject.handle(message);
			// console.log(this.commandsMap);
			// console.log("Command Mapped!");
		}
	}

	respondMiscCommand(message, command) {
		message.channel.send(MiscCommands[command]);
	}
}

module.exports = CommandHandler;    