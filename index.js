const { Client, GatewayIntentBits } = require('discord.js');

// إنشاء نسخة البوت مع تفعيل الصلاحيات اللازمة لقراءة الرسائل والمحتوى
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// حدث يشتغل أول ما يشتغل البوت ويتصل بريلواي
client.once('ready', () => {
  console.log(`تم تسجيل الدخول بنجاح باسم: ${client.user.tag}`);
});

// حدث استقبال الرسائل والرد على الأوامر
client.on('messageCreate', message => {
  // نتأكد إن الرسالة مو من بوت ثاني
  if (message.author.bot) return;
  
  // إذا كتب المستخدم !ping البوت بيرد عليه
  if (message.content === '!ping') {
    message.reply('Pong! 🏓 البوت شغال زي الحلاوة');
  }
});

// ربط البوت بالتوكن المخزن في إعدادات ريلواي
client.login(process.env.TOKEN);
