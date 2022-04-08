const Discord = require("discord.js")
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const ayarlar = require(`../ayarlar.json`);
const ee = require(`../embed.json`);
const db = require('quick.db');
exports.run = async (client, message, args) => {
 
  let kisi = client.users.cache.get(args[0])
  function gönderkardesim(content) {
    const infoEmbed = new Discord.MessageEmbed()
    .setColor(ee.renk)
    .setDescription(content)
    .setFooter(ee.footertext,ee.footericon)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
    return message.inlineReply(infoEmbed)
    };
  if (!kisi) return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.red}|Beyaz Listeye Alınacak Kullanıcının ID sini Girmelisin**\n> \n **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
  if (kisi === client.user.id){
        return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> ${ee.red}|Hey Sen Amacın Ne Bilmiyorum Ama Beni Neden Beyazlisteye Almaya Çalıştın**\n> \n> **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
      };
  if(kisi.id === "474903993362022420" || kisi.id === ayarlar.sahip.includes(kisi)) {
  return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> ${ee.red}|Sahibimi Beyaz Listeye Almaya Çalışman Komik**\n> \n> **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    };
    if(!db.get(`karaliste_${kisi.id}`)){
    return gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.red}|Bu Kullanıcı Botun Kara-listesine Önceden Alınmamış**\n> \n **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
      } 
  db.delete(`karaliste_${kisi.id}`)
  db.delete(`karalisteye-alan_${kisi.id}`);
gönderkardesim(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **${ee.onay}|Kullanıcı Başarıyla Beyaz Listeye Alındı **\n> \n **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
client.channels.cache.get(ayarlar.karalistelog).send(new Discord.MessageEmbed()
.setColor(ee.renk)
.setTitle(`${ee.add} |Bir Kullanıcı Beyazlisteye Alındı|\`${kisi.tag}\``)
.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> \n> **\`Beyazlisteye Alınan Kullanıcı:\` ${kisi.tag} (${kisi.id})**\n> **\`Beyazlisteye Alan Kullanıcı:\` ${message.author.tag} (${message.author.id})**\n> \n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
.setFooter(ee.footertext,ee.footericon)
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })))
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`beyaz-liste`,`black-list`,`blacklist`],
  permLevel: 5
};
exports.help = {
  name: `beyazliste`,
  description: `kullanıcıyı Beyazlisteye alır`,
  usage: `Beyazliste ID`
};