const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('afk')
		.setDescription('Add/remove the AFK [AFK] tag'),
	async execute(interaction) {
		var tag = " [AFK]"
		if (interaction.member.nickname.endsWith(tag)){
			var newUsername = interaction.member.nickname.slice(0, -tag.length);;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${newUsername} is no longer AFK.`);
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
				await interaction.reply(`${interaction.member.nickname} is AFK.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
	},
};
