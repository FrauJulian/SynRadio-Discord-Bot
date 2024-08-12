const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js")

const { readdirSync } = require("node:fs")
const BotListMe = require("botlist.me.js")

const { ERR, ValidateLicense, CheckTables } = require("./src/Manager/UtilsManager")
const config = require("./CONFIGS/config.json")

const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
  shards: "auto",
})

let _0x1a2b3c; async function _0x4d5e6f() { return await _0x7g8h9i(); } ((async () => { _0x1a2b3c = await _0x4d5e6f(), _0x1a2b3c && (_0x0j1k2l(), _0x3m4n5o(), _0x6p7q8r(), _0x9s0t1u()); })()); async function _0x7g8h9i() { return await _0xa2b3c4(); } function _0x0j1k2l() { _0xd4e5f6(); } function _0x3m4n5o() { _0x1g2h3i(); } function _0x6p7q8r() { _0x4j5k6l(); } function _0x9s0t1u() { _0x7m8n9o(); } function _0xa2b3c4() { return ValidateLicense(); } function _0xd4e5f6() { RegisterBotLists(); } function _0x1g2h3i() { RegisterCommands(); } function _0x4j5k6l() { RegisterEvents(); } function _0x7m8n9o() { LoginAndExport(); }

function RegisterBotLists() {
  const BotListMeClient = new BotListMe(config.general.bot_lists.bot_list_me, client)

  setInterval(async () => {
    BotListMeClient.on("posted", () => { })
    BotListMeClient.on("error", (err) => {
      ERR(err)
    })
  }, 43200000)
}

async function RegisterCommands() {
  client.commandaliases = new Collection();
  client.commands = new Collection();
  client.slashcommands = new Collection();
  client.slashdatas = [];
  
  let slashcommands = [];
  readdirSync("./src/SlashCommands").forEach(async (file) => {
    let command = await require(`./src/SlashCommands/${file}`);
    client.slashdatas.push(command.data.toJSON());
    client.slashcommands.set(command.data.name, command);
  });
}

function RegisterEvents() {
  readdirSync("./src/Events").forEach(async (file) => {
    let event = await require(`./src/Events/${file}`)
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args))
    } else {
      client.on(event.name, (...args) => event.execute(...args))
    }
  });
}

process.on("unhandledRejection", (err) => {
  ERR(err);
});

process.on("uncaughtException", (err) => {
  ERR(err);
});

process.on("uncaughtExceptionMonitor", (err) => {
  ERR(err);
});

function LoginAndExport() {
  module.exports = client;
  CheckTables();
  client.login(config.general.bot_token);
}