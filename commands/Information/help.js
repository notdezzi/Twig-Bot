const { MessageEmbed, Message } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const ms = require('ms')
module.exports = {
    name: "help",
    aliases: ["h"],
    category: "Information",
    description: "Returns all commands, or one specific command info",
    usage: "help [command | alias]",
    run: async (client, message, args) => {
        try {
            // If there's an args found
            // Send the info of that command found
            // If no info found, return not found embed.
            if (args[0]) {
                return getCMD(client, message, args[0]);
            } else {
                // Otherwise send all the commands available
                // Without the cmd info
                return getAll(client, message);
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(config.embedColorError)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            );
        }
    }
}


function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor(config.embedColor)
        .setImage("https://cdn.discordapp.com/attachments/827688130454618122/827884842846781460/help.png")
    // Map all the commands
    // with the specific category
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- **${cmd.name}** \n *${cmd.description}*`)
            .join("\n");
    }
    // Map all the categories
    const info = client.categories
        .map(cat => stripIndents` \n **__${cat[0].toUpperCase() + cat.slice(1)}__** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n \n" + category);

    embed.setDescription(info)
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed)
}


function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    // Get the cmd by the name or alias
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    let info = `No information found for command **${input.toLowerCase()}**`;
    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }
    // Add all cmd info to the embed
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
    return message.channel.send(embed.setColor(config.embedColor).setDescription(info));
}