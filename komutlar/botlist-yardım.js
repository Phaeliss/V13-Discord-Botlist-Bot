const Discord = require("discord.js")
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const db = require('quick.db');
const ayarlar = require(`../ayarlar.json`);
const ee = require("../embed.json");

exports.run = async (client, message, args) => {
  var prefix = ayarlar.prefix;
  const embed = new Discord.MessageEmbed()
  .setColor(ee.renk)
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription("Botu Ekleyen Kişi Sunucudan Çıkar ise Botu Otomatik Olarak Banlanır.")
.addField("Kullanıcı Komutları", `\`${prefix}bot-ekle\`,\`${prefix}bot-profil\`,\`${prefix}tablo\`,\`${prefix}bot-bilgi\`,\`${prefix}yardım\``)
.addField("Yetkili Komutları", `\`${prefix}bot-onayla\`,\`${prefix}bot-reddet\`,\`${prefix}başvuru-liste\`,\`${prefix}bot-sil\`,\`${prefix}kontrol-et\``)
.addField("Ayarlama Komutları", `\`${prefix}botlist\`, \`${prefix}botlist-ayarlar\` , \`${prefix}oto-onay\``)  
  .setFooter(ee.footertext,ee.footericon)
return message.channel.send(embed).then(m => m.delete({timeout : 60000}))
};

exports.help = {
  name: "yardım",
  guildOnly: true,
};
exports.conf = {
  aliases: ["help"],
};
