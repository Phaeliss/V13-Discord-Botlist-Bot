const Discord = require("discord.js")
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const ayarlar = require(`../ayarlar.json`);
const ee = require(`../embed.json`);
const db = require('quick.db');
exports.run = async (client, message, args) => {
 
  let kisi = client.users.cache.get(args[0])
  let sebep = args.slice(1).join(" ")
  function gönderkardesim(content) {
    const infoEmbed = new Discord.MessageEmbed()
    .setColor(ee.color)
    .setDescription(content)
    .setFooter(ee.footertext,ee.footericon)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
    return message.inlineReply(infoEmbed)
    };
    if (!sebep) return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.red}|Kara Listeye Alabilmek İçin Bir Sebep Belirt**\n> \n **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
  if (!kisi) return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.red}|Kara Listeye Alınacak Kullanıcının ID sini Girmelisin**\n> \n **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
  if (kisi === client.user.id){
        return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> ${ee.red}|Hey Sen Amacın Ne Bilmiyorum Ama Beni Neden Karalisteye Almaya Çalıştın**\n> \n> **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
      };
  if(kisi.id === "474903993362022420" || kisi.id === ayarlar.sahip.includes(kisi)) {
  return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> ${ee.red}|Sahibimi Kara Listeye Almaya Çalışman Komik**\n> \n> **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    };
    if(db.get(`karaliste_${kisi.id}`)){ 
const sa = db.get(`karaliste_${kisi.id}`)
 if(sa.sonuç === 'aktif'){ 
    return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.red}|Bu Kullanıcı Botun Karalistesine Önceden Alınmış**\n> \n **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
      } } 
  
  db.set(`karaliste_${kisi.id}`, {
      sonuç: "aktif",
      reason: sebep
})
  db.set(`karalisteye-alan_${kisi.id}`, { 
    author: message.author,
    time: Date.now() 
    });
gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.onay}|Kullanıcı Başarıyla Kara Listeye Alındı **\n> \n **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
client.channels.cache.get(ayarlar.karalistelog).send(new Discord.MessageEmbed()
.setColor(ee.color)
.setTitle(`${ee.add} |Bir Kullanıcı Karalisteye Alındı|\`${kisi.tag}\``)
.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **\`Karalisteye Alınan Kullanıcı:\` ${kisi.tag} (${kisi.id})**\n> **\`Karalisteye Alan Kullanıcı:\` ${message.author.tag} (${message.author.id})**\n> **\`Karalisteye Alınma Sebebi:\` ${sebep}**\n> \n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
.setFooter(ee.footertext,ee.footericon)
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })))
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`kara-liste`,`black-list`,`blacklist`],
  permLevel: 5
};
exports.help = {
  name: `karaliste`,
  description: `kullanıcıyı karalisteye alır`,
  usage: `karaliste ID`
};