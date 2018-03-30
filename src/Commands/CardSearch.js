const fetch = require("node-fetch");
const Discord = require("discord.js");
const manastack = require("./../../config/manastack.json");
const Command = require('./Command');

class CardSearch extends Command
{
	handle(message)
	{	
		
		//Check for an em-dash because iOS is dumb af and changes -- to —
		while(message.content.indexOf("—") > 0)
		{
			message.content = message.content.replace("—", "--");
		}
		let search = message.content.substring(message.content.indexOf(" ")).split(" --");
		let flags = this.checkFlags(search, message);
		
		this.getResult(search[0].trim(), message, flags);
	}

	checkFlags(search, message)
	{
		let flags =	 {
			"set": '',
			"text": '',
			"type": ''
		};

		for(var i = 1; i < search.length; i++) {
			var flag = search[i].split(" ");

			flag = flag[0].trim();
			var searchText = search[i].substring(search[i].indexOf(" ", 1)).trim();

			if (["s", "set", "sets"].includes(flag)) {
				flags["set"] = searchText;
			}

			if (["t", "text"].includes(flag)) {
				flags["text"] = searchText;
			}

			if (["ty", "type"].includes(flag)) {
				flags["type"] = searchText;
			}
		}
		return flags;
	}

	getResult(cardName, message, flags)
	{
		fetch(manastack.api.cardSearch.single + cardName + "&sets=" + flags["set"] + "&text=" + flags["text"] + "&type=" + flags["type"] + "&limit=5&distinct=name")
			.then(res => res.json())
			.then(json => {

				let cardSearch = new Discord.RichEmbed();
				let otherResults = [];

				if (json.length > 0) {
					let card = json[0];
					cardSearch.setTitle(card.name);
					cardSearch.setColor("BLUE");
					cardSearch.setImage(encodeURI(manastack.api.images + card.set.slug + "/" + card.image + ".jpg"));
					cardSearch.setDescription(card.type + "\n" + card.set.name + "\n\n" + card.text);

					if (json.length > 1) {
						for (var i = 1; i < json.length; i++) {
							otherResults[i] = "**" + json[i].name + "** (_" + json[i].set.name + "_)";
						}
						cardSearch.addField("Other Results", otherResults);
					}

					cardSearch.addBlankField();
					cardSearch.setFooter("Low: $" + card.price.low + " Med: $" + card.price.med + " High: $" + card.price.high);

					this.respond(message, cardSearch);
				} else {
					cardSearch.setTitle("Card Not Found");
					cardSearch.setDescription("Query: " + cardName);
					this.respond(message, cardSearch);
				}

			}).catch(err => console.error(err));
	}

	respond(message, response)
	{
		// respond with the RichEmbed box.
		message.channel.send(response);
	}
}

module.exports = CardSearch;
