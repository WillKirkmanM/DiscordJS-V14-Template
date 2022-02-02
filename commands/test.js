module.exports = {
	name: 'test',
	description: 'A Simple Test Command',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: (message, args, client) => {
		message.reply('A Simple Test Command, To edit this text, go into Commands/test.js');
	},
};
