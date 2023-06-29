const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('basics')
		.setDescription('Show basics for BOTC and the usage of the online apps'),
	async execute(interaction) {
    try {
      await interaction.reply(``);
    } 
    catch (error) {
      console.error(error);
      await interaction.reply('Failed to send response.');
    }
	},
};
