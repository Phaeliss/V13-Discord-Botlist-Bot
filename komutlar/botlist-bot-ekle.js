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
    if(message.channel.id !== db.get(`eklekanal${message.guild.id}`)) return message.channel.send(embed.setDescription(`Bu Komutu Sadece <#${db.get(`eklekanal${message.guild.id}`)}> Kanalında Kullanabilirsin!`));
	  
	  let botID = args[0];

	  let prefix_bot = args.slice(1).join(" ")
      if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Lütfen Eklemek İstedidiniz Botun ID sini Giriniz."));
	  if(!prefix_bot) return message.channel.send(embed.setDescription("Lütfen Eklemek İstedidiniz Botun Prefixini(Ön Ek) Giriniz."));
    let response = await fetch(`https://discord.com/api/v8/oauth2/authorize?client_id=${botID}&scope=bot`, { 
    method: 'GET',  
    headers: { 
        'Authorization': "mfa._Fpq0Zu5cg991s07GF4-0i3HSIwxgkE1OQwZ3TK2BLadpBVhw_I-nG-H4rWHC1gGmRbbw0QuZtVDBscqgIvP"
    }
})

let body = await response.json();

let sunucu = body.bot.approximate_guild_count
console.log(sunucu)
	  let discordBot = null;
      try {
		  discordBot = client.users.cache.get(botID);
	  }	catch {
          return message.channel.send(embed.setDescription("Discord Apide Böyle Bir Bot Bulamadım."));
	  }		
  if(!client.users.cache.get(botID)){
    client.users.cache.get("797904178223644672").send(new Discord.MessageEmbed()
.setColor(ee.color)
.setTitle("`Selam Sahip , Biri Bot Eklemek İstedi Fakat...`")
.setDescription(`
> **__Fakat Bot Kullanıcılarımda Olmadığı İçin;__**
> **__\`Verilerini Alamadım\`__**
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **\`Botun Sahibi\` >> ${message.author}|${message.author.tag}**
> 
> **\`Bot ID'si\` >> ${botID} | [(Botu Ekle)](https://discord.com/oauth2/authorize?client_id=${botID}&guild_id=821751314153340938&scope=bot&permissions=0)**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
.setThumbnail(message.guild.iconURL({size : 1024,dynamic:true}))
.setAuthor(`Botu Ekleyen Kişi ${message.author.tag}`,message.author.avatarURL({size : 1024,dynamic:true}),`https://discord.com/users/${message.author.id}`))
    message.channel.send(embed.setDescription("> **__Bu Bot Kullanıcılarımda Olmadığı İçin Verilerini Öğrenmeme Discord Api İzin Vermiyor__** \n **__Fakat Üzülmene Gerek Yok Botunun ID sini Sahibime Ulaştırdım En Kısa Zamanda Düzeltecektir__**")).then(message => message.delete({timeout:10000}));
    return;
  }
console.log(botID)
	  if(!discordBot.bot) return message.channel.send(embed.setDescription("Lütfen Bot IDsi Giriniz, Kullanıcı ID Girmeyin!"));
	  let bot = db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  
 
	  if(bot) {
		let member =  client.users.cache.get(bot.owner);
        return message.channel.send(`${ee.red} **${discordBot.username}** Adlı Bot Sisteme **${member.tag}** Tarafından Eklenmiş Durum; **${bot.status}**`)
	 }
	
	 db.add(`serverData.${message.guild.id}.waitSize`, 1)
   db.set(`serverData.${message.guild.id}.botsData.${botID}.id`, botID)
	 db.set(`serverData.${message.guild.id}.botsData.${botID}.owner`,  message.author.id)
	 db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "Beklemede")
	  
      let sira = db.fetch(`serverData.${message.guild.id}.waitSize`) || 0;
	   
	message.guild.channels.cache.get(db.get(`logkanal${message.guild.id}`)).send(`<@${message.author.id}> & <@&${db.get(`yetkilirol${message.guild.id}`)}>`,
	  embed.setTitle(`${ee.add} | Bir Bot Eklendi | \`${discordBot.tag}\``).setDescription(`
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> **Bu Bot ile Sırada Toplam \`${sira}\` Bot Mevcut!**
> **Tahmini Onay Süresi \`${sira}0 Dakika\`**
> 
> **Ekleyen Hakkında --> ${message.author} (\`${message.author.tag}\`)**
> **Bot Hakkında --> \`${discordBot.tag}\` (${discordBot.id}**)
> **Botun Prefixi --> \`${prefix_bot}\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
	  )
	  try{
		  client.users.cache.get(message.author.id).send(embed
			.setTitle(`${ee.add} | Botunuz Sisteme Eklendi | \`${discordBot.tag}\``)
			.setDescription(`
	  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
	  > 
	  > **Botunuz Sisteme Başarı İle Eklendi Sırada Toplam \`${sira}\` Bot Mevcut!**
	  > **Tahmini Onay Süresi ${sira}0 Dakika**
	  > 
	  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
	  } catch{
		client.users.cache.get(message.author.id).send(embed
			.setDescription(`
	  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
	  > 
	  > ${ee.red}** | Botunuz Sisteme Eklenemedi Lütfen Tekrar Deneyin**
	  > 
	  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
	  }
        message.react(ee.onay)
};

exports.help = {
  name: "bot-ekle",
  guildOnly: true,
};
exports.conf = {
  aliases: ["add-bot","botekle","bot-add"],
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