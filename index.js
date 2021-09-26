// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const fetchAll = require('discord-fetch-all');
const { trainGuild } = require('./training.js');
const { inference } = require('./inference.js');
const { response } = require('./response.js');

var trainingGuilds = [];

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

let replyingForUserId = "";

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// We tell Discord.JS to call this function when we get a command
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'sus') {
		inference(interaction);

		console.log("Impersonating ")
		console.log(await interaction.options.get('user', true).user.username);

		//await interaction.reply("sus");
	} else if (commandName === 'monologue') {
		inference(interaction);
		console.log("Conversation mode in progress")

	} else if (commandName === 'setuser') {
		//await interaction.reply('Server info.');
		//response(interaction, "test message");
		let user = await interaction.options.get('user', true).user;
		replyingForUserId = user.id;
		await interaction.reply(
			'Your Impostor will now respond for '
			+ user.username
			+ ' whenever someone pings them.'
		);

	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	} else if (commandName === 'train') {
		// If we are currently in the process of training for a specific server, and a user
		// calls the train command again, we will tell them so, and not reinitiate the process
		if (trainingGuilds.includes(interaction.guildId)) {
			interaction.reply("I'm already training for this server!")
			return;
		}
		trainingGuilds.append(interaction.guildId)
		trainGuild(interaction)
		// Remove the server from the "already training" list
		const index = trainingGuilds.indexOf(interaction.guildId);
		if (index > -1) {
			trainingGuilds.splice(index, 1);
		}
		// TODO
		// catch error and handle, including removing the guild from the training list
	}
});

client.on('messageCreate', (message) => {
	console.log("On message");
	if (message.mentions.users.has(replyingForUserId) && !message.author.bot) {
		message.reply(`my prefix here is ${prefix}`)
		return
	};
});

// Login to Discord with your client's token
client.login(token);