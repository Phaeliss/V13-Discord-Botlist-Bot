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

    if(!message.member.roles.cache.has(db.get(`yetkilirol${message.guild.id}`))) return message.channel.send(embed.setDescription("Üzgünüm Bu Komutu Kullanabilmek Gerekli İzin Sende Bulunmuyor"))
    let botID = args[0]
     if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Lütfen Profiline Bakmak İstediğiniz Botun IDsini Yazınız"));
     let bot = db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
     let discordBot = null;
     try {
       discordBot =  client.users.cache.get(botID);
     }	catch {
      return message.channel.send(embed.setDescription("Discord Apide Böyle Bir Bot Bulamadım."));
     }	
     
     if(!bot) return message.channel.send(embed.setDescription(`Sistemde **${discordBot.username}** İsimli Bot Bulamadım.`))
       let ownerName =  client.users.cache.get(bot.owner);
      embed.addField("Bot Name/ID", `\`${discordBot.username}\`(**${discordBot.id}**)`)
      .addField("Bot Owner",`\`${ownerName.username}\`(**${ownerName.id}**)`)
      .addField("Bot Status", 
      bot.status == "Onaylı" && !message.guild.members.cache.get(botID) 
      ? "Onaylı (Sunucuda Ekli Değil!)" 
      : bot.status == "Reddedildi" && message.guild.members.cache.get(botID)  
      ? "Reddedildi (Bot Sunucuda Ekli)"  
      : bot.status == "Beklemede"  && message.guild.members.cache.get(botID)
      ? "Beklemede (Bot Sunucuda Ekli)"
      : bot.status)
      if(bot.status == "Reddedildi") embed.addField("Reddedildi Neden", `\`${bot.redReason}\``)
     message.channel.send(embed)
};

exports.help = {
  name: "yetkili-bot-profil",
  guildOnly: true,
};
exports.conf = {
  aliases: ["auth-bot-profile","yetkilibotprofil","yetkilibotprofil"],
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