const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ee = require('../embed.json');

exports.run = function(client, message) {
var prefix = ayarlar.prefix || db.get(`prefix_${message.guild.id}`);;
const embed = new Discord.MessageEmbed()
.setColor(ee.renk)
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setFooter(ee.footertext,ee.footericon)
.setDescription(`
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
> **<:members:961736619755454474> | Hey Sen Zamanında İstediğin Konular Hakkında Bildirim Alabilmek İçin Aşağıdaki Emojilere Tıklaman Lazım**
> 
> **<:members:961736619755454474> | O Zaman Hiç Durma**
> Sunucuya giriş yapabilmek için <:evil_yuvarlak:961736610423119872> emojisine tıklayarak girebilirsin o zaman hadi gel içeri.
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
`)
//.setImage(`https://media.discordapp.net/attachments/536965341063020598/818863940846485584/kobscode_rules.png?width=680&height=160`)
message.channel.send(embed).then(msg => msg.react("<:evil_yuvarlak:961736610423119872>"))
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['rg'], 
  permLevel: 5 
};

exports.help = {
  name: 'registermesajj',
  description: 'Tüm komutları gösterir.',
  usage: 'kural'
};