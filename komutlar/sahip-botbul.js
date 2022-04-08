const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let users = await client.users.cache

    await users.forEach(us => {
        if (us.bot === true) {
          if(message.guild.members.cache.get(us)){
            return
          } else { 
            console.log(`https://discord.com/oauth2/authorize?client_id=${us.id}&guild_id=${message.guild.id}&scope=bot&permissions=0`)
          message.channel.send(`https://discord.com/oauth2/authorize?client_id=${us.id}&guild_id=${message.guild.id}&scope=bot&permissions=0`)
          }
        }
    });
};
 
 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'bot-bulsasasasas',
  description: 'Gecikme süresini gösterir.',
  usage: 'botbul'
};