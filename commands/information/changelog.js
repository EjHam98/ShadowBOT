const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
		.setDescription('Show the latest changes and updates to ShadowBOT'),
	async execute(interaction) {
    try {
      await interaction.reply(`**Latest Changes:**\n**1- **Something here.`);
    } 
    catch (error) {
      console.error(error);
      await interaction.reply('Failed to send response.');
    }
	},
};
