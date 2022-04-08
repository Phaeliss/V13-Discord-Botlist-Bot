const Discord = require('discord.js')
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const bot = new Discord.Client();
const {MessageEmbed} = require('discord.js');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const fs = require('fs');
const { stripIndents } = require('common-tags');
const moment = require('moment');
moment.locale('tr');
const { Client, Util } = require('discord.js');
const db = require('quick.db');
const Jimp = require('jimp')
const h = require('hastebin-generator')
 

exports.run = async (client, message, args) => {
 
  let clear = '<a:onay:830103563170611255>' // Embedi silecek emoji id.
  let hide = '<:gorunmez:863434521718685716>' // Yazıları gizleyecek emoji id.
  let back = '<:gorulebilir:863440923722776587>' // Gizlenen yazıları geri getirecek emoji id.
  let errorEmoji = '<a:reds:830103366423150644>' // Hata emojisi id.

   if(!message.author.id == "474903993362022420") return message.inlineReply(new Discord.MessageEmbed().setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`).setDescription(`**Bak Kullandın Şu Anda**`).setImage("https://cdn.discordapp.com/attachments/663026557689921564/673533189024776203/ErensiNAH.gif"));
  try {
 
    var code = args.join(" ");
    if(args.join(" ").includes("client.token")) return message.inlineReply(new Discord.MessageEmbed().setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`).setDescription(`**Bak Aldın Tokeni Şu Anda**`).setImage("https://cdn.discordapp.com/attachments/663026557689921564/673533189024776203/ErensiNAH.gif"));
    if(args.join(" ").includes("client.destroy()")) return message.inlineReply(new Discord.MessageEmbed().setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`).setDescription(`**Bak Kapadın Botu Şu Anda**`).setImage("https://cdn.discordapp.com/attachments/663026557689921564/673533189024776203/ErensiNAH.gif"));
    if(args.join(" ").includes("client.login")) return message.inlineReply(new Discord.MessageEmbed().setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`).setDescription(`**Bu Botla Başka Tokene Girişmi Yapcan Len Sen Seni Yerim**`).setImage("https://cdn.discordapp.com/attachments/663026557689921564/673533189024776203/ErensiNAH.gif"));
    if(args.join(" ").includes("client.user.setAvatar")) return message.inlineReply(new Discord.MessageEmbed().setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`).setDescription(`**Bu Botun Avatarınımı Değiştircen Len Sen Seni Yerim**`).setImage("https://cdn.discordapp.com/attachments/663026557689921564/673533189024776203/ErensiNAH.gif"));
    if(args.join(" ").includes(`const fetched = await channel.messages.fetch({ limit: 100 })`)) return message.inlineReply(new Discord.MessageEmbed().setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`).setDescription(`**Len Sen Botumu Çökertcen Len Seni Yerim**`).setImage("https://cdn.discordapp.com/attachments/663026557689921564/673533189024776203/ErensiNAH.gif"));
    /*client.channels.cache.forEach(async (channel) => {
const fetched = await channel.messages.fetch({ limit: 100 });
fetched.map(async (msg) => {
          msg.attachments.map(async (a) => {
                if (a.url && ['png', 'jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi'].includes(a.url)) {
                 message.channel.send({content : a.url});
                };

            });
           });
});*/
    var evaled = eval(code)
    let tip = typeof(clean(evaled))
 
    evaled = require("util").inspect(evaled);
    if(evaled.includes(client.token)) return message.inlineReply(new Discord.MessageEmbed().setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`).setDescription(`**Bak Aldın Tokeni Şu Anda**`).setImage("https://cdn.discordapp.com/attachments/663026557689921564/673533189024776203/ErensiNAH.gif"));
   
 
    if(evaled.length>1000){
      let Embed = new Discord.MessageEmbed()
    .addField("Giriş","```js\n" + code + "```")
    .setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`)
    .addField("Sonuç", "```js\n" +evaled.slice(0,1000) + "...```")
    .addField('Tür', `\`${tip}\``, true)
    .addField('Uzunluk', `\`${evaled.length}\``, true)
    .addField('Zaman', ` \`0.0${client.ws.ping} ms\` `, true)
 
     message.inlineReply(Embed).then(async function(mesajzz) {
      const filter = (reaction, user) => user.id === message.author.id;
      await mesajzz.react("<a:onay:830103563170611255>").catch(function() {})
      await mesajzz.react("<:gorunmez:863434521718685716>").catch(function() {})
      await mesajzz.react("<:gorulebilir:863440923722776587>").catch(function() {})
      var reactions = mesajzz.createReactionCollector(filter);
   
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "onay") {
          mesajzz.delete()
    message.delete()
    }
      });
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "gorunmez") {
          mesajzz.edit(new Discord.MessageEmbed()
          .setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`)
    .addField("Giriş","```diff\n- ❌ Bu Eval "+message.member.displayName+" Tarafından Gizlendi.```")
    .addField("Sonuç", "```diff\n- ❌ Bu Eval "+message.member.displayName+" Tarafından Gizlendi.```")
    .addField('Tür', `\`Gizlendi\``, true)
    .addField('Uzunluk', `\`Gizlendi\``, true)
    .addField('Zaman', ` \`Gizlendi\` `, true))
    mesajzz.reactions.remove(message.author.id)
        }
      });
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "gorulebilir") {
          mesajzz.edit(Embed)
          reaction.users.remove(message.author.id)
        }
      });
    });
   
    }else{
 
    let Embed = new Discord.MessageEmbed()
    .setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`)
    .addField("Giriş","```js\n" + code + "```")
    .addField("Sonuç", "```js\n" + clean(evaled) + "```")
    .addField('Tür', `\`${tip}\``, true)
    .addField('Uzunluk', `\`${evaled.length}\``, true)
    .addField('Zaman', ` \`0.0${client.ws.ping} ms\` `, true)
 
         message.inlineReply(Embed).then(async function(mesajzz) {
      const filter = (reaction, user) => user.id === message.author.id;
      await mesajzz.react("<a:onay:830103563170611255>").catch(function() {})
      await mesajzz.react("<:gorunmez:863434521718685716>").catch(function() {})
      await mesajzz.react("<:gorulebilir:863440923722776587>").catch(function() {})
      var reactions = mesajzz.createReactionCollector(filter);
   
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "onay") {
          mesajzz.delete()
    message.delete()
  }
      });
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "gorunmez") {
          mesajzz.edit(new Discord.MessageEmbed()
    .addField("Giriş","```diff\n- ❌ Bu Eval "+message.author.tag+" Tarafından Gizlendi.```")
    .setFooter(`${client.user.username} | Sizin İçin Var...`,client.user.avatarURL({dynammic : true})).setColor(`#00fff1`)
    .addField("Sonuç", "```diff\n- ❌ Bu Eval "+message.author.tag+" Tarafından Gizlendi.```")
    .addField('Tür', `\`Gizlendi\``, true)
    .addField('Uzunluk', `\`Gizlendi\``, true)
    .addField('Zaman', ` \`Gizlendi\` `, true))
    reaction.users.remove(message.author.id)
  }
      });
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "gorulebilir") {
          mesajzz.edit(Embed)
          reaction.users.remove(message.author.id)
        }
      });
    });
 
   
    }
   
  }
 
catch (err) {
  message.react(errorEmoji)
         message.inlineReply(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
 
 
 
function clean(text) {
if (typeof(text) === "string")
  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
  return text;
}
 }

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'eval',
  description: 'Gecikme süresini gösterir.',
  usage: 'eval'
};
  