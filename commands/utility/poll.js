const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates a script poll')
        // .addBooleanOption(option =>
        //     option.setName('custom')
        //         .setDescription('Whether or not to add custom scripts as an option'))
        ,

	async execute(interaction) {
        const tb = new ButtonBuilder()
			.setCustomId('tb')
			.setLabel('Trouble Brewing')
			.setStyle(ButtonStyle.Primary);

		const snv = new ButtonBuilder()
			.setCustomId('snv')
			.setLabel('Sects & Violets')
			.setStyle(ButtonStyle.Success);

		
		const bmr = new ButtonBuilder()
			.setCustomId('bmr')
			.setLabel('Bad Moon Rising')
			.setStyle(ButtonStyle.Danger);

		const customscript = new ButtonBuilder()
			.setCustomId('custom')
			.setLabel('Custom')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(tb, snv, bmr, customscript);
	
		const pollEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Script Poll')
			.setAuthor({ name: `${(interaction.member.nickname || interaction.user.username)}`})
			.setDescription('Click on the buttons below to vote!')
			.setThumbnail('https://cdn.icon-icons.com/icons2/1369/PNG/512/-poll_89868.png')
			.addFields(
				{ name: 'Trouble Brewing', value: 'NIL', inline: true},
				{ name: 'Sects & Violets', value: 'NIL', inline: true },
				{ name: ' ', value: ' ' },
				{ name: 'Bad Moon Rising', value: 'NIL', inline: true },
				{ name: 'Custom Scripts', value: 'NIL', inline: true },
			)
			.setFooter({ text: '!!! Only players without the spectator tag may vote.' });

		// Add buttons
		const response = await interaction.reply({
			content: `${interaction.user.nickname || interaction.user.username } has set up a script poll!`,
			embeds: [pollEmbed],
			components: [row],
		});

		const collector = response.createMessageComponentCollector({ time: 600_000 });

		collector.on('collect', async i => {
			// const selection = i.values[0];
			
			if ((i.member.nickname || i.user.username).startsWith("!")){
				await i.reply({ content: `Nice try, ${i.user}. Spectators can't vote.`, ephermal: true });
			}
			else {
				switch (i.customId){

					case "tb":
	
						break;
					case "snv":
	
						break;
					case "bmr":
	
						break
					case "custom":
	
						break
				}
				await i.reply(`${i.user} has pressed a button with response ${i.customId}!`);
			}
			
		});

	},
};
