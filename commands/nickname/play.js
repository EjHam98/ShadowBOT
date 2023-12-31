const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Remove all tags to join as a player'),
	async execute(interaction) {
		var tag = "!";
		var baseNickname = getBaseNickname(interaction.member.nickname || interaction.user.username, tag)

		try {
			await interaction.member.setNickname(baseNickname);
			await interaction.reply(`${baseNickname} is now ready to play.`);
		} 
		catch (error) {
			console.error(error);
			await interaction.reply('Failed to update username.');
		}
	},
};

function getBaseNickname(str) {
	substrings = ["(ST) ", "[ST] ", "(Co-ST) ", "(CoST) ", "[Co-ST] ", "[CoST] ", "(T) ", "[T] ", "!"];
	substrings.forEach(substring => {
		if (str.startsWith(substring)) {
			str = str.substring(substring.length);
		}
	});
	return str;
}
  
