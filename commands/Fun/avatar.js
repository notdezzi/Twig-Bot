const { MessageEmbed } = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "Avatar",
  aliases: ["avatar"],
  description: "Get a members' avatar.",
  usage: "avatar [user mention]",
  category: "Fun",
  run: async (client, message, args) => {
           /* If user isnt found it selects ur profile */
            const member = message.mentions.members.first() || message.member;
            if (!member.user.avatarURL) return message.channel.send(`That user does not have an avatar`);
            const avatar = new Discord.MessageEmbed()
                .setTitle(`${member.user.username}'s Avatar`)
                .setColor("#ff712e")
                .setImage(member.user.displayAvatarURL({dynamic: true}))
                .setURL(member.user.displayAvatarURL({dynamic: true}))
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            message.channel.send(avatar)
        }
    };