const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// الأوامر اللي يبي الموقع والبوت يدمجوها ويسووها في السيرفر
const commands = [
  new SlashCommandBuilder()
    .setName('gc')
    .setDescription('أمر خاص بـ GHOST CITY')
].map(command => command.toJSON());

client.once('ready', async () => {
  console.log(`تم الاتصال بالموقع بنجاح باسم: ${client.user.tag}`);

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    // هذا السطر هو اللي يدمج أوامر الموقع مع سيرفرك في ديسكورد فوراً
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log('تم دمج وتثبيت الأوامر بنجاح!');
  } catch (error) {
    console.error(error);
  }
});

// استجابة البوت للدمج والأوامر
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'gc') {
    await interaction.reply('تم دمج الموقع مع البوت بنجاح! 🚀 GHOST CITY جاهز.');
  }
});

client.login(process.env.TOKEN);
