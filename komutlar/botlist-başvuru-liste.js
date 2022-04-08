const Discord = require("discord.js")
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const db = require('quick.db');
const ayarlar = require(`../ayarlar.json`);
const ee = require("../embed.json");

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
	
	if(!message.member.roles.cache.has(db.get(`yetkilirol${message.guild.id}`))) return message.channel.send(embed.setDescription("Bu Komutu Kullanabilmek Gerekli İzin Sende Bulunmuyor"));


	  let obj =  db.get(`serverData.${message.guild.id}.botsData`) || {}
	  let veri = Object.keys(obj).map(botID => {
		return {
		  ID: botID,
		  durum: obj[botID].status
		};
	  }).filter(data => data.durum == "Beklemede")
	  if(veri.length <= 0) return message.channel.send(embed.setDescription("Şuan Beklemede Olan Bot Bulunmuyor")) 
	  
	 return message.channel.send(embed .setDescription(
	  `Sistem Şuan Toplam **${veri.length}** Bot Onay Beklemede! \n\n`+
	  veri.map(data => `(**${data.ID}**) | [Botu Ekle (0)](https://discord.com/oauth2/authorize?client_id=${data.ID}&guild_id=${message.guild.id}&scope=bot&permissions=0) `).join("\n"))
	  )
};

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["list","başvuruliste"],
  permLevel: 0
};

exports.help = {
  name: "başvuru-liste",
  description: 'Gecikme süresini gösterir.',
  usage: 'eval'
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