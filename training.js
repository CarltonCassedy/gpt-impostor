
// 1 ./Given server info and list of channel ids
// 2 let perServer = Divide 20,000 (num of messages to gather) by channelList.length.
// 3 Iterate through list collecting perServer #messages from each channel.
// 4 Keep track of where we are in each collection by storing the lastID in another array.
// 5 If at end of iteration we haven't gotten all 20,000 message start iterate through the array again without the message limit (starting at each lastId from step 4)

exports.trainGuild = async (interaction) => {
    
    if(!interaction.options.user) throw new Error();
    // First parameter needs to be a discord.js channel object
    // Second parameter is a optional set of options.
    let channel = interaction.channel;
    console.log("Getting allMessages")
    const allMessages = fetchAll.messages(channel, {
        reverseArray: true, // Reverse the returned array
        userOnly: true, // Only return messages by users
        botOnly: false, // Only return messages by bots
        pinnedOnly: false, // Only returned pinned messages
    }).then((allMessages) => {
        console.log("allMessages received")
        // Construct an array of message objects that
        // contain sender name, time sent, content 
        let simpleMessages = allMessages.reduce(function (result, message) {

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


        // Will return an array of all messages in the channel
        // If the channel has no messages it will return an empty array
        console.log(simpleMessages);


        // Will return an array of all messages in the channel
        // If the channel has no messages it will return an empty array
        console.log(simpleMessages);
        console.log("size: ", simpleMessages.length);

    }).catch((error) => {
        // TODO
        // throw the error up to the command handling in index.js

    });
    await interaction.reply('when the imposter is sus')
}