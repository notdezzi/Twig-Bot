const { MessageEmbed } = require("discord.js");
const config = require('../../config.json')
module.exports = {
    name: "Coinflip",
    aliases: ["coinflip", "flip", "coin"],
    category: "Fun",
    description: "Flip a coin.",
    usage: "coinflip",
    run: async (client, message, args) => {
        try {
            const choices = ["heads", "tails"];
            const choice = choices[Math.floor(Math.random() * choices.length)];
            let embed = new MessageEmbed()
                .setTitle("Coinflip!")
                .setColor(config.embedColor)
                .setDescription(`You flipped a **${choice}**!`)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
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