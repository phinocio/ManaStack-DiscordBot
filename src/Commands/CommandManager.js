const Help = require('./Help');
const CardSearch = require('./CardSearch');

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
			}
		};
	}
}

module.exports = new CommandManager();
