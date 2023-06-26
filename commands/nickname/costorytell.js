const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('costorytell')
		.setDescription('Add/remove the Co-Storyteller (Co-ST) tag'),
	async execute(interaction) {
		var tag = "(Co-ST) ";

		var baseNickname = getBaseNickname(interaction.member.nickname, tag)

		if (baseNickname.startsWith(tag)){
			var newNickname = baseNickname.substring(tag.length);
			try {
				await interaction.member.setNickname(newNickname);
				await interaction.reply(`${newNickname} is no longer the Co-ST.`);
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
				await interaction.reply(`${newNickname} is now the Co-ST.`);
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
  