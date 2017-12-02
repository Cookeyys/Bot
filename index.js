const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "Mzg2MzYzNDQwNzE0NzQzODI4.DQO0iA.Ie7jwH3-U16mWC0xG8OcwtETyVQ";
const PREFIX = "!";

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "I am bored of this"
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
    console.log("Ready");
    bot.user.setGame("!Info");
})

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.sendMessage("Pong!");
            break;
        case "info":
            message.channel.sendMessage("I'm a radical bot made by Cookeyys!");
            break;
        case "love":
            message.channel.sendMessage("Baby don't hurt me, don't hurt me no more!");
            break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Can't read that");
            break;
        case "play":
            if (!args[1]) {
                message.channel.sendMessage("Please provide a link");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("You must be in a voice channel");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if  (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            break;
        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        default:
            message.channel.sendMessage("This command does not exist");
    }
});

bot.login(TOKEN);
