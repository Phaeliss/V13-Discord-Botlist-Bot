const { Discord, MessageEmbed } = require("discord.js");
const embed = require("../embed.json");

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `${embed.red} • Bu Komudu Kullana Bilmek İçin **\'Yönetici\'** Yetkisine Sahip Olmalısın.`
    );

  let mesaj = args[0];
  const rsil = new MessageEmbed()
    .setColor(embed.renk)
    .setAuthor(
      `${client.user.username}`,
      client.user.displayAvatarURL({ dynamic: true, format: "png" })
    )
    .setDescription(`**${embed.ered} ¦ Lütfen Rakam Belirtiniz**`);
  if (!mesaj || isNaN(mesaj)) return message.channel.send(rsil);

  if (mesaj > 600) {
    message.delete();
    const motf = new MessageEmbed()
      .setColor(embed.color)
      .setAuthor(
        `${client.user.username}`,
        client.user.displayAvatarURL({ dynamic: true, format: "png" })
      )
      .setDescription(`**${embed.ered} ¦ 600 Dan Fazla Mesaj Silemezsin**`);
    return message.channel.send(motf);
  }

  if (mesaj < 101) {
    message.channel.bulkDelete(args[0]).then(msg => {
      const moth = new MessageEmbed()
        .setColor(embed.color)
        .setAuthor(
          `${client.user.username}`,
          client.user.displayAvatarURL({ dynamic: true, format: "png" })
        )
        .setDescription(
          `> **${embed.onay} **|** ${msg.size} **Adet Mesaj Silindi!
           > **Silinen Kanal -> ${message.channel}**`
        );
            const moth2 = new MessageEmbed()
        .setColor(embed.color)
        .setAuthor(
          `${client.user.username}`,
          client.user.displayAvatarURL({ dynamic: true, format: "png" })
        )
        .setDescription(
          `> **${embed.onay} **|** ${msg.size} **Adet Mesaj Silindi!`
        );
      message.channel.send(moth2).then(message => {
        message.delete({timeout: 8000})
      })
      return message.author.send(moth);
    });
  }
  if (mesaj > 100 && mesaj < 200) {
    message.channel.bulkDelete(100).then(() => {
      message.channel.bulkDelete(mesaj - 100);
    });
  }
  if (mesaj == 200) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
  }
  if (mesaj > 200 && mesaj < 300) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100).then(() => {
      message.channel.bulkDelete(mesaj - 200);
    });
  }
  if (mesaj == 300) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
  }
  if (mesaj > 300 && mesaj < 400) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100).then(() => {
      message.channel.bulkDelete(mesaj - 300);
    });
  }
  if (mesaj == 400) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
  }
  if (mesaj > 400 && mesaj < 500) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100).then(() => {
      message.channel.bulkDelete(mesaj - 400);
    });
  }
  if (mesaj == 500) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
  }
  if (mesaj > 500 && mesaj < 600) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100).then(() => {
      message.channel.bulkDelete(mesaj - 500);
    });
  }
  if (mesaj == 600) {
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`temizle`,`delete`,`clear`],
  permLevel: 0
};
exports.help = {
  name: `sil`,
  description: `kullanıcıyı karalisteye alır`,
  usage: `karaliste ID`
};