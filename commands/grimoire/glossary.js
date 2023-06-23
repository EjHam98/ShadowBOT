const rp = require("request-promise-native");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js");

const wikiPage = "https://wiki.bloodontheclocktower.com/Glossary";
const wikiApi = "https://wiki.bloodontheclocktower.com/api.php?action=query&prop=categories|revisions&rvprop=content&format=json&rvslots=*&titles=Glossary";
var definitions = new Map();

// // Fetching definitions from the glossary
async function fetchDefinitions() {
	const body = await rp({url: wikiApi, json: true});
	if (body.query && body.query.pages["192"]) {
		const page = body.query.pages["192"];
		const glossary = page.revisions[0].slots.main['*'].replace(/\n +\n/,"\n\n").split("\n\n").map(e =>
		(e.match(/^'''(.*?):?''':? (.*)$/) || []).splice(1,2));
		definitions = new Map(glossary.map(e => [e[0].trim().toLowerCase(), {
		title: e[0],
		definition: e[1]
		}]));
	} else throw new Error('not found');
	return definitions
}

function generateEmbed({ title, definition }) {
	// instantiate embed object
	return new Discord.EmbedBuilder()
		.setTitle('Glossary: ' + title)
		.setDescription(definition)
		.setColor(0x2096ff)
		.seturl(wikiPage)
	;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('glossary')
		.setDescription('Search the glossary for a definition!')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('The input to echo back')),

	async execute(interaction) {
		const term = interaction.options.getString('term');
		const definitions = fetchDefinitions();

		if (!term) {
			await interaction.reply("Please enter a term to search the glossary.");
			return;
		}

		const search = term.toLowerCase();
		let description = 'No glossary entry matched `' + search + '`.';
		const embed = new Discord.EmbedBuilder()
			.setTitle('Error')
			.setDescription(description)
			.setColor(0xff0000)
		;
		
		console.log(definitions);
		if(definitions.has(search)) {
			// generate embed
			const reply = generateEmbed(definitions.get(search));
			const messageId = await interaction.reply({ embeds: [ reply ] });
		} 
		else {
			const messageId = await interaction.reply({ embeds: [ embed ] });
		}

	},
};


