
const Discord = require('discord.js');
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
const disbut = require("discord-buttons")
disbut(client)
const ee = require('./embed.json');
require("./inlineReply.js");
require('./eventLoader.js')(client);
const fs = require('fs');
const  db  = require('quick.db');
//const chalk = require('chalk');

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
client.on('ready', () => {
  console.log('');
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 5;
    return permlvl;
};


       

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});




//---------------------------------KOMUTLAR---------------------------------\\
client.on('guildMemberAdd', member => {
if(db.get(`otoonay.${member.guild.id}`)){
if(member.user.bot){
    if(db.get(`serverData.${member.guild.id}.botsData.${member.user.id}`)){
        let bot = db.get(`serverData.${member.guild.id}.botsData.${member.user.id}`)
        if(bot.id == member.user.id){
            if(!member.guild.members.cache.get(bot.owner)){
               return
               }
            member.guild.members.cache.get(bot.owner).roles.add(db.get(`gelistiricirol${member.guild.id}`))
            member.guild.members.cache.get(member.user.id).roles.add(db.get(`botrol${member.guild.id}`))
            if(bot.status == "Beklemede")  db.subtract(`serverData.${member.guild.id}.waitSize`, 1)
            if(bot.status == "Reddedildi")  db.subtract(`serverData.${member.guild.id}.redSize`, 1)
            db.add(`serverData.${member.guild.id}.succSize`, 1);
            db.set(`serverData.${member.guild.id}.botsData.${bot.id}.status`, "Onaylı")
            let botcuk = member.guild.members.cache.get(bot.id).user.tag
            let bot_sahibi = member.guild.members.cache.get(bot.owner).user.tag
            member.guild.channels.cache.get(db.get(`logkanal${member.guild.id}`)).send(new Discord.MessageEmbed()
      .setColor(ee.color)
    .setAuthor(client.user.tag, client.user.avatarURL({dynamic: true}))
    .setFooter(ee.footertext,ee.footericon)
              .setTitle(`${ee.onay}|Bir Bot Otomatik Onaylandı | \`${botcuk}\``)
              .setDescription(`
          **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
          > 
          > **:flag_us: ・  Hey \`${bot_sahibi}\`,**
          > **\`${botcuk}\` bot named  was approved by ${client.user}.**
          > 
          > **:flag_tr: ・  Hey \`${bot_sahibi}\`,**
          > **\`${botcuk}\` adlı botun ${client.user} tarafından onaylandı!**
          > 
          **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
            )
        }
    }
}
} else {
  return;
}


  }) 







client.on('guildMemberRemove', async member => {
  member.guild.members.cache.filter(s => db.get(`serverData.${member.guild.id}.botsData.${s.id}`)).forEach(x => {
    let bot = db.fetch(`serverData.${member.guild.id}.botsData.${x.id}`);
    if(bot){
    if(bot.owner == member.id){
           member.guild.members.ban(x, {reason: "Sahibi Sunucudan Ayrıldı."})
          client.channels.cache.get(db.get(`sahiplogkanal${member.guild.id}`)).send(new Discord.MessageEmbed().setColor(ee.color).setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> <@${member.id}> Adlı Kişi Sunucudan Ayrıldığı İçin \n> <@${x.id}> Adlı Botu Sunucudan Yasaklandı\n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
          db.set(`serverData.${member.guild.id}.botsData.${x.id}.status`, "Reddedildi")
          db.set(`serverData.${member.guild.id}.botsData.${x.id}.redReason`, "Sahibi Sunucudan Ayrıldı.")
    }
  }
})
}) 

/*

 //////eklendim atıldım
client.on('guildDelete', guild => {

let avex = new Discord.MessageEmbed()

.setColor("RED")
.setTitle(" Bot Atıldı ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('938837990363504740').send(avex);

});


client.on('guildCreate', guild => {

let embed = new Discord.MessageEmbed()

.setColor("GREEN")
.setTitle(" Bot Eklendi ")
.setDescription(`
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
> **\`Guild Name | ID\` --> ${guild.name} \`|\` ${guild.id}**
> **\`Guild Owner | ID\` --> ${client.users.cache.get(guild.owner.id).tag} \`|\` [\`${guild.owner.id}\`]**
> **\`Members\` -->  \n> \`\`\`${guild.memberCount}\`\`\`**
> **\`Artık Sunucu Sayısı\` ${client.guilds.cache.size}**
  `)
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('938837990363504740').send(embed);

});

 //////eklendim atıldım

*/

client.login(ayarlar.token);