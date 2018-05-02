// JSON config files
const auth = require("./config/auth.json");
const ManaStack = require("./config/manastack.json");

// npm includes
const Discord = require("discord.js");

// Classessc
const CommandHandler = require("./src/Handlers/CommandHandler.js");
const TwitterFeed = require("./src/Feeds/Twitter");

class Bot {

	constructor()
	{
		this.client = new Discord.Client();
		this.CommandHandler = new CommandHandler();
		this.prefix = "!";

		this.login();
		this.onMessage();

		this.client.on("ready", () => {
			console.log("I am ready!");
			this.client.user.setActivity("!h or !help");

			//this.TwitterFeed = new TwitterFeed(this.client);

			// setInterval(() => {
			// 	this.TwitterFeed.checkTwitter();
			// }, ManaStack.api.social.twitter.updateInterval);	

		});
	}

	login()
	{
		this.client.login(auth.token);
	}

	onMessage()
	{
		this.client.on("message", (message) => {
			if (message.content.startsWith(this.prefix) && message.content.length > 1 && !message.author.bot) {
				this.CommandHandler.handle(message, this.prefix);
			} else {
				return;
			}
		});
	}

	onUserJoin()
	{
		client.on("guildMemberAdd", (member) => {
			newUsers.set(member.id, member.user);
		});
	}
}

const bot = new Bot();
