const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('brb')
		.setDescription('Add/remove the [BRB] tag'),
	async execute(interaction) {
		var tag = " [BRB]"
		var afktag = " [AFK]"

		var currNickname = interaction.member.nickname || interaction.user.username;

		if (currNickname.endsWith(afktag) || currNickname.endsWith(tag)){
			var newUsername = currNickname.slice(0, -tag.length);;
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
			newUsername = `${currNickname}${tag}`;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${currNickname} is now BRB.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
	},
};
