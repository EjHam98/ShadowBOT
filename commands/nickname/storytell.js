const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('storytell')
		.setDescription('Add/remove the Storyteller (ST) tag'),
	async execute(interaction) {
		var tag = "(ST) ";

		var baseNickname = getBaseNickname(interaction.member.nickname || interaction.user.username, tag)

		if (baseNickname.startsWith(tag)){
			var newNickname = baseNickname.substring(tag.length);
			try {
				await interaction.member.setNickname(newNickname);
				await interaction.reply(`${newNickname} is no longer the ST.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
		else{
			var newNickname = `${tag}${baseNickname}`;
			try {
				await interaction.member.setNickname(newNickname);
				await interaction.reply(`${newNickname} is now the ST.`);
			} 
			catch (error) {
				console.error(error);
				await interaction.reply('Failed to update username.');
			}
		}
	},
};

function getBaseNickname(str, tag) {
	substrings = ["(ST) ", "(Co-ST) ", "(T) ", "!"];
	substrings.forEach(substring => {
		if (str.startsWith(substring) && substring != tag) {
			str = str.substring(substring.length);
		}
	});
	return str;
}
  