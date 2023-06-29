const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('basics')
		.setDescription('Show basics for BOTC and the usage of the online apps'),
	async execute(interaction) {
    try {
      await interaction.reply(`**<[=+----+={ Welcome to Blood On The Clocktower }=+----+=]>**\n----------------------------\n**<[=+----+={  Bra1n Tool Basics  }=+----+=]>**\n\n**1- Click** on your **name** on the grim and choose **Claim Seat** to claim your seat.\n**2- Press R** to see the **Role Sheet**.\n**3- Press V** to see the **Vote History**.\n**4- Press N** to see the roles' **Night Order**.\n\n**<[=+----+={  Basic BOTC Slang Terminology  }=+----+=]>**\n\n**Starpass:** The Imp can kill themselves, and an alive minion becomes the new Imp.\n**Mayor Bounce:** If the Demon attacks the Mayor in the night, another player might die instead (ST Chooses whether that happens and who gets killed instead).\n**Three-for-three or Two-for-Two:** The players exchange a number of roles, and would *typically* include their real role.\n**Hard Claim:** A claim of a single role that is *supposed* to be the player's real role.\n**Pings:** A player having pings on them means there's information pointing to what their role or alignment might be. (e.g Washerwoman, Investigator, Fortune Teller, etc).\n**Evil Ping:** When information points to someone being potentionally evil. (e.g Investigator, Empath, etc)\n**Proc:** To trigger a trigger-based ability. (e.g Virgin).\n**Top Four:** Top 4 roles of the role sheet, More specifically the roles that get all of their information on the first night of the game.`);
    } 
    catch (error) {
      console.error(error);
      await interaction.reply('Failed to send response.');
    }
	},
};
