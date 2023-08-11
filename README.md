# Mamad Bot

A simple discord bot with some simple commands.

### Current Available Commands

```JavaScript
const commands = {
    misc: [
        {
            name:"chat",
            description:"activate chat with AI"
            required: "Settings your AI in chat gpt"
        },
        {
            name:"say",
            description:"make the bot say something"
        },
        {
            name:"ping",
            description:"Check sender's ping"
        }
    ],
    moderation: [
        {
            name:"delete",
            description:"delete the chat with the given number"
        }
    ]
}

console.log(JSON.stringify(commands, null, 2));
```
