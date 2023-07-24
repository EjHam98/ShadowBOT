const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('consult')
		.setDescription('Ask Storyteller for a consultation.')
		,
		
		
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
	

		const st_tag = '(st)'
		const cost_tag = '(co-st)'

		// https://discordjs.guide/message-components/interactions.html
		const collectorFilter = i => ( i.member.nickname.toLowerCase().includes(st_tag) || i.member.nickname.toLowerCase().includes(cost_tag) ) ;
		try {
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

			if (confirmation.customId === 'confirm') {
				// Do channel movement shennanigans things here
				
				const consultCategory = interaction.member.voice.channel.parent;
				const consultSubstring = 'consult';

				// https://discord-api-types.dev/api/discord-api-types-v10/enum/ChannelType#GuildVoice 
				const consultChannel = consultCategory.children.cache.find(channel => 
					channel.type === ChannelType.GuildVoice && //"GuildVoice"
					channel.name.toLowerCase().includes(consultSubstring) && 
					channel.parentId === consultCategory.id
				);
				
				// await 
				await confirmation.member.voice.setChannel(consultChannel);
				await interaction.member.voice.setChannel(consultChannel);

				// await confirmation.update({ content: `Debug: ${confirmation.member.nickname}`, components: [] });

				await confirmation.update({ content: `Consult accepted`, components: [] });
			} else if (confirmation.customId === 'cancel') {
				await confirmation.update({ content: 'Action cancelled', components: [] });
			}

			// https://discordjs.guide/message-components/interactions.html

		} catch (e) {
			await interaction.editReply({ content: 'An error has occurred. Please try again.', components: [] });
		}

	}

};
