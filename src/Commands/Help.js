const Command = require('./Command');
const Discord = require("discord.js");

class Help {

	constructor(commandManager) {
		this.commandManager = commandManager;
	}

	handle(message)
	{
		let commandList = this.commandManager.getCommandList();
		let keys = Object.keys(commandList);
		let result = "";
		keys.forEach((key) => {
			var line = "";
			var prefixes = key.split("|");
			prefixes.forEach((p, i) => {
				if (i > 0) line += ", ";
				line += "!" + p;
			})
			line +=  " — " + commandList[key].description;
			result += line + "\n";
		});

		let embed = new Discord.RichEmbed();

		embed.setTitle("ManaStack Discord Bot");
		embed.setColor("BLUE");
		embed.setDescription(result);
		embed.setFooter("Having bot troubles? Talk to a real person about me in the #support channel.");

		message.channel.send(embed);
	}
}

module.exports = Help;
