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

    if(!message.member.roles.cache.has(db.get(`yetkilirol${message.guild.id}`))) return message.channel.send(embed.setDescription("Üzgünüm Bu Komutu Kullanabilmek Gerekli İzin Sende Bulunmuyor"))
    if(message.channel.id !== db.get(`işlemkanal${message.guild.id}`)) return message.channel.send(embed.setDescription(`Bu Komutu Sadece <#${db.get(`işlem.kanal.${message.guild.id}`)}> Kanalında Kullanabilirsin!`));
   let botID = args[0];
   let redReason = args.slice(1).join(' ');
   if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Reddetmek istediğiniz Botun ID sini Belirtiniz."));
 if(!redReason) return message.channel.send(embed.setDescription("Lütfen Bir Sebep Belirtiniz."));
 
 let discordBot = null;
   try {
   discordBot =  client.users.cache.get(botID);
 }	catch {
       return message.channel.send(embed.setDescription("Discord Apide Böyle Bir Bot Bulamadım."));
 }	
 
 let bot = db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
 if(!bot) return message.channel.send(embed.setDescription(`**${discordBot.username}** Adlı Bot Sisteme Daha Önceden Eklenmemiş.`));

 if(bot.status == "Reddedildi")  return message.channel.send(embed.setDescription(`**${discordBot.username}** Adlı Bot Zaten Reddedilmiş Durumda!`))
 if(bot.status == "Beklemede")  db.subtract(`serverData.${message.guild.id}.waitSize`, 1)
 if(bot.status == "Onaylı")  db.subtract(`serverData.${message.guild.id}.succSize`, 1)
    let memberData =  client.users.cache.get(bot.owner)

    if(message.guild.members.cache.get(bot.owner)) message.guild.members.cache.get(bot.owner).roles.remove(db.get(`gelistiricirol${message.guild.id}`))
    
    db.add(`serverData.${message.guild.id}.redSize`, 1);
    db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "Reddedildi")
    db.set(`serverData.${message.guild.id}.botsData.${botID}.redReason`, redReason)
 message.guild.channels.cache.get(db.get(`logkanal${message.guild.id}`)).send(
  embed.setDescription(`${memberData} (**${memberData.tag}**) Adlı Kişinin \`${discordBot.tag}\`(**${discordBot.id}**) Adlı Botu \`${redReason}\` Sebebi ile Reddedildi!`)
 
 )
  message.react(ee.onay)
};

exports.help = {
  name: "bot-reddet",
  guildOnly: true,
};
exports.conf = {
  aliases: ["reject-bot","botreddet","bot-reject"],
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