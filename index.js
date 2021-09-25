// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const fetchAll = require('discord-fetch-all');
const { trainGuild } = require('./training.js');
const { inference } = require('./inference.js');

var trainingGuilds = [];

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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
		
		await interaction.reply('this message is impersonating' + await interaction.options.get('user', true));
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
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

// Login to Discord with your client's token
client.login(token);