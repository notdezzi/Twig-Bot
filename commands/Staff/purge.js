const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "purge",
    aliases: ["clear"],
    category: "Staff",
    description: "Deletes messages in a text channel or specified number of messages in a text channel.",
    usage: "purge <Amount of messages>",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply(`You are not allowed to run this command`)
        let clearamount = Number(args[0]);
        if (!args[0]) {
            await message.channel.bulkDelete(parseInt(5) + 1).catch(err => console.log(err))
            const embed = new MessageEmbed()
            embed.setTitle("🧹 5 messages successfully deleted!")
            .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
            .setColor("#ff712e")

            message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 5000 });
            })
                .catch();
        }

        if(clearamount >= 1 && clearamount<= 100){
            message.channel.bulkDelete(clearamount);
            let embed = new Discord.MessageEmbed()
            .setColor("#ff712e")
            .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`🧹 ${clearamount} messages successfully deleted!`)
            message.reply(embed).then(msg => msg.delete({ timeout: 5000 }));
        }
        else{
            message.reply("The value must be between `1` and `100`!");
        }
        
    }
}