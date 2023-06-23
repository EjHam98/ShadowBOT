const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('storytell')
		.setDescription('Add the Storyteller (ST) tag'),
	async execute(interaction) {
		await interaction.reply('Pong!');
		// EXECUTE ACTION HERE
	},
};
