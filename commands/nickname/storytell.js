const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('storytell')
		.setDescription('Add/remove the Storyteller (ST) tag'),
	async execute(interaction) {
		if (interaction.member.nickname.startsWith("(ST) ")){
			var newUsername = interaction.member.nickname.substring(5);
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${interaction.member.nickname} is no longer the ST.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
		else{
			var newUsername = `(ST) ${interaction.member.nickname}`;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${interaction.member.nickname} is now the ST.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
	},
};
