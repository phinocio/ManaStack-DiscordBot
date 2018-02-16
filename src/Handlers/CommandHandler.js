"use strict";

const CardSearch = require("./../Commands/CardSearch.js");

class CommandHandler
{
    constructor(message)
    {
        this.handle(message);
    }

    handle(message) 
    {
        let command = message.content.replace("!", "").split(" ")[0].toLowerCase();

        if(command === "cs" || command === "cardsearch")
        {
            new CardSearch(message);
        } else if(command === '') 
        {
            return;
        } else {
            message.channel.send("**Unknown Command:** " + command);
        }
    }
}

module.exports = CommandHandler;    