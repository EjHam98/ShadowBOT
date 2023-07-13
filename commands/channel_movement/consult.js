const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('consult')
		.setDescription('Ask Storyteller for a consultation.'),

		
	async execute(interaction) {

		// Build a custom button
		// https://discordjs.guide/message-components/buttons.html
		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Accept')
			.setStyle(ButtonStyle.Primary);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(confirm, cancel);

		// Add buttons
		const response = await interaction.reply({
			content: `${interaction.user.nickname || interaction.user.username } has requested for a ST consult!`,
			components: [row],
		});
	
		// https://discordjs.guide/message-components/interactions.html
		const collectorFilter = i => true;
		// try {
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

			if (confirmation.customId === 'confirm') {
				// Do channel movement shennanigans things here
				
				const consultCategory = interaction.member.voice.channel.parent;
				const consultSubstring = 'consult';

				// consultCategory.children.cache.forEach([channelId, channel]=> {
				// 	// if (channel.toLowerCase().includes(consultSubstring)){
				// 	// 	await confirmation.update({ content: `Debug: ${channel}`, components: [] });
				// 	// }
				// 	await confirmation.update({ content: `Debug: ${channel}`, components: [] });
				// })

				const consultChannel = consultCategory.children.cache.filter(channel => 
					channel.type === 'GUILD_VOICE' && 
					channel.name.toLowerCase().includes(consultSubstring) && 
					channel.parentId === consultCategory.id
				);

				// await interaction.member.voice.setChannel(consultChannel);
				await confirmation.update({ content: `Debug: ${typeof(consultChannel)}`, components: [] });
				
				// await confirmation.update({ content: `Debug: ${consultCategory.children}`, components: [] });

				// await confirmation.update({ content: `Consult accepted`, components: [] });
			} else if (confirmation.customId === 'cancel') {
				await confirmation.update({ content: 'Action cancelled', components: [] });
			}
		// } catch (e) {
		// 	await interaction.editReply({ content: 'An error has occurred. Please try again.', components: [] });
		// }
	}

};
