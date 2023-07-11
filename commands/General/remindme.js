const Discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")
const config = require('../../config.json')
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "remindme",
    category: "General",
    aliases: ["reminder", "remind"],
    description: "Reminds user in x seconds/minutes/hours for certain reason",
    usage: "remindme <time> <reason>",

    run: async (client, message, args) => {
        try {
            let timeuser = args[0]
            let reason = args.slice(1).join(" ")

            if (!timeuser) return message.reply(":x: You should enter time (10m, 10s, 10d)")
            if (!reason) return message.reply(":x: You should enter reason")
            db.set(`remind.${message.author.id}`, Date.now() + ms(timeuser))
            const embed = new MessageEmbed()
                .setTitle('⏰ Reminder set! ⏰')
                .setColor(config.embedColor)
                .setDescription(`Reminder set for **${timeuser}** with \"**${reason}**\" as a reason`);
            message.channel.send(embed);
            const interval = setInterval(function () {


                if (Date.now() > db.fetch(`remind.${message.author.id}`)) {
                    db.delete(`remind.${message.author.id}`)
                    message.reply(`⏰ **Reminder: **${reason} ⏰`)
                    message.author.send(`⏰ **Reminder: **${reason} ⏰`)
                        .catch(e => console.log(e))
                    clearInterval(interval)

                }
            }
            )
        }
        catch (e) {
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