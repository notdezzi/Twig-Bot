const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "ping",
    category: "Information",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Gives you information on how fast the Bot can respond to you",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(config.embedColor)
        .setTitle(`🏓 Pinging....`)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      ).then(msg=>{
        msg.edit(new MessageEmbed()
          .setColor(config.embedColor)
          .setTitle(`🏓 Ping is \`${Math.round(client.ws.ping)}ms\``)
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        );
      })
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
