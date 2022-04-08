const Discord = require("discord.js")
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const ayarlar = require(`../ayarlar.json`);
const ee = require("../embed.json");
const db = require('quick.db');

exports.run = async (client, message, args) => {

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

  if(!message.member.roles.cache.has(db.get(`yetkilirol${message.guild.id}`))) return message.channel.send(embed.setDescription("Üzgünüm Bu Komutu Kullanabilmek Gerekli İzin Sende Bulunmuyor"))

  let obj =  db.get(`serverData.${message.guild.id}.botsData`) || {}
let array1 = []
let array2 = []
let array3 = []
let veri = Object.keys(obj).forEach(botID => {
    if(obj[botID].status == "Onaylı" && !message.guild.members.cache.get(botID)){
   array1.push({ID:botID})
} else if(obj[botID].status == "Reddedildi" && message.guild.members.cache.get(botID)){
    array2.push({ID:botID})
} else if(obj[botID].status == "Beklemede" && message.guild.members.cache.get(botID)){
   array3.push({ID:botID})
}
})
let botEkle = (ID) => `https://discord.com/oauth2/authorize?client_id=${ID}&guild_id=${message.guild.id}&scope=bot&permissions=0` 
let map = (arr) => arr.map(data => `(**${data.ID}**) | [Bot Ekle (0 Perm)](${botEkle(data.ID)})`).slice(0, 5).join("\n")
let map2 = (arr) => arr.map(data => `<@${data.ID}>`).join(", ")
  const embed = new Discord.MessageEmbed()
  .setColor(ee.renk)
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .addField("**Onaylı ve Ekli Olmayanlar**",  array1.length > 5 ? map(array1) + ".." : array1.length >= 1 ? map(array1) : "Liste Boş") 
  .addField("**Reddedilmiş ve Ekli Olanlar**",  array2.length > 5 ? map2(array2).slice(0, 5) + ".." : array2.length >= 1 ? map2(array2) :"Liste Boş")
.addField("**Beklemede ve Ekli Olanlar**",  array3.length > 5 ? map2(array3).slice(0, 5) + ".." : array3.length >= 1 ? map2(array3) :"Liste Boş")
    .setFooter(ee.footertext,ee.footericon)
message.channel.send(embed)
};

exports.help = {
  name: "kontrol-et",
  guildOnly: true,
};
exports.conf = {
  aliases: ["check-it","kontrolet"],
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