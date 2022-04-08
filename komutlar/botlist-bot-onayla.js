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
    let botID = args[0];
    if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Onaylamak İstediğiniz Botun ID sini Belirtiniz."));
  
  let discordBot = null;
    try {
    discordBot =  client.users.cache.get(botID);
  }	catch {
        return message.channel.send(embed.setDescription("Discord Apide Böyle Bir Bot Bulamadım."));
  }	

  let bot =  db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
  if(!bot) return message.channel.send(embed.setDescription(`**${discordBot.username}** Adlı Bot Sisteme Daha Önceden Eklenmemiş.`));
   

    if(bot.status == "Onaylı") {
    if(!message.guild.members.cache.get(botID)){
      return message.channel.send(embed.setDescription(`**${discordBot.username}** Adlı Bot Onaylanmış ama Sunucuda Mevcut Değil!`))
    }
     return message.channel.send(embed.setDescription(`**${discordBot.username}** Adlı Bot Zaten Onaylanmış Durumda!`))
  }
  let memberData = client.users.cache.get(bot.owner)

    if(!message.guild.members.cache.get(bot.owner)) return message.channel.send(embed.setDescription(`**${memberData.tag}** Adlı Kullanıcı Sunucudan Çıktığından Bot Onaylanamaz!`));
 message.guild.members.cache.get(bot.owner).roles.add(db.get(`gelistiricirol${message.guild.id}`))
  if(message.guild.members.cache.get(botID)){
   message.guild.members.cache.get(botID).roles.add(db.get(`botrol${message.guild.id}`))}else {
     message.channel.send("bot sunucuda olmadığı için rolü verilmedi")
   }
  if(bot.status == "Beklemede")  db.subtract(`serverData.${message.guild.id}.waitSize`, 1)
  if(bot.status == "Reddedildi")  db.subtract(`serverData.${message.guild.id}.redSize`, 1)
  db.add(`serverData.${message.guild.id}.succSize`, 1);
  db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "Onaylı")
   message.react(ee.onay)
  message.guild.channels.cache.get(db.get(`logkanal${message.guild.id}`)).send(
    embed.setTitle(`${ee.onay}|Bir Bot Onaylandı | ${discordBot.tag}`).setDescription(`
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **:flag_us: ・  Hey \`${memberData.tag}\`,**
> **\`${discordBot.tag}\` bot named  was approved by ${message.author}.**
> 
> **:flag_tr: ・  Hey \`${memberData.tag}\`,**
> **\`${discordBot.tag}\` adlı botun ${message.author} tarafından onaylandı!**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
  )
};

exports.help = {
  name: "bot-onayla",
  guildOnly: true,
};
exports.conf = {
  aliases: ["approve-bot","botonayla","bot-approve"],
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