const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ee = require('../embed.json');

exports.run = function(client, message) {
let otoonay = db.get(`otoonay.${message.guild.id}`) || "Kapalı"  
let vals = [`yetkilirol${message.guild.id}`, `gelistiricirol${message.guild.id}`, `botrol${message.guild.id}`, `eklekanal${message.guild.id}`, `işlemkanal${message.guild.id}`, `logkanal${message.guild.id}`, `sahiplogkanal${message.guild.id}`]
var sucstring = ""
let objs = {
  "yetkilirol": "Ayarlanmamış",
  "gelistiricirol": "Ayarlanmamış",
  "botrol": "Ayarlanmamış",
  "eklekanal": "Ayarlanmamış",
  "işlemkanal": "Ayarlanmamış",
  "logkanal": "Ayarlanmamış",
  "sahiplogkanal": "Ayarlanmamış"
}

vals.forEach(el => {
  const fetch = db.get(el)
if(fetch !== null) {
let send = el.replace(/[0-9]/g, '');
objs[send] = fetch
}  
})

Object.keys(objs).forEach(element => {
if(objs[element] === "Ayarlanmamış") {
  sucstring += `${element} --> ${objs[element]}` + "\n"
} else {
if(element.includes("kanal")) {
  sucstring += `${element} --> <#${objs[element]}>` + "\n"
} else if(element.includes("rol")) {
  sucstring += `${element} --> <@&${objs[element]}>` + "\n"
}
}
})

sucstring = sucstring.replace("yetkilirol", "Yetkili Rol").replace("gelistiricirol", "Geliştirici Rol").replace("botrol", "Bot Rol").replace("eklekanal", "Ekle Kanal").replace("işlemkanal", "İşlem Kanal").replace("logkanal", "Log Kanal").replace("sahiplogkanal", "Sahip Log Kanal")

const embed = new Discord.MessageEmbed()
.setColor(ee.renk)
.setAuthor(`${message.author.tag} Tarafından Kullanıldı`)
.setDescription(`${sucstring} Oto Onay Sistemi--> ${otoonay}`)
message.reply(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['botlistayarlar'], 
  permLevel: 4
};

exports.help = {
  name: 'botlist-ayarlar',
  description: 'Tüm komutları gösterir.',
  usage: 'kural'
};