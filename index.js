const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// تعريف أوامر السلاش اللي بيشتغل عليها البوت
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('يرد عليك البوت ليؤكد أنه شغال'),
  new SlashCommandBuilder()
    .setName('gc')
    .setDescription('أمر خاص بسيرفر GHOST CITY')
].map(command => command.toJSON());

client.once('ready', async () => {
  console.log(`تم تسجيل الدخول بنجاح باسم: ${client.user.tag}`);

  // تسجيل الأوامر تلقائياً في السيرفر أول ما يشتغل البوت
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    console.log('جاري تسجيل أوامر السلاش...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log('تم تسجيل أوامر السلاش بنجاح!');
  } catch (error) {
    console.error(error);
  }
});

// التعامل مع تفاعلات أوامر السلاش (Slash Commands)
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong! 🏓 البوت شغال زي الحلاوة ومستجيب لأوامر السلاش');
  } else if (commandName === 'gc') {
    await interaction.reply('أهلاً بك في GHOST CITY - RP! 🛡️ البوت جاهز لخدمتك.');
  }
});

// التعامل مع الرسائل العادية (لو حبيت تكتب !ping)
client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }
});

client.login(process.env.TOKEN);
