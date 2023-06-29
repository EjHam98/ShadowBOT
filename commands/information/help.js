const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get full list of ShadowBOT commands and what they do.'),
	async execute(interaction) {
    try {
      await interaction.reply(`Replace this here with the list of commands, sent to the player via DM`);
    } 
    catch (error) {
      console.error(error);
      await interaction.reply('Failed to send response.');
    }
	},
};
