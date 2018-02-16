const CardSearch = require("./../Commands/CardSearch.js");

class CommandHandler
{
    

    constructor(message)
    {
        this.handle(message);
    }

    handle(message) 
    {
        const commandsList = {
            "cs": CardSearch,
            "cardsearch": CardSearch
        }

        let command = message.content.replace("!", "").split(" ")[0].toLowerCase();

        if(commandsList[command])
        {
            new commandsList[command](message);
        } else if(command === '') 
        {
            return;
        } else {
            message.channel.send("**Unknown Command:** " + command);
        }
    }
}

module.exports = CommandHandler;    