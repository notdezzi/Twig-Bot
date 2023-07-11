const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "invite",
    category: "Information",
    description: "Get the invite link of the Bot.",
    usage: "invite",
    timeout: 10000,

    run: async (client, message, args) => {
        try {
            const embedinvite = new MessageEmbed()
            .setAuthor(`✉️ Invite the Bot`, "", "https://discord.com/api/oauth2/authorize?client_id=811669742988820510&permissions=8&scope=bot)")
            .setColor("#ff712e")
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`[\`CLICK HERE\`](https://discord.com/api/oauth2/authorize?client_id=811669742988820510&permissions=8&scope=bot)`)
    

            message.channel.send(embedinvite)
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