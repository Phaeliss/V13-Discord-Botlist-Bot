const reqEvent = (event) => require(`./events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready.js')(client));
  client.on('message', reqEvent('message.js'));
};