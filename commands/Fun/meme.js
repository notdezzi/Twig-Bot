const { MessageEmbed } = require("discord.js");
const discord = require('discord.js');
const randompuppy = require('random-puppy');
const config = require('../../config.json')
module.exports = {
  name: "Meme",
  aliases: ["meme"],
  category: "Fun",
  description: "Get a random Meme.",
  usage: "meme",
  run: async (client, message, args) => {
    try {
      const subReddits = ["meme", "me_irl", "dankmeme"]
      const random = subReddits[Math.floor(Math.random() * subReddits.length)];
      const img = await randompuppy(random);

      const embed = new MessageEmbed()
        .setImage(img)
        .setColor(config.embedColor)
        .setTitle(`From /r/${random}`)
        .setURL(`http://reddit.com/${random}`)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))

      message.channel.send(embed);
    } catch {
      const embed0 = new MessageEmbed()
        .setColor(embedColor)
        .addField(`Error`, `Sorry, that didnt work try again.`)
      message.channel.send({ embed: embed0 }).then(msg => {
        msg.delete({ timeout: 5000 });
      })
        .catch();
    }
  }
}