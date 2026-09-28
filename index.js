const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`تم تشغيل البوت بنجاح وأصبح متصلاً باسم: ${client.user.tag}`);
});

// البوت هنا متصل فقط وجاهز ليعمل مع بقية البوتات والخدمات بدون تعارض

client.login(process.env.TOKEN);
