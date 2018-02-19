const fetch = require("node-fetch");
const Discord = require("discord.js");
const manastack = require("./../../config/manastack.json");



class CardSearch
{
    constructor(message)
    { 
        this.cardName = "";
        this.search = "";
        this.query = message.content;
        this.result = "";

        // Card search fields 
        this.set = "";
        this.text = "";
        this.type = "";

        this.handle(message);
    }

    handle(message)
    {
        // create the RichEmbed box
        // if(this.query.indexOf("--") > 0)
        // {
        //     this.cardName = message.content.substring(message.content.indexOf(" ")).split(" --")[1].trim();
        // } else {
        //     this.cardName = message.content.substring(message.content.indexOf(" ")).trim();
        // }

        this.search = this.query.substring(this.query.indexOf(" ")).split(" --");
        this.cardName = this.search[0].trim();
        this.checkFlags(this.search, message);
        this.getResult(message);



        //TODO: Check if flag exists
        //this.searchByName(message, cardName);
    }

    checkFlags(search, message)
    {

        for(var i = 1; i < search.length; i++)
        {
            var flag = search[i].split(" ");
            
            if (["s", "set", "sets"].includes(flag[0].trim()))
            {
                this.set = search[i].substring(search[i].indexOf(" ", 1)).trim();
            }
            if (["t", "text"].includes(flag[0].trim())) {
                this.text = search[i].substring(search[i].indexOf(" ", 1)).trim();
            }
            if (["ty", "type"].includes(flag[0].trim())) {
                this.type = search[i].substring(search[i].indexOf(" ", 1)).trim();
            }
        }
    }

    getResult(message)
    {
        fetch(manastack.api.cardSearch.single + this.cardName + "&sets=" + this.set + "&text=" + this.text + "&type=" + this.type + "&limit=5")
            .then(res => res.json())
            .then(json => {

                var cardSearch = new Discord.RichEmbed();
                var otherResults = [];

                if (json.length > 0) {
                    // TODO: Fix 'null' displayed for mana cost on lands
                    cardSearch.setTitle(json[0].name + " " + json[0].mana_cost);
                    cardSearch.setColor("BLUE");
                    cardSearch.setImage(encodeURI(manastack.api.images + json[0].set.slug + "/" + json[0].image + ".jpg"));
                    cardSearch.setDescription(json[0].type + "\n" + json[0].set.name + "\n\n" + json[0].text + "*");

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
                    cardSearch.setDescription("Query: " + this.cardName);

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