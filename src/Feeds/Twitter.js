const fetch = require("node-fetch");
const Discord = require("discord.js");
const manastack = require("./../../config/manastack.json");
const Moment = require("moment");

class Twitter
{
	constructor(client)
	{
		this.channel = client.channels.find("name", manastack.api.social.twitter.channel);
		this.recentPostDescription = '';
		this.getRecentPost();
	}

	async checkTwitter()
	{
		this.getRecentPost();
		await fetch(manastack.api.social.twitter.endpoint)
			.then(res => res.json())
			.then(json => {
				//if post is same as recent post, do nothing, else make new embed
				if(this.recentPostDescription === json[1].text)
				{
					console.log("Same tweet, don't post");
				} else {
					let twitterPost = new Discord.RichEmbed();
					twitterPost.setColor(json[0].user.profile_link_color);
					twitterPost.setTitle(json[0].user.screen_name + " Tweet");
					twitterPost.setThumbnail(json[0].user.profile_image_url_https);
					twitterPost.setDescription(json[1].text);
					//twitterPost.setURL(json[0].entities.urls[0].expanded_url);
					twitterPost.setFooter("Posted: " + Moment(json[0].created_at.date).format("dddd, MMMM Do YYYY"));
					this.respond(twitterPost);
				}
				
			}).catch(err => console.error(err));
	}

	getRecentPost()
	{
		this.channel.fetchMessages({ limit: 1 })
			.then(messages => { 
				const fetchedMsg = messages.first().embeds; // messages is a collection!)
				// do something with it
				console.log(fetchedMsg[0].description);
				this.recentPostDescription = fetchedMsg[0].description;
			})
			.catch(console.error);
	}
	

	respond(response)
	{
		// respond with the RichEmbed box.
		this.channel.send(response)
	}
}

module.exports = Twitter;
