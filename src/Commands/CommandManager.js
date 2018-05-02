const Help = require('./Help');
const CardSearch = require('./CardSearch');
const Support = require("./Support");
const Welcome = require("./Welcome");

class CommandManager {
	constructor()
	{
		
	}
	getCommandList()
	{
		return {
			"cs|cardsearch": {
				"command": CardSearch,
				"description": "Search ManaStack's card database."
			},
			"h|help": {
				"command": Help,
				"description": "Get help on how to use the bot."
			},
			"s|support": {
				"command": Support,
				"description": "List ways to support ManaStack."
			},
			"w|welcome": {
				"command": Welcome,
				"description": "Sends a Welcome"
			},
			
		};
	}
}

module.exports = new CommandManager();
