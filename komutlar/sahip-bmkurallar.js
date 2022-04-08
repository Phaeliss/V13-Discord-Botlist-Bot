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
.setDescription(`${ee.info} **Bot eklemek için \`.bot-ekle BotID Prefix\` yazın.** \`(Şart: 10 Sunucu Üstü Olmalı Ve Yeni Olmaması Gerek)\``)
//.setImage(`https://media.discordapp.net/attachments/536965341063020598/818863940846485584/kobscode_rules.png?width=680&height=160`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['bm'], 
  permLevel: 5 
};

exports.help = {
  name: 'botmesajjjj',
  description: 'Tüm komutları gösterir.',
  usage: 'kural'
};