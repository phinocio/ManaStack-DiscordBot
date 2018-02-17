const CommandsList = require("./../Commands/CommandsList.js");

class CommandHandler
{
    handle(message)
    {
        let command = message.content.replace("!", "").split(" ")[0].toLowerCase();

        for(var commands in CommandsList)
        {
            var keys = commands.split("|");

            if(keys.includes(command))
            {
                new CommandsList[commands].command(message);
            }
        }
    }
}

module.exports = CommandHandler;    