const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Add/remove the spectator ! tag'),
	async execute(interaction) {
		var tag = "!";

		var baseNickname = getBaseNickname(interaction.member.nickname, tag)

		if (baseNickname.startsWith(tag)){
			var newNickname = baseNickname.substring(tag.length);
			try {
				await interaction.member.setNickname(newNickname);
				await interaction.reply(`${newNickname} is now playing.`);
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
				await interaction.reply(`${newNickname} is now spectating.`);
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
  