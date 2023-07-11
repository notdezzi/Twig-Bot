const discord = require('discord.js')
const config = require('../../config.json')
module.exports = {
	name: "Rock Paper Scissors",
	aliases: ["rps", "rock paper scissors"],
	category: "Fun",
	description: "Rock Paper Scissors with the bot.",
	usage: "rps",
	run: async (client, message, args) => {
		try {
			let embed = new discord.MessageEmbed()
				.setTitle("RPS GAME")
				.setDescription("React to play!")
				.setTimestamp()
				.setColor(config.embedColor)
				.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
			let msg = await message.channel.send(embed)
			await msg.react("🗻")
			await msg.react("✂")
			await msg.react("📰")

			const filter = (reaction, user) => {
				return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
			}

			const choices = ['🗻', '✂', '📰']
			const me = choices[Math.floor(Math.random() * choices.length)]
			msg.awaitReactions(filter, { max: 1, time: 60000, error: ["time"] }).then(
				async (collected) => {
					const reaction = collected.first()
					let result = new discord.MessageEmbed()
						.setTitle("RESULT")
						.addField("Your choice", `${reaction.emoji.name}`)
						.addField("My choice", `${me}`)
						.setColor(config.embedColor)
						.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
					await msg.edit(result)
					if ((me === "🗻" && reaction.emoji.name === "✂") ||
						(me === "📰" && reaction.emoji.name === "🗻") ||
						(me === "✂" && reaction.emoji.name === "📰")) {
						message.reply("You lost!");
					} else if (me === reaction.emoji.name) {
						return message.reply("It's a tie!");
					} else {
						return message.reply("You won!");
					}
				})
				.catch(collected => {
					message.reply('Process has been cancelled since you did not respond in time!');
				})
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