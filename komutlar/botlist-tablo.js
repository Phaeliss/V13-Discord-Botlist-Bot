const Discord = require("discord.js")
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const ayarlar = require(`../ayarlar.json`);
const ee = require("../embed.json");
const db = require('quick.db');

exports.run = async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
   .setColor(ee.renk)
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setFooter(ee.footertext,ee.footericon)

	if(!message.guild) return;
	if(!db.get(`eklekanal${message.guild.id}`)){
		return message.channel.send(embed.setDescription(`Bot Ekleme Kanalı Ayarlanmamış Komutu Kullanabilmek İçin Tüm Ayarları Yapmalısınız`))
	}
	if(!db.get(`işlemkanal${message.guild.id}`)){
		return message.channel.send(embed.setDescription(`İşlem Kanalı Ayarlanmamış Komutu Kullanabilmek İçin Tüm Ayarları Yapmalısınız`))
	}
	if(!db.get(`logkanal${message.guild.id}`)){
		return message.channel.send(embed.setDescription(`Log Kanalı Ayarlanmamış Komutu Kullanabilmek İçin Tüm Ayarları Yapmalısınız`))
	}
	if(!db.get(`sahiplogkanal${message.guild.id}`)){
		return message.channel.send(embed.setDescription(`Sahip Log Kanalı Ayarlanmamış Komutu Kullanabilmek İçin Tüm Ayarları Yapmalısınız`))
	}
		if(!db.get(`yetkilirol${message.guild.id}`)){
			return message.channel.send(embed.setDescription(`Yetkili Rolü Ayarlanmamış Komutu Kullanabilmek İçin Tüm Ayarları Yapmalısınız`))
		}
		if(!db.get(`gelistiricirol${message.guild.id}`)){
			return message.channel.send(embed.setDescription(`Geliştirici Rolü Ayarlanmamış Komutu Kullanabilmek İçin Tüm Ayarları Yapmalısınız`))
		}
		if(!db.get(`botrol${message.guild.id}`)){
			return message.channel.send(embed.setDescription(`Bot Rolü Ayarlanmamış Komutu Kullanabilmek İçin Tüm Ayarları Yapmalısınız`))
		}


  let succSize = db.get(`serverData.${message.guild.id}.succSize`) || 0;
  let waitSize = db.get(`serverData.${message.guild.id}.waitSize`) || 0;
  let redSize = db.get(`serverData.${message.guild.id}.redSize`) || 0;
    

    message.channel.send(embed.setDescription(`Toplam Botlar; **${succSize + waitSize + redSize}**\nOnaylanan Botlar; **${succSize}**\nBekleyen Botlar; **${waitSize}**\nReddedilen Botlar; **${redSize}**`))
};

exports.help = {
  name: "tablo",
  guildOnly: true,
};
exports.conf = {
  aliases: [],
};

/*
Yetkili Rol 

db.get(`yetkilirol${message.guild.id}`)

Developer Rol 

db.get(`gelistiricirol${message.guild.id}`)

Bot Rol 

db.get(`botrol${message.guild.id}`)

Ekleme Kanal 

db.get(`eklekanal${message.guild.id}`)

İşlem Kanal 

db.get(`işlemkanal${message.guild.id}`)

Log Kanal 

db.get(`logkanal${message.guild.id}`)

Sahip Log Kanal 

db.get(`sahiplogkanal${message.guild.id}`)

*/
