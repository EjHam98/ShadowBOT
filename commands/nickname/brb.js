const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('brb')
		.setDescription('Add/remove the [BRB] tag'),
	async execute(interaction) {
		var tag = " [BRB]"
		var afktag = " [AFK]"
		if (interaction.member.nickname.endsWith(afktag)){
			var newUsername = interaction.member.nickname.slice(0, -tag.length);;
			try {
				await interaction.member.setNickname(newUsername);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
			newUsername = `${interaction.member.nickname}${tag}`;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${interaction.member.nickname} is now BRB.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
		if (interaction.member.nickname.endsWith(tag)){
			var newUsername = interaction.member.nickname.slice(0, -tag.length);;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${newUsername} is no longer BRB.`);
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
				await interaction.reply(`${interaction.member.nickname} is now BRB.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
	},
};
