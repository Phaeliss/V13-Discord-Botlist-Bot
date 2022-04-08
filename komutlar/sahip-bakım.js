const Discord = require('discord.js');
const db = require('quick.db');
const ee = require('../embed.json');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
if(message.author.id !== '474903993362022420') return message.inlineReply(new Discord.MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.color).setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true})).setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> ${ee.onay}**| Bot Bakıma Alınıyor..**\n> \n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)).then(msg => 
    setTimeout(function() {
    msg.edit(new Discord.MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.color).setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true})).setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> ${ee.red}**| Hey Dur, Sen Benim Sahibim Değilsin İşlemi İptal Ettim **\n> \n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`));
}, 4000)
)

function gönderkardesim(content) {
const infoEmbed = new Discord.MessageEmbed()
.setColor(ee.renk)
.setDescription(content)
.setFooter(ee.footertext,ee.footericon)
.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }));
return message.inlineReply(infoEmbed)
};
if(args[0] === "bilgi"){
  const durum = db.get('bot-bakımda');
  if(durum == true){
      const kim = await db.get('botu-bakıma-alan');
    return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.onay}| Bakım Modu Şuanda \`Açık.\`**\n> **${ee.bot}| Kimse Komutlarımı Kullanamaz**\n> **${ee.crown}| \`${kim.author.tag}\` Tarafından Bakıma Alınmış** \n> \n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`);
  }
  if(!durum){
    return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.red}| Bakım Modu Şuanda \`Kapalı.\`**\n> **${ee.bot}| Herkes Komutlarımı Kullanabilir** \n> \n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`);
  }  
} else if(!args[0]){ 
const durum = await db.get('bot-bakımda');
if(durum == true) {

await db.delete('bot-bakımda');
return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.onay}| Bakım Modu \`Kapatıldı\`**\n> **${ee.bot}| Komutlar Kullanılabilir** \n> \n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`);

} else {

await db.set('bot-bakımda', true);
db.set('botu-bakıma-alan', { 
author: message.author,
time: Date.now() 
});

return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.onay}| Bakım Modu \`Açıldı\`** \n> **${ee.bot}| Hiç Kimse Komutlarımı Kullanamayacak** \n> \n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`);
};
}

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bakım'],
  permLevel: 0
};
 
exports.help = {
  name: 'bakım-modu'
};