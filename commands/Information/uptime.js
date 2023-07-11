const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const { duration } = require("../../handlers/functions")
module.exports = {
    name: "uptime",
    category: "Information",
    cooldown: 10,
    usage: "uptime",
    description: "Returns the duration on how long the Bot is online",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(config.embedColor)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`:white_check_mark: **${client.user.username}** is since:\n ${duration(client.uptime)} online`)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(config.embedColorError)
            .setTitle(`❌ ERROR | An error occurred`)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
