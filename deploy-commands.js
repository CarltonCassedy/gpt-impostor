const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// Creates an array of json command objects
// i.e. the list of commands users can use with the bot
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('train').setDescription('Trains GPT-Imposter on the chat history of this server'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);


rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
   

/*
rest.put(Routes.commands())
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
   */ 