const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jinxes')
		.setDescription('Show the latest changes and updates to ShadowBOT'),
	async execute(interaction) {
    try {
      await interaction.reply(`**Full list of Djinxes can be found at the bottom of this page: **https://wiki.bloodontheclocktower.com/Djinn`);
    } 
    catch (error) {
      console.error(error);
      await interaction.reply('Failed to send response.');
    }
	},
};
