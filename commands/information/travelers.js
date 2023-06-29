const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('travelers')
		.setDescription('Show basics for how Travelers work in BOTC'),
	async execute(interaction) {
    try {
      await interaction.reply(`**<[=+----+={ Travellers Guide }=+----+=]>**\n**Travelers** are a special type of roles given to players who join the game late or have to leave it before it finishes. Typically powerful, their alignment (Good/Evil) is decided by the Storyteller as soon as they join.\n**If Evil**, they learn who the demon is, Evil players do **not learn** if the traveler is evil.\nA traveler cannot be **executed** instead they are **exiled**; Once per day any player, dead or alive, can call for the exile of the traveler, **all players** whether alive, dead or without a dead vote can still vote on the exile, dead votes are not spent when dead players vote on the exile. The majority required is relative to the number of all players, not just the alive ones.`);
    } 
    catch (error) {
      console.error(error);
      await interaction.reply('Failed to send response.');
    }
	},
};
