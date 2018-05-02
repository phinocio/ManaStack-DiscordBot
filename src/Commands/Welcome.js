// Import the command class so Welcome can extend it
const Command = require('./Command');

// Declares the class for handling the !w or !welcome command
class Welcome extends Command
// Opening bracket for the class
{	
	// hHndles the message, taking as an argument the message and info itself 
	handle(message)
	// Opening bracket for the handle method
	{		
		// launches a nuke at NK if Marc enters the server
		let newMessage = message.content.substring(message.content.indexOf(" ")).trim();


		// Calls the respond method passing in the original message info and the newMessage to reply to the channel with. 
		this.respond(message, newMessage);
	// Closing bracket for the handle method
	}


	// Responds to the message with a resonse. 
	respond(message, response)
	// Opening bracket for the respond method
	{
		// Sends the response to the channel that the command was entered from
		message.channel.send(response);
	// Closing bracket for the respond method
	}

// Closing bracket for the class
}

// Exports the class to be used in CommandManager
module.exports = Welcome;
