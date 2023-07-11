const moment = require('moment');
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "bot-info",
    category: "Information",
    aliases: ["botinfo", "bot"],
    cooldown: 2,
    usage: "bot-info",
    description: "Gives you information on on the Bot",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let stat = {
                online: "https://emoji.gg/assets/emoji/9166_online.png",
                idle: "https://emoji.gg/assets/emoji/3929_idle.png",
                dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
                offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
            }
            let statstr = {
                online: "Online",
                idle: "Idle",
                dnd: "Do Not Disturb",
                offline: "Offline"
            }
            message.channel.send(new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .setTitle(`🤖 Bot Info...`)
                .addField('Developer', 'dezzi#6660')
                .addField('Bot Name', client.user.username)
                .addField('Bot ID', client.user.id)
                .addField('Bot Tag', '#' + client.user.discriminator)
                .addField("Joined At", moment(user.joinedDiscordAt).format("LLLL"))
                .setFooter(statstr[user.presence.status], stat[user.presence.status])
            )
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
