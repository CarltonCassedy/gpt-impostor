"""
for windows download:
    step 1:
    https://www.downloadsource.net/how-to-download-discord-channel-and-direct-message-dm-history/n/14222/
    step 2:
    https://github.com/Tyrrrz/DiscordChatExporter
    (there should be a link to download .net)
    step 3:
    type into termial:
    dotnet --info      # makesure runtime installed
    step 4:
    cd /.../DiscordChatExporter.CLI
    step 5:
    run:
    dotnet DiscordChatExporter.Cli.dll export
    parameters:

    -t Get in devolper tools in discord applications. type token into filter and cmd R # token
    -c left click Channel                                          # channel id
    -f json                                                          # format

    step 6:
    the json is saved to the local folder DiscordChatExporter.CLI

    step 7: grab json from folder
    import NAME OF CHANNEL.json
"""

import json
import time
import datetime
from datetime import timezone

nameofCHANNEL = '2021.json'
with open(nameofCHANNEL) as f:
  data = json.load(f)

def datechange(date):

    if (date == None):
        return None
    else:
        Timestamp = (str(date))[:-10]
        TTimestampFINAL = None

        try:
            TTimestampFINAL = time.mktime(datetime.datetime.strptime(Timestamp, "%Y-%m-%dT%H:%M:%S").timetuple())
        except:
            pass

    return (TTimestampFINAL)

def main(data):
    # copy of full chat history 20,000 lines +
    # chat is a dict
    chat = data

    # empty list
    FilteredData = []

    #put messages in list
    #######ERORRE
    Messages = chat.get("messages")
    #loop through messages
    X=0
    for message in Messages:
        # message is an dict
        name = message.get("author").get("name")
        date = message.get("timestamp")
        DateFormat = datechange(date)
        contents = message.get("content")
        #ADD needed data from the message
        FilteredData.append([["Sender",name],["date",DateFormat],["content",contents]])

        print(FilteredData)
main(data)
"""
example message in messages
{
      "id": "891005983994810399",
      "type": "Default",
      "timestamp": "2021-09-24T16:59:40.675+00:00",
      "timestampEdited": null,
      "callEndedTimestamp": null,
      "isPinned": false,
      "content": "Do cool AI shit?",
      "author": {
        "id": "157845259278090240",
        "name": "Farler",
        "discriminator": "7853",
        "nickname": "Farler",
        "color": null,
        "isBot": false,
        "avatarUrl": "https://cdn.discordapp.com/avatars/157845259278090240/bb05114dd2bf2fad82abd0d29ba30bf7.png?size=128"
      },
      "attachments": [],
      "embeds": [],
      "reactions": [],
      "mentions": []
}

# EXAMPLE OF FULL JSON FILE DOWNLOADED FROM GRABBER

"""
