"use strict";

// JSON config files
const auth = require("./config/auth.json");

// npm includes
const Discord = require("discord.js");
const client = new Discord.Client();

// Classes
const CommandHandler = require("./src/Handlers/CommandHandler.js");

const prefix = "!";

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    if(message.content.startsWith(prefix))
    {
        new CommandHandler(message);
    }
});

client.login(auth.token);