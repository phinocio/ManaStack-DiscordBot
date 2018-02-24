const CardSearch = require("./CardSearch.js");
const Help = require("./Help.js");

const CommandsList = {
	"cs|cardsearch": {
		"command": CardSearch,
		"description": "Search for a specific card"
	},
	"h|help": {
		"command": Help,
		"description": "Get help on how to use the bot. \"!help commands\" shows a list of commands."
	}
};

module.exports = CommandsList;