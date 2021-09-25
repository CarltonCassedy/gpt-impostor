const https = require('https')


// Get most recent 600 words.
// Get 50 most recent chat messages
// Reduce the array and stop adding when we reach 600 words
// Send data
// decode response
// respond as bot
// (STRETCH) use user username/profile
exports.inference = async (interaction) => {
    let recentMessages = await interaction.channel.messages.fetch({
        limit: 50,
    });
        //if (reverseArray) {messages = messages.reverse();}
    recentMessages = recentMessages.filter(msg => !msg.author.bot);
    
    // Construct an array of message objects that
    // contain sender name, time sent, content 
    let numberOfWords = 0;
    let simpleMessages = recentMessages.reduce(function (result, message) {

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

    const data = new TextEncoder().encode(
        JSON.stringify({

            guildId: interaction.guildId,
            username: interaction.options.get('user', true),
            context: simpleMessages
        })
    )

    const options = {
        hostname: 'whatever.com',
        port: 443,
        path: '/predict',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    /*const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })*/
    // TODO UNCOMMENT THIS
    //req.write(data)
    console.log(simpleMessages);
    //req.end()
}
