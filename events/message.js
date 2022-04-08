const Discord = require("discord.js");
const client = new Discord.Client({ restTimeOffset: 100, messageCacheMaxSize: 50 });
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ee = require('../embed.json')
let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if(message.guild){
    if(message.channel.id == (db.get(`eklekanal${message.guild.id}`) || null)) message.delete({timeout: 5000})
  }
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    db.add(`toplamkullanım`, 1)
    console.log(`${message.author.tag} Adlı Kişi ${cmd.help.name} Adlı Komutu Kullandı`)
	if(db.get(`karaliste_${message.author.id}`)){
		var DURATION = require('humanize-duration');
	let kişibilgisi = db.get(`karaliste_${message.author.id}`)
       if (kişibilgisi.sonuç == 'aktif') {
		   let karalisteyealan = db.get(`karalisteye-alan_${message.author.id}`)
		var TIMESTAMP = Date.now() - karalisteyealan.time;
		var RESULT = DURATION(TIMESTAMP, { language: 'tr', round: true, conjunction: ', ', serialComma: false });
		 return message.inlineReply(new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext,ee.footericon).setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic:true})).setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> **\`Hey Sen, Botun Karalistesine Alınmışsın\`**\n> **\`${RESULT}\` önce karalisteye alınmışsın.**\n> **\`${karalisteyealan.author.tag}\` Tarafından \`${kişibilgisi.reason}\` Sebebi İle Karalisteye Alınmışsın**`));
	 } } 
    ///////
 if(cmd && cmd.help.name !== 'bakım-modu') {
	const bakımdamı = db.get('bot-bakımda');
	if(bakımdamı == true) {
	var DURATION = require('humanize-duration');
	const bakımaalan = db.get('botu-bakıma-alan');
	var TIMESTAMP = Date.now() - bakımaalan.time;
	var RESULT = DURATION(TIMESTAMP, { language: 'tr', round: true, conjunction: ', ', serialComma: false });
	if(ayarlar.sahip.includes(message.author.id)){
     
	} else { 
	message.react(ee.red);
	return message.inlineReply(new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext,ee.footericon).setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic:true})).setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\n> **\`${client.user.username}\` Bot şu anda bakımda.**\n> **\`${RESULT}\` önce bakıma alınmış.**\n> **\`${bakımaalan.author.tag}\` Tarafından Bakıma Alınmış**`));
	}};
	};
      if (cmd.conf.enabled === false) {
      if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.sahip.includes(message.author.id)) {
        const embed = new Discord.MessageEmbed()
                    .setDescription(`<:system:829058387353272350> **${cmd.help.name}**  isimli komut şuanda geçici olarak kullanıma kapalıdır!`)
                    .setColor("RED")
                message.channel.send({embed})
                return
      }
    }
    
    if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`)
          .setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 5) {
			if (!ayarlar.sahip.includes(message.author.id)) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`<:system:829058387353272350> Bu komutu sadece \`sahibim\` kullanabilir!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }






};


