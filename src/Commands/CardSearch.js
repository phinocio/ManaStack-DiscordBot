const fetch = require("node-fetch");
const Discord = require("discord.js");
const manastack = require("./../../config/manastack.json");

class CardSearch {

	handle(message) {
		let search = message.content.substring(message.content.indexOf(" ")).split(" --");
		let flags = this.checkFlags(search);
		this.getResult(search[0].trim(), message, flags);
	}

	checkFlags(search) {
		let flags = {
			"set": "",
			"text": "",
			"type": ""
		};

		for (var i = 1; i < search.length; i++) {
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

	getResult(cardName, message, flags) {
		console.log(flags);
		fetch(manastack.api.cardSearch.single + cardName + "&sets=" + flags["set"] + "&text=" + flags["text"] + "&type=" + flags["type"] + "&limit=5")
			.then(res => res.json())
			.then(json => {

				var cardSearch = new Discord.RichEmbed();
				var otherResults = [];

				if (json.length > 0) {
					// TODO: Fix 'null' displayed for mana cost on lands
					cardSearch.setTitle(json[0].name + " " + json[0].mana_cost);
					cardSearch.setColor("BLUE");
					cardSearch.setImage(encodeURI(manastack.api.images + json[0].set.slug + "/" + json[0].image + ".jpg"));
					cardSearch.setDescription(json[0].type + "\n" + json[0].set.name + "\n\n" + json[0].text);

					if (json.length > 1) {

						for (var i = 1; i < json.length; i++) {
							otherResults[i] = "**" + json[i].name + "** (_" + json[i].set.name + "_)";
						}

						cardSearch.addField("Other Results", otherResults);
					}

					cardSearch.addBlankField();
					cardSearch.setFooter("Low: $" + json[0].price.low + " Med: $" + json[0].price.med + " High: $" + json[0].price.high);

					this.respond(message, cardSearch);
				} else {
					cardSearch.setTitle("Card Not Found");
					cardSearch.setDescription("Query: " + cardName);

					this.respond(message, cardSearch);
				}

			}).catch(err => console.error(err));
	}

	respond(message, response) {
		// respond with the RichEmbed box.
		message.channel.send(response);
	}
}

module.exports = CardSearch;