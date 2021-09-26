const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// Creates an array of json command objects
// i.e. the list of commands users can use with the bot
const commands = [
	new SlashCommandBuilder().setName('serverinfo').setDescription('Get information such as when the bot was last trained for this server, and more.'),
	new SlashCommandBuilder().setName('setuser').setDescription('Set the bot to impersonate a specific user whenever someone pings them.')
		.addUserOption(option => option.setName('user').setDescription('the user to impersonate').setRequired(true)),
	new SlashCommandBuilder().setName('sus').setDescription('Tell the bot to send a single message as this user')
		.addUserOption(option => option.setName('user').setDescription('the user to impersonate').setRequired(true)),
	new SlashCommandBuilder().setName('train').setDescription('Trains GPT-Imposter on the chat history of this server')
		.addChannelOption(option => option.setName('channel1').setDescription('First channel to scan').setRequired(true))
		.addChannelOption(option => option.setName('channel2').setDescription('Add up to 4 additional channels to scan, which is optional but recommended.'))
		.addChannelOption(option => option.setName('channel3').setDescription('3rd channel'))
		.addChannelOption(option => option.setName('channel4').setDescription('4th channel'))
		.addChannelOption(option => option.setName('channel5').setDescription('5th channel')),
	new SlashCommandBuilder().setName('stop').setDescription('Stop the bot from actively impersonating anyone.'),
	new SlashCommandBuilder().setName('monologue').setDescription('Have the bot continue the conversation for you!')
		.addUserOption(option => option.setName('user').setDescription('the user who will begin the conversation').setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

let pog = async () => {
	await rest.put(Routes.applicationCommands(clientId), { body: [] })
		.catch(console.error);
	console.log('Successfully wiped application commands.')

	await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
		.catch(console.error);
	console.log('Successfully wiped guild commands.')


	await rest.put(Routes.applicationCommands(clientId), { body: commands })
		.catch(console.error);
	console.log('Successfully registered application commands.')
}

pog();