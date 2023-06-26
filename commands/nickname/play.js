const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Add/remove the spectator ! tag'),
	async execute(interaction) {
		if (interaction.member.nickname.startsWith("!")){
			var newUsername = interaction.member.nickname.substring(1);
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${newUsername} is playing.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
		else{
			var newUsername = `!${interaction.member.nickname}`;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${newUsername} is spectating.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
	},
};
