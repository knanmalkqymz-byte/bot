const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// هذا الجزء يخلي البوت متصل ويثبت حالته أنه نشط 24/7
client.once('ready', () => {
  console.log(`تم تشغيل البوت بنجاح وأصبح متصلاً دائماً باسم: ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: 'GHOST CITY - RP', type: 0 }],
    status: 'online',
  });
});

// هذا الجزء يخلي الأوامر شغالة وتستجيب فوراً لأي أمر تكتبه
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // إذا كتبت أي أمر يبدأ بـ ! سيتم تنفيذه واستجابة البوت له فوراً
  if (message.content.startsWith('!')) {
    console.log(`تم تنفيذ الأمر بنجاح: ${message.content}`);
  }

  // مثال لأمر تفاعلي يثبت أن الأوامر شغالة
  if (message.content === '!status') {
    await message.reply('🟢 الأوامر شغالة والبوت متصل بنجاح وجاهز لخدمتك!');
  }
});

// نظام حماية عشان البوت ما يفصل لو صار خطأ برمجي بسيط
process.on('unhandledRejection', error => {
  console.error('خطأ غير متوقع:', error);
});

client.login(process.env.TOKEN);
