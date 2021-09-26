const http = require('http')
const { response } = require('./response.js');

// Get most recent 600 words.
// Get 50 most recent chat messages
// Reduce the array and stop adding when we reach 600 words
// Send data
// decode response
// respond as bot
// (STRETCH) use user username/profile
exports.inference = async (interaction) => {
    interaction.channel.sendTyping();
    let recentMessages = await interaction.channel.messages.fetch({
        limit: 50,
    });
        //if (reverseArray) {messages = messages.reverse();}
    recentMessages = recentMessages.filter(msg => !msg.author.bot);
    
    // Construct an array of message objects that
    // contain sender name, time sent, content 
    let numberOfWords = 0;
    let contextMessages = recentMessages.reduce(function (result, message) {

        numberOfWords += message.content.split(' ').length;

        // stop adding if we have more than 600 words
        if (numberOfWords > 600) return;

        // If the message has no text don't add to list
        // Will add more conditions later, like if it is an image
        if (message.content == "") return result;

        result.push({
            sender: message.author.username,
            date: message.createdTimestamp,
            content: message.content
        });
        return result;
    }, [])

    let prompt = contextMessages.reverse().reduce(function (result, message) {

        return result + message.sender + ": " + message.content + '\n';
    }, [])

    prompt = prompt + interaction.options.get('user', true).user.username + ":";

    const conversationMode = (interaction === 'monologue')

    const data = new TextEncoder().encode(
        JSON.stringify({

            guildId: interaction.guildId,
            username: interaction.options.get('user', true).user.username,
            //context: simpleMessages
            message_context: prompt,
            conversation_mode: conversationMode
        })
    )
    // `http://34.91.252.10:8080/complete`. `{"message_context": "this is a test"}`
    //New ip: `35.245.143.57:80`
    // Use `34.91.252.10:8080` TPU small model
    // `35.245.143.57:80` small server big model
    const options = {
        hostname: '35.245.143.57',
        port: 80,
        path: '/complete',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            let objects = JSON.parse(d.toString())[0]
            console.log(objects)
            let messages = objects.generated_text.split('\n')

            response(interaction, messages[0])
        })
    })

    req.on('error', error => {
        console.error(error)
    })
    // TODO UNCOMMENT THIS
    req.write(data)
    console.log(prompt);
    
    await interaction.reply({content: 'Fake message sent', ephemeral: true})
    req.end()
}
