// JSON config files
const auth = require("./config/auth.json");

// npm includes
const Discord = require("discord.js");

// Classes
const CommandHandler = require("./src/Handlers/CommandHandler.js");

class Bot {

	constructor() {

		this.client = new Discord.Client();
		this.CommandHandler = new CommandHandler();
		this.prefix = "!";
		this.delimiter = ["|", "—", "--"];
	}

	run() {
		this.login();
		this.onMessage();

		this.client.on("ready", () => {
			console.log("I am ready!");
		});
	}

	login() {
		this.client.login(auth.token);
	}

	onMessage() {
		this.client.on("message", (message) => {
			if (message.content.startsWith(this.prefix) && message.content.length > 1) {
				this.CommandHandler.handle(message, this.prefix);
			} else {
				return;
			}
		});
	}
}

const bot = new Bot();
bot.run();