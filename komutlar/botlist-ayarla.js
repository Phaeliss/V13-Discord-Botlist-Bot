const Discord = require("discord.js")
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const db = require('quick.db');
const ayarlar = require(`../ayarlar.json`);
const ee = require("../embed.json");


exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINSTRATOR")) {
    return message.channel.send(`Yetkin Yok`)
  }
  
    var prefix = ayarlar.prefix;
    const embed = new Discord.MessageEmbed()
    .setColor(ee.renk)
    .setAuthor(message.author.tag,message.author.avatarURL({dynamic : true, size: 4096}))
    .setFooter(ee.footertext,ee.footericon)
if(!args[0]) { return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **${ee.red} | Lütfen Bir Seçenek Belirtin**
> 
> **${ee.ok} | Örnekler : **
> **\`${prefix}botlist yetkili-rol ayarla/sıfırla\`**
> **\`${prefix}botlist geliştirici-rol ayarla/sıfırla\`**
> **\`${prefix}botlist bot-rol ayarla/sıfırla\`**
> **\`${prefix}botlist ekleme-kanalı ayarla/sıfırla\`**
> **\`${prefix}botlist işlem-kanalı ayarla/sıfırla\`**
> **\`${prefix}botlist log-kanalı ayarla/sıfırla\`**
> **\`${prefix}botlist sahip-log-kanalı ayarla/sıfırla\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))}



/// Yetkili Rol Başlangıç



if(args[0] == "yetkili-rol"){
  if(args[1] === "ayarla" || args[1] === "sıfırla" || args[1] === "Ayarla" || args[1] === "Sıfırla" || args[1] === "set" || args[1] === "reset"){ 
   
    if(args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "reset"){
   if(db.get(`yetkilirol${message.guild.id}`)){
    db.delete(`yetkilirol${message.guild.id}`)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Yetkili Rolü Başarıyla Sıfırlandı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   } else if(!db.get(`yetkilirol${message.guild.id}`)){
     return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Sunucuda Bir Yetkili Rolü Ayarlandığından Emin Olup Tekrar Deneyiniz**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   }
    } else if(args[1] === "ayarla" || args[1] === "Ayarla" || args[1] === "set"){
      if(!message.mentions.roles.first()){
           return message.channel.send(
    embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    > 
    > ${ee.red} **| Ayaralamak İstediğiniz Rolü Belirtmediniz**
    > 
    > ${ee.ok} **| Örnek **
    > 
    > **${prefix}botlist yetkili-rol ${args[1]} \`@Rol\`**
    > 
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
        } else if(!db.get(`yetkilirol${message.guild.id}`)){
        let rol = message.mentions.roles.first()
        db.set(`yetkilirol${message.guild.id}`, rol.id)
        return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    > 
    > ${ee.onay} **| Yetkili Rolü Başarıyla Ayarlandı**
    > 
    > ${ee.ok} **| Ayarlanan Rol ${rol}**
    > 
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
      } else{
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Zaten Sunucuda Bir Yetkili Rolü Ayarlı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))    
  }
}
} else if(args[1]) {
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > **${ee.red} | Lütfen Seçenek Olarak \`ayarla / sıfırla\` Belirtiniz**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
} else if(!args[1]){
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **${ee.red} | Lütfen Bir Seçenek Belirtin**
> 
> **${ee.ok} | Örnekler : **
> **${prefix}botlist yetkili-rol \`ayarla / sıfırla\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))

}
}



///////////Yetkili Rol Son


//////////Geliştirici Rol Başlangıç


if(args[0] == "geliştirici-rol"){
  if(args[1] === "ayarla" || args[1] === "sıfırla" || args[1] === "Ayarla" || args[1] === "Sıfırla" || args[1] === "set" || args[1] === "reset"){ 
   
    if(args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "reset"){
   if(db.get(`gelistiricirol${message.guild.id}`)){
    db.delete(`gelistiricirol${message.guild.id}`)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Geliştirici Rolü Başarıyla Sıfırlandı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   } else {
     return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Sunucuda Bir Geliştirici Rolü Ayarlandığından Emin Olup Tekrar Deneyiniz**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   }
    } else if(args[1] === "ayarla" || args[1] === "Ayarla" || args[1] === "set"){
      if(!message.mentions.roles.first()){
       return message.channel.send(
embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Ayaralamak İstediğiniz Rolü Belirtmediniz**
> 
> ${ee.ok} **| Örnek **
> 
> ${prefix}botlist geliştirici-rol ${args[1]} \`@Rol\`
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
    } else if(!db.get(`gelistiricirol${message.guild.id}`)){
      let rol = message.mentions.roles.first()
      db.set(`gelistiricirol${message.guild.id}`, rol.id)
      return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > ${ee.onay} **| Geliştirici Rolü Başarıyla Ayarlandı**
  > 
  > ${ee.ok} **| Ayarlanan Rol <@&${rol.id}>**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
    } else{
      return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > ${ee.red} **| Zaten Sunucuda Bir Geliştirici Rolü Ayarlı**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))    
    }
}
} else if(args[1]) {
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > **${ee.red} | Lütfen Seçenek Olarak \`ayarla / sıfırla\` Belirtiniz**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
} else if(!args[1]){
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **${ee.red} | Lütfen Bir Seçenek Belirtin**
> 
> **${ee.ok} | Örnekler : **
> **${prefix}botlist geliştirici-rol \`ayarla / sıfırla\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))

}
}

/// Geliştirici Rol Son 




//// Bot Rol Başlangıç

if(args[0] == "bot-rol"){
  if(args[1] === "ayarla" || args[1] === "sıfırla" || args[1] === "Ayarla" || args[1] === "Sıfırla" || args[1] === "set" || args[1] === "reset"){ 
   
    if(args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "reset"){
   if(db.get(`botrol${message.guild.id}`)){
    db.delete(`botrol${message.guild.id}`)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Bot Rolü Başarıyla Sıfırlandı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   } else if(!db.get(`botrol${message.guild.id}`)){
     return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Sunucuda Bir Bot Rolü Ayarlandığından Emin Olup Tekrar Deneyiniz**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   }
    } else if(args[1] === "ayarla" || args[1] === "Ayarla" || args[1] === "set"){
      if(!message.mentions.roles.first()){
       return message.channel.send(
embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Ayaralamak İstediğiniz Rolü Belirtmediniz**
> 
> ${ee.ok} **| Örnek **
> 
> ${prefix}botlist bot-rol ${args[1]} \`@Rol\`
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
    } else if(!db.get(`botrol${message.guild.id}`)){
    let rol = message.mentions.roles.first()
    db.set(`botrol${message.guild.id}`, rol.id)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Bot Rolü Başarıyla Ayarlandı**
> 
> ${ee.ok} **| Ayarlanan Rol <@&${rol.id}>**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
  } else{
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Zaten Sunucuda Bir Bot Rolü Ayarlı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))    
  }
}
} else if(args[1]) {
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > **${ee.red} | Lütfen Seçenek Olarak \`ayarla / sıfırla\` Belirtiniz**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
} else if(!args[1]){
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **${ee.red} | Lütfen Bir Seçenek Belirtin**
> 
> **${ee.ok} | Örnekler : **
> **${prefix}botlist bot-rol \`ayarla / sıfırla\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))

}
}

////////////////Rol Ayarlamalar Son








//Kanal Ayarlamalar Başlangıç





/// Ekleme Kanal Baş



if(args[0] == "ekleme-kanalı"){
  if(args[1] === "ayarla" || args[1] === "sıfırla" || args[1] === "Ayarla" || args[1] === "Sıfırla" || args[1] === "set" || args[1] === "reset"){ 
   
    if(args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "reset"){
   if(db.get(`eklekanal${message.guild.id}`)){
    db.delete(`eklekanal${message.guild.id}`)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Ekleme Kanalı Başarıyla Sıfırlandı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   } else if(!db.get(`eklekanal${message.guild.id}`)){
     return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Sunucuda Bir Ekleme Kanalı Ayarlandığından Emin Olup Tekrar Deneyiniz**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   }
    } else if(args[1] === "ayarla" || args[1] === "Ayarla" || args[1] === "set"){
      if(!message.mentions.channels.first()){
       return message.channel.send(
embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Ayaralamak İstediğiniz Kanalı Belirtmediniz**
> 
> ${ee.ok} **| Örnek **
> 
> ${prefix}botlist ekleme-kanalı ${args[1]} \`#Kanal\`
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
    } else if(!db.get(`eklekanal${message.guild.id}`)){
    let rol = message.mentions.channels.first()
    db.set(`eklekanal${message.guild.id}`, rol.id)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Ekleme Kanalı Başarıyla Ayarlandı**
> 
> ${ee.ok} **| Ayarlanan Kanal <#${rol.id}>**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
  } else{
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Zaten Sunucuda Ekleme Kanalı Ayarlı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))    
  }
}
} else if(args[1]) {
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > **${ee.red} | Lütfen Seçenek Olarak \`ayarla / sıfırla\` Belirtiniz**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
} else if(!args[1]){
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **${ee.red} | Lütfen Bir Seçenek Belirtin**
> 
> **${ee.ok} | Örnekler : **
> **${prefix}botlist ekleme-kanalı \`ayarla / sıfırla\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))

}
}



///////////Ekleme Kanal Son










///////////İşlem Kanal Baş


if(args[0] == "işlem-kanalı"){
  if(args[1] === "ayarla" || args[1] === "sıfırla" || args[1] === "Ayarla" || args[1] === "Sıfırla" || args[1] === "set" || args[1] === "reset"){ 
   
    if(args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "reset"){
   if(db.get(`işlemkanal${message.guild.id}`)){
    db.delete(`işlemkanal${message.guild.id}`)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| İşlem Kanalı Başarıyla Sıfırlandı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   } else if(!db.get(`işlemkanal${message.guild.id}`)){
     return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Sunucuda Bir İşlem Kanalı Ayarlandığından Emin Olup Tekrar Deneyiniz**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   }
    } else if(args[1] === "ayarla" || args[1] === "Ayarla" || args[1] === "set"){
      if(!message.mentions.channels.first()){
       return message.channel.send(
embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Ayaralamak İstediğiniz Kanalı Belirtmediniz**
> 
> ${ee.ok} **| Örnek **
> 
> ${prefix}botlist işlem-kanalı ${args[1]} \`#Kanal\`
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
    } else if(!db.get(`işlemkanal${message.guild.id}`)){
    let rol = message.mentions.channels.first()
    db.set(`işlemkanal${message.guild.id}`, rol.id)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| İşlem Kanalı Başarıyla Ayarlandı**
> 
> ${ee.ok} **| Ayarlanan Kanal <#${rol.id}>**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
  } else{
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Zaten Sunucuda İşlem Kanalı Ayarlı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))    
  }
}
} else if(args[1]) {
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > **${ee.red} | Lütfen Seçenek Olarak \`ayarla / sıfırla\` Belirtiniz**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
} else if(!args[1]){
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **${ee.red} | Lütfen Bir Seçenek Belirtin**
> 
> **${ee.ok} | Örnekler : **
> **${prefix}botlist işlem-kanalı \`ayarla / sıfırla\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))

}
}



///////////İşlem Kanal Son






///////////Log Kanal Baş


if(args[0] == "log-kanalı"){
  if(args[1] === "ayarla" || args[1] === "sıfırla" || args[1] === "Ayarla" || args[1] === "Sıfırla" || args[1] === "set" || args[1] === "reset"){ 
   
    if(args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "reset"){
   if(db.get(`logkanal${message.guild.id}`)){
    db.delete(`logkanal${message.guild.id}`)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Log Kanalı Başarıyla Sıfırlandı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   } else if(!db.get(`logkanal${message.guild.id}`)){
     return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Sunucuda Bir Log Kanalı Ayarlandığından Emin Olup Tekrar Deneyiniz**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   }
    } else if(args[1] === "ayarla" || args[1] === "Ayarla" || args[1] === "set"){
      if(!message.mentions.channels.first()){
       return message.channel.send(
embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Ayaralamak İstediğiniz Kanalı Belirtmediniz**
> 
> ${ee.ok} **| Örnek **
> 
> ${prefix}botlist log-kanalı ${args[1]} \`#Kanal\`
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
    } else if(!db.get(`logkanal${message.guild.id}`)){
    let rol = message.mentions.channels.first()
    db.set(`logkanal${message.guild.id}`, rol.id)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Log Kanalı Başarıyla Ayarlandı**
> 
> ${ee.ok} **| Ayarlanan Kanal <#${rol.id}>**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
  } else{
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Zaten Sunucuda Log Kanalı Ayarlı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))    
  }
}
} else if(args[1]) {
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > **${ee.red} | Lütfen Seçenek Olarak \`ayarla / sıfırla\` Belirtiniz**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
} else if(!args[1]){
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **${ee.red} | Lütfen Bir Seçenek Belirtin**
> 
> **${ee.ok} | Örnekler : **
> **${prefix}botlist log-kanalı \`ayarla / sıfırla\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))

}
}



///////////Log Kanal Son



///////////Sahip Log Kanal Baş


if(args[0] == "sahip-log-kanalı"){
  if(args[1] === "ayarla" || args[1] === "sıfırla" || args[1] === "Ayarla" || args[1] === "Sıfırla" || args[1] === "set" || args[1] === "reset"){ 
   
    if(args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "reset"){
   if(db.get(`sahiplogkanal${message.guild.id}`)){
    db.delete(`sahiplogkanal${message.guild.id}`)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| SahipLog Kanalı Başarıyla Sıfırlandı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   } else if(!db.get(`sahiplogkanal${message.guild.id}`)){
     return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Sunucuda Bir SahipLog Kanalı Ayarlandığından Emin Olup Tekrar Deneyiniz**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
   }
    } else if(args[1] === "ayarla" || args[1] === "Ayarla" || args[1] === "set"){
      if(!message.mentions.channels.first()){
       return message.channel.send(
embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Ayaralamak İstediğiniz Kanalı Belirtmediniz**
> 
> ${ee.ok} **| Örnek **
> 
> ${prefix}botlist sahip-log-kanalı ${args[1]} \`#Kanal\`
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
    } else if(!db.get(`sahiplogkanal${message.guild.id}`)){
    let rol = message.mentions.channels.first()
    db.set(`sahiplogkanal${message.guild.id}`, rol.id)
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Sahip Log Kanalı Başarıyla Ayarlandı**
> 
> ${ee.ok} **| Ayarlanan Kanal <#${rol.id}>**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
  } else{
    return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Zaten Sunucuda Sahip Log Kanalı Ayarlı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))    
  }
}
} else if(args[1]) {
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > **${ee.red} | Lütfen Seçenek Olarak \`ayarla / sıfırla\` Belirtiniz**
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
} else if(!args[1]){
  return message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> **${ee.red} | Lütfen Bir Seçenek Belirtin**
> 
> **${ee.ok} | Örnekler : **
> **${prefix}botlist sahip-log-kanalı \`ayarla / sıfırla\`**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))

}
}



///////////Sahip Log Kanal Son



};

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'botlist',
  description: 'Gecikme süresini gösterir.',
  usage: 'eval'
};


// let kanal = message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()


/*
message.channel.send(
embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Ayarla`))
*/





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