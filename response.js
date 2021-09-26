const { MessageEmbed } = require('discord.js');
//const { webhookId, webhookToken } = require('./config.json');

//const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });



// Steals user's name and icon then sends message. 
exports.response = async (channel, username, userAvatarURL, message) => {
    //let icon = interaction.options.getUser().user.avatarURL();
    console.log("Starting response");
    /*const embed = new MessageEmbed()
        .setTitle('Some Title')
        .setColor('#0099ff');*/

    channel.createWebhook('Some-username', {
        avatar: 'https://i.imgur.com/AfFp7pu.png',
    })
        .then( async (webhook) => {
            //console.log(`Created webhook ${webhook}`)
            if (message === '' || username === '') {
                return;
            }
            await webhook.send({
                content: message,
                username: username,
                avatarURL: userAvatarURL,
            }).catch( () => console.log("empty msg/full webhooks pog"));

            webhook.delete()
        
        })
        .catch(console.error);

    



}