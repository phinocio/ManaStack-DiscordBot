const CommandsList = require("./../Commands/CommandsList.js");
const MiscCommandsList = require("./../Commands/MiscCommandsList.js");

class CommandHandler
{
    handle(message, prefix)
    {
        let command = message.content.replace(prefix, "").split(" ")[0].toLowerCase();

        if(MiscCommandsList[command])
        {
            this.respond__miscCommand(message, command);
        } else {
            for(var key in CommandsList)
            {
                var keys = key.split("|");

                if (keys.includes(command)) {
                    this.respond__Command(message, key, command);
                }
            }
        }
    }

    respond__Command(message, key, command)
    {
        new CommandsList[key].command(message);
    }

    respond__miscCommand(message, command)
    {
        message.channel.send(MiscCommandsList[command]);
    }
}

module.exports = CommandHandler;    