const Discord = require("discord.js");

const PREFIX = ">";

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("The bot has started!");
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
    bot.user.setUsername("EraPVP | Official Bot");
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'welcome');
    if (!channel) return;
    channel.send(`Welcome to **EraPVP ™  | Official Discord**, ${member}!`);
  });

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
    case "info":
        var embed = new Discord.RichEmbed()
            .setTitle("Information")
            .setDescription("Hey, I see that you want some information on the server? Well this is a Hardcore factions server 'HCF' and we strive to make our community safe and a exploiter free place. All of our staff is well trained and fit for any task that you need them to do. If you need any help please go into any support room and we will be happy to help you!")
            .setColor(0x17A589)
            message.channel.send(embed);
        var embeded = new Discord.RichEmbed()
            .setDescription("")
            message.channel.send(embeded);
        break; 
    case "":
            message.channel.send("");
            break;
    case "wristtoe":
            message.guild.channels.find("name", "general").send("This bot has been updated, please check console for any errors that may have come from this. Thank you **~Bot Develeoper Resets**");
            break;
        default:
            message.channel.send("Invalid Command, please try again");
    }
})

bot.login(process.env.BOT_TOKEN);