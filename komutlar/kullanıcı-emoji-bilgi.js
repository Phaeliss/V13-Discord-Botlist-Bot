const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let emojiname = args[0];
  const emoji = message.guild.emojis.cache.find(
    butz => butz.name === emojiname
  );
  if (!emojiname)
    return message.channel.send(
      "**Emoji ismi yazmalısın!**"
    );
  const butz = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(`${emoji.url}`)
    .addField("• Emojinin ismi", `${emojiname}`)
    .addField("• Emoji ID", `${emoji.id}`)
    .addField("• Link", `${emoji.url}`)
    .addField("• Bot için hazır",`\`\`\`<a:${emojiname}:${emoji.id}>\`\`\``)

  message.channel.send(butz);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emoji-info","emojibilgi"],
  permLevel: 0
};

exports.help = {
  name: "emoji-bilgi",
  description: "",
  usage: ""
};