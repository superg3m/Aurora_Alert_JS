token = require("./config.json").TOKEN;
const { Client, IntentsBitField } = require("discord.js");

const noaa_json_url = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json" 

// Should be a helper function
var getJSON = function(url, callback) {

};



const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

function fetchNoaaJson() {
  https.get(noaa_json_url, res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.on('data', chunk => {
      data.push(chunk);
    });

    res.on('end', () => {
      console.log('Response ended: ');
      const entries = JSON.parse(Buffer.concat(data).toString());

      for(entry of entries) {
        console.log(`time: ${entry[0]}, kp_index: ${entry[1]}`);
      }
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  });
}

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "hello") {
    message.reply("hello");
  }
});

client.login(token);
