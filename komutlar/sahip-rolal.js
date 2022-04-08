const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ee = require('../embed.json');
exports.run = function(client, message) {
var prefix = ayarlar.prefix || db.get(`prefix_${message.guild.id}`);;
const embed = new Discord.MessageEmbed()
.setColor(ee.renk)
.setDescription(`
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
>  **<:members:960321127320797225> | Hey Sen Zamanında İstediğin Konular Hakkında Bildirim Alabilmek İçin Aşağıdaki Emojilere Tıklaman Lazım**
> 
>  **<:members:960321127320797225> | O Zaman Hiç Durma** 
> Sunucuya giriş yapabilmek için <:evil_yuvarlak:960323369855746108> emojisine tıklayarak girebilirsin o zaman hadi gel içeri.
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
`)
message.channel.send(embed).then(m => {
  m.react('<:evil_yuvarlak:960323369855746108>')
})
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['rol-al'], 
  permLevel: 5 
};

exports.help = {
  name: 'rolal',
  description: 'Tüm komutları gösterir.',
  usage: 'kural'
};