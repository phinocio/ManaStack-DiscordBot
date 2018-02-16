"use strict";

const fetch = require("node-fetch");
const Discord = require("discord.js");
const manastack = require("./../../manastack.json");

class CardSearch
{
    constructor(message)
    {
        this.handle(message);
    }

    handle(message)
    {
        // create the RichEmbed box
        let cardName = message.content.substring(message.content.indexOf(" ")).trim();

        fetch(manastack.api.cardSearch.single + cardName + "&limit=5")
            .then(res => res.json())
            .then(json => {

                var cardSearch = new Discord.RichEmbed();
                var otherResults = [];

                if(json.length > 0)
                {
                    // TODO: Fix 'null' displayed for mana cost on lands
                    cardSearch.setTitle(json[0].name + " " + json[0].mana_cost);
                    cardSearch.setColor("BLUE");
                    cardSearch.setThumbnail(encodeURI(manastack.api.images + json[0].set.slug + "/" + json[0].image + ".jpg"));
                    cardSearch.setImage(encodeURI(manastack.api.images + json[0].set.slug + "/" + json[0].image + ".jpg"));
                    cardSearch.setDescription("***Set:** " + json[0].set.name + "\n\n" + json[0].text + "*");

                    if (json.length > 1) {

                        for (var i = 1; i < json.length; i++) {
                            otherResults[i] = json[i].name;
                        }

                        cardSearch.addField("Other Results", otherResults);
                    }

                    cardSearch.addBlankField();
                    cardSearch.setFooter("Low: $" + json[0].price.low + " Med: $" +  json[0].price.med + " High: $" + json[0].price.high);

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