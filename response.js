const { MessageEmbed } = require('discord.js');
//const { webhookId, webhookToken } = require('./config.json');

//const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });



// Steals user's name and icon then sends message. 
exports.response = async (interaction, message) => {
    //let icon = interaction.options.getUser().user.avatarURL();
    console.log("Starting response");
    /*const embed = new MessageEmbed()
        .setTitle('Some Title')
        .setColor('#0099ff');*/

    interaction.channel.createWebhook('Some-username', {
        avatar: 'https://i.imgur.com/AfFp7pu.png',
    })
        .then( async (webhook) => {
            console.log(`Created webhook ${webhook}`)
            await webhook.send({
                content: message,
                username: interaction.options.get('user', true).user.username,
                avatarURL: interaction.options.get('user', true).user.avatarURL(),
            });

            webhook.delete()
        
        })
        .catch(console.error);

    



}