const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spectate')
		.setDescription('Add the spectator tag.'),
	async execute(interaction) {
		var tag = "!";
		var baseNickname = getBaseNickname(interaction.member.nickname || interaction.user.username, tag)

		try {
			var newNickname = `${tag}${baseNickname}`;
			await interaction.member.setNickname(newNickname);
			await interaction.reply(`${baseNickname} is now spectating.`);
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
  
