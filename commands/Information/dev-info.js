const moment = require('moment');
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "dev-info",
    category: "Information",
    aliases: ["devinfo", "dev"],
    cooldown: 2,
    usage: "dev-info",
    description: "Gives you information on on the Developer",
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
                .setThumbnail("https://cdn.discordapp.com/avatars/683877935219998760/45bc900c8426c45e401f10f505b23a59.webp")
                .setTitle(`👨‍💻 Developer Info...`)
                .addField('Discord Username', 'dezzi#6660')
                .addField('Name', "dezzi aka. Max")
                .addField('ID', '683877935219998760')
                .addField('Tag', '#6660')
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
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
