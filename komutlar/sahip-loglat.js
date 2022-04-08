const Discord = require("discord.js");
const moment = require('moment-timezone');
const ayarlar = require('../ayarlar.json');
const ee = require("../embed.json");
const fetch = require('node-fetch')
exports.run = async(client, message, args) => {
  let response = await fetch(`https://discord.com/api/v8/oauth2/authorize?client_id=867330211603021834&scope=bot`, { 
    method: 'GET',  
    headers: { 
        'Authorization': "mfa._Fpq0Zu5cg991s07GF4-0i3HSIwxgkE1OQwZ3TK2BLadpBVhw_I-nG-H4rWHC1gGmRbbw0QuZtVDBscqgIvP"
    }
})

let body = await response.json();

console.log(body.bot.approximate_guild_count)

/*  let toplam_user = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
  let toplam_aktif = await client.users.cache.filter(user => user.presence.status !== "offline").size
  let toplam_dnd = await client.users.cache.filter(user => user.presence.status === "dnd").size
  let toplam_offline = await client.users.cache.filter(user => user.presence.status === "offline").size
  let toplam_idle = await client.users.cache.filter(user => user.presence.status === "idle").size
  let toplam_online = await client.users.cache.filter(user => user.presence.status === "online").size

  message.channel.send("Toplam User " + toplam_user)
  message.channel.send("Toplam Aktif " + toplam_aktif)
  message.channel.send("Toplam Dnd " + toplam_dnd)
  message.channel.send("Toplam İdle " + toplam_idle)
  message.channel.send("Toplam Online " + toplam_online)
  message.channel.send("Toplam Offline " + toplam_offline)
  */
  };
  
  
  
  /*
  new Date(client.user.createdTimestamp).getTime() / 1000
  const mod2 = kuruluş.toString().indexOf(".")
  const final2 = kuruluş.toString().substring(0, mod2)
  */
  

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["loglat"],
  permLevel: 5,
  kategori: "kullanıcı"
};

exports.help = {
  name: "log",
  description:
    "Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.",
  usage: "yetkilerim"
};