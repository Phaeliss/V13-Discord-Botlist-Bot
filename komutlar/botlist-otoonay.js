const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ee = require('../embed.json');
exports.run = function(client, message , args) {
  const embed = new Discord.MessageEmbed()
  .setColor(ee.renk)
  .setAuthor(message.author.tag , message.author.avatarURL({dynamic:true}))
  .setFooter(ee.footertext,ee.footericon)
if(!args[0]){
  message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Bir Argüman Belirtin **
> ${ee.ok} **Örnek| \`aç / kapa\`** 
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
}
if(args[0] == "aç" || args[0] == "açık" || args[0] == "open"){
  if(db.get(`otoonay.${message.guild.id}`) == "açık"){
        message.channel.send(
embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Zaten Sunucuda Oto Onay Sistemi Açık**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
  } else{
    db.set(`otoonay.${message.guild.id}`, "açık")
        message.channel.send(
    embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Başarılı, Oto Onay Sistemi Açıldı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))  
  }
} else if(args[0] == "kapat" || args[0] == "kapa" || args[0] == "close"){
  if(!db.get(`otoonay.${message.guild.id}`)){
    message.channel.send(
    embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.red} **| Zaten Sunucuda Oto Onay Sistemi Kapalı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)) 
  } else{
    db.delete(`otoonay.${message.guild.id}`)
        message.channel.send(
    embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> 
> ${ee.onay} **| Başarılı, Oto Onay Sistemi Kapandı**
> 
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
  }
}
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['oto-onay'], 
  permLevel: 4
};

exports.help = {
  name: 'otoonay',
  description: 'Tüm komutları gösterir.',
  usage: 'kural'
};