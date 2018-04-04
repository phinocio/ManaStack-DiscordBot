const Discord = require("discord.js");
const Command = require('./Command');

class Support extends Command
{
	handle(message)
	{	
		
		let support = new Discord.RichEmbed();
		support.setTitle("Support ManaStack!");
		support.setColor("RED");
		support.setDescription("Twitter: https://twitter.com/manastack \nPatreon: https://www.patreon.com/manastack \nFacebook: https://www.facebook.com/ManaStackMTG");
		support.setFooter("Don't forget to recommend ManaStack to your friends!");
		this.respond(message, support);

	}

	respond(message, response)
	{
		// respond with the RichEmbed box.
		message.channel.send(response);
	}
}

module.exports = Support;
