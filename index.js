const { Client, GatewayIntentBits } = require('discord.js');

// إعداد عميل البوت مع الصلاحيات المطلوبة
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`تم تسجيل الدخول بنجاح باسم ${client.user.tag}!`);
});

// أمر تجريبي بسيط للتأكد من استجابة البوت
client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

// تشغيل البوت باستخدام التوكن المحفوظ في متغيرات ريلواي
client.login(process.env.TOKEN);
