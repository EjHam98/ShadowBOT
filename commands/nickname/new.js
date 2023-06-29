const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('brb')
		.setDescription('Add/remove the [N] tag for New Players'),
	async execute(interaction) {
		var tag = " [N]"
		if (interaction.member.nickname.endsWith(tag)){
			var newUsername = interaction.member.nickname.slice(0, -tag.length);;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${newUsername} removed [N] tag.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
		else{
			var newUsername = `${interaction.member.nickname}${tag}`;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${interaction.member.nickname} added [N] tag.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
	},
};
