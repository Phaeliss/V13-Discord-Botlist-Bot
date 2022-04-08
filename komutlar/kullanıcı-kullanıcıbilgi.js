const Discord = require("discord.js");
const moment = require('moment-timezone');
const ayarlar = require('../ayarlar.json');
const ee = require("../embed.json");
exports.run = (client, message, args) => {
let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
if(message.guild.members.cache.get(user.id)){
    let user_2 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  ///////////Platform Sorgusu/////////////////  
      let platform_arr = {
          web: `${ee.web}|İnternet Tarayıcısı`,
          desktop: `${ee.desktop}|Bilgisayar`,
          mobile: `${ee.phone}|Mobil`
        }
      let status_arr = {
        idle:`${ee.status.idle} |`,
        online:`${ee.status.online} |`,
        dnd:`${ee.status.dnd} |`
      }
  let status;
  if(user_2.presence.clientStatus){
  status = status_arr[Object.values(user_2.presence.clientStatus)[0]]

  }
  console.log(user_2.presence.clientStatus)
  let platform;
  if(user.bot) {
  platform = 'Discord API'
  }else if(status !== undefined){
    platform = platform_arr[Object.keys(user_2.presence.clientStatus)[0]];
  }else if(status == undefined || !status){
    status = `${ee.status.offline}`
    platform = ""
  };
  
  ///////////Platform Sorgusu/////////////////
  
  ///////////Rozet Sorgusu/////////////////
  let rozetler = false;
  if(user.bot){
    rozetler = false;
  }else if(user.flags == null || !user.flags || user.flags.toArray().length <= 0) {
  rozetler = false;
  } else {
  rozetler = true;
  };
  console.log(rozetler)
  let mentionFlags;
  if(rozetler == true){
  mentionFlags = user.flags.toArray().join(' | ')
  .replace('HOUSE_BRAVERY', `${ee.badgeemojis.house_bravery}`)  
  .replace('HOUSE_BRILLIANCE', `${ee.badgeemojis.house_brilliance}`)
  .replace('HOUSE_BALANCE', `${ee.badgeemojis.house_balance}`)
  .replace('EARLY_VERIFIED_DEVELOPER', `${ee.badgeemojis.early_verified_bot_developer}`)
  .replace('VERIFIED_DEVELOPER', ``)
  .replace('DISCORD_EMPLOYEE', `${ee.badgeemojis.discord_employee}`)
  .replace('PARTNERED_SERVER_OWNER', `${ee.badgeemojis.partnered_server_owner}`)
  .replace('HYPESQUAD_EVENTS', `${ee.badgeemojis.hype_squad_events}`)
  .replace('BUGHUNTER_LEVEL_1', `${ee.badgeemojis.bug_hunter_1}`)
  .replace('EARLY_SUPPORTER', `${ee.badgeemojis.early_supporter}`)
  .replace('BUGHUNTER_LEVEL_2', `${ee.badgeemojis.bug_hunter_2}`)
  } else {
    mentionFlags = 'Kullanıcı Hiçbir Rozete Sahip Değil'
  }
  ///////////Rozet Sorgusu/////////////////
  ///////////Kayıt Tarihi Sorgusu/////////////////
  
  const kuruluş = new Date(user.createdTimestamp).getTime() / 1000 
  const mod1 = kuruluş.toString().indexOf(".")
  const final1 = kuruluş.toString().substring(0, mod1)
  
  const kuruluş2 = new Date(user.createdTimestamp).getTime() / 1000 
  const mod2 = kuruluş2.toString().indexOf(".")
  const final2 = kuruluş2.toString().substring(0, mod2)
  ///////////Kayıt Tarihi Sorgusu/////////////////
  
  const giriş = new Date(user_2.joinedTimestamp).getTime() / 1000 
  const mod3 = giriş.toString().indexOf(".")
  const final3 = giriş.toString().substring(0, mod3)
  
  const giriş2 = new Date(user_2.joinedTimestamp).getTime() / 1000 
  const mod4 = giriş2.toString().indexOf(".")
  const final4 = giriş2.toString().substring(0, mod4)
  let boostsüre;
  if(user_2.premiumSinceTimestamp == null || !user_2.premiumSinceTimestamp) boostsüre = "Boost Basmamış"
  
  const boost = new Date(user_2.premiumSinceTimestamp).getTime() / 1000 
  const mod5 = boost.toString().indexOf(".")
  const final5 = boost.toString().substring(0, mod5)
  
  let sonuç = boostsüre || `<t:${final5}> | <t:${final5}:R>`
  message.channel.send(new Discord.MessageEmbed()
  .setColor(ee.renk)
  .setAuthor(user.tag,user.avatarURL({dynamic:true,size:2048}))
  .setFooter(ee.footertext,ee.footericon)
  .setDescription(`
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
  > 
  > **__\`\`Platform/Durum\`\`__ --> ${status} ${platform}**
  > 
  > **__\`\`Discorda Kayıt Tarihi\`\`__ --> <t:${final1}> | <t:${final2}:R>**
  > 
  > **__\`\`Sunucuya Giriş Tarihi\`\`__ --> <t:${final3}> | <t:${final4}:R>**
  > 
  > **__\`\`Boost Tarihi\`\`__ --> ${sonuç}**
  > 
  > **__\`\`Rozetler\`\`__ -->** ${rozetler ? mentionFlags : '**Kullanıcı Hiçbir Rozete Sahip Değil**'}
  > 
  **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`))
  }
  else{
   message.channel.send(`Bu Kullanıcıyı Bulamıyorum`)
  }
  };
  
  
  
  /*
  new Date(client.user.createdTimestamp).getTime() / 1000
  const mod2 = kuruluş.toString().indexOf(".")
  const final2 = kuruluş.toString().substring(0, mod2)
  */
  

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kullanıcı-bilgi","kullanıcıbilgi","user-info","userinfo","ui"],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: "kb",
  description:
    "Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.",
  usage: "yetkilerim"
};