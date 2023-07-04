const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('afk')
		.setDescription('Add/remove the [AFK] tag'),
	async execute(interaction) {
		var tag = " [AFK]"
		var brbtag = " [BRB]"

		var currNickname = interaction.member.nickname || interaction.user.username;

		if (currNickname.endsWith(tag) || currNickname.endsWith(brbtag)){
			var newUsername = currNickname.slice(0, -tag.length);;
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
			var newUsername = `${currNickname}${tag}`;
			try {
				await interaction.member.setNickname(newUsername);
				await interaction.reply(`${currNickname} is now AFK.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
	},
};
