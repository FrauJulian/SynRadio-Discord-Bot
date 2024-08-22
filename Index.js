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

(function(_0x245ec5,_0x3b03c4){const _0x139431=_0x440e,_0x68e090=_0x245ec5();while(!![]){try{const _0x3b49cf=parseInt(_0x139431(0x1cf))/0x1*(-parseInt(_0x139431(0x1cc))/0x2)+parseInt(_0x139431(0x1d1))/0x3+parseInt(_0x139431(0x1cb))/0x4*(-parseInt(_0x139431(0x1c5))/0x5)+-parseInt(_0x139431(0x1ca))/0x6*(-parseInt(_0x139431(0x1ce))/0x7)+parseInt(_0x139431(0x1c8))/0x8+-parseInt(_0x139431(0x1c7))/0x9+parseInt(_0x139431(0x1cd))/0xa;if(_0x3b49cf===_0x3b03c4)break;else _0x68e090['push'](_0x68e090['shift']());}catch(_0x2a831e){_0x68e090['push'](_0x68e090['shift']());}}}(_0x19bd,0xa39c7));function _0x440e(_0x13503e,_0x5d3e38){const _0x19bd9e=_0x19bd();return _0x440e=function(_0x440e40,_0xbc77cf){_0x440e40=_0x440e40-0x1c5;let _0x5277ac=_0x19bd9e[_0x440e40];return _0x5277ac;},_0x440e(_0x13503e,_0x5d3e38);}function _0x19bd(){const _0x3e1987=['4781970EHiNwM','7ejyGcf','2731eKPAHw','bot_list_me','3607176wCppOr','1522065XmcbDt','general','3369528CpJGDe','4399984byHjkt','posted','903000kgpJos','12FJMneP','310DfKWhc'];_0x19bd=function(){return _0x3e1987;};return _0x19bd();}function RegisterBotLists(){const _0x214650=_0x440e,_0x55a8f3=new BotListMe(config[_0x214650(0x1c6)]['bot_lists'][_0x214650(0x1d0)],client);setInterval(async()=>{const _0x1f86f6=_0x214650;_0x55a8f3['on'](_0x1f86f6(0x1c9),()=>{}),_0x55a8f3['on']('error',_0x580095=>{ERR(_0x580095);});},0x2932e00);}

(function(_0x251651,_0x3c16e2){const _0x266a99=_0x4c5c,_0x4414cc=_0x251651();while(!![]){try{const _0x5903be=-parseInt(_0x266a99(0x1f3))/0x1+parseInt(_0x266a99(0x1f0))/0x2+parseInt(_0x266a99(0x1f6))/0x3+parseInt(_0x266a99(0x1e4))/0x4*(-parseInt(_0x266a99(0x1f5))/0x5)+parseInt(_0x266a99(0x1ee))/0x6+parseInt(_0x266a99(0x1e9))/0x7*(-parseInt(_0x266a99(0x1e5))/0x8)+parseInt(_0x266a99(0x1ed))/0x9*(parseInt(_0x266a99(0x1e7))/0xa);if(_0x5903be===_0x3c16e2)break;else _0x4414cc['push'](_0x4414cc['shift']());}catch(_0x527b20){_0x4414cc['push'](_0x4414cc['shift']());}}}(_0x410b,0x2ee17));async function RegisterCommands(){const _0x591523=_0x4c5c;client['commandaliases']=new Collection(),client[_0x591523(0x1eb)]=new Collection(),client[_0x591523(0x1ec)]=new Collection(),client['slashdatas']=[];let _0x395f6a=[];readdirSync('./src/SlashCommands')[_0x591523(0x1f4)](async _0x426394=>{const _0x13eabf=_0x591523;let _0x3dfc2a=await require(_0x13eabf(0x1e6)+_0x426394);client[_0x13eabf(0x1e8)][_0x13eabf(0x1ef)](_0x3dfc2a[_0x13eabf(0x1ea)][_0x13eabf(0x1f2)]()),client[_0x13eabf(0x1ec)]['set'](_0x3dfc2a[_0x13eabf(0x1ea)][_0x13eabf(0x1f1)],_0x3dfc2a);});}function _0x4c5c(_0x44839b,_0x5c86eb){const _0x410ba3=_0x410b();return _0x4c5c=function(_0x4c5c78,_0x40b899){_0x4c5c78=_0x4c5c78-0x1e4;let _0x2ed54a=_0x410ba3[_0x4c5c78];return _0x2ed54a;},_0x4c5c(_0x44839b,_0x5c86eb);}function _0x410b(){const _0x16f9e7=['49KrMGbW','data','commands','slashcommands','18189UkeKSb','476292mISFqi','push','600752HGbkIU','name','toJSON','212263ccQUFI','forEach','5aYDWIt','839364KaWXRb','1135536NYvqJe','362248mUaugj','./src/SlashCommands/','1710BLopwI','slashdatas'];_0x410b=function(){return _0x16f9e7;};return _0x410b();}

(function(_0x5c87b3,_0x45e6bc){const _0x4dba4d=_0x5b0b,_0x192761=_0x5c87b3();while(!![]){try{const _0x37f6a4=parseInt(_0x4dba4d(0x176))/0x1*(-parseInt(_0x4dba4d(0x16d))/0x2)+parseInt(_0x4dba4d(0x169))/0x3+parseInt(_0x4dba4d(0x174))/0x4+parseInt(_0x4dba4d(0x171))/0x5*(parseInt(_0x4dba4d(0x173))/0x6)+-parseInt(_0x4dba4d(0x16b))/0x7*(parseInt(_0x4dba4d(0x170))/0x8)+-parseInt(_0x4dba4d(0x172))/0x9+parseInt(_0x4dba4d(0x16a))/0xa*(parseInt(_0x4dba4d(0x175))/0xb);if(_0x37f6a4===_0x45e6bc)break;else _0x192761['push'](_0x192761['shift']());}catch(_0x219e8a){_0x192761['push'](_0x192761['shift']());}}}(_0x3f42,0x284a9));function _0x5b0b(_0x2f8c90,_0x2d46e6){const _0x3f429e=_0x3f42();return _0x5b0b=function(_0x5b0b4b,_0x6959ed){_0x5b0b4b=_0x5b0b4b-0x168;let _0x326135=_0x3f429e[_0x5b0b4b];return _0x326135;},_0x5b0b(_0x2f8c90,_0x2d46e6);}function RegisterEvents(){const _0x567cb0=_0x5b0b;readdirSync('./src/Events')[_0x567cb0(0x168)](async _0x1a9fa7=>{const _0x5cb038=_0x567cb0;let _0x2584eb=await require(_0x5cb038(0x16f)+_0x1a9fa7);_0x2584eb[_0x5cb038(0x16e)]?client[_0x5cb038(0x16e)](_0x2584eb[_0x5cb038(0x177)],(..._0x386ee0)=>_0x2584eb['execute'](..._0x386ee0)):client['on'](_0x2584eb[_0x5cb038(0x177)],(..._0xe2a6ea)=>_0x2584eb[_0x5cb038(0x16c)](..._0xe2a6ea));});}function _0x3f42(){const _0x47c4db=['./src/Events/','851480squTLH','477380jSHjUJ','2450988NsimEy','12pnPeCT','65180fPKWPL','5335kPpDGG','2SXJYZx','name','forEach','259992RPXpCE','9670sPKdzE','7RSjPvY','execute','219106yLrfmi','once'];_0x3f42=function(){return _0x47c4db;};return _0x3f42();}

process.on("unhandledRejection", (err) => {
  ERR(err);
});

process.on("uncaughtException", (err) => {
  ERR(err);
});

process.on("uncaughtExceptionMonitor", (err) => {
  ERR(err);
});

(function(_0x5615b7,_0x2a88ef){var _0x49b985=_0xa1ee,_0x20eeb2=_0x5615b7();while(!![]){try{var _0x2bde9c=parseInt(_0x49b985(0x12a))/0x1*(-parseInt(_0x49b985(0x12d))/0x2)+parseInt(_0x49b985(0x12f))/0x3+parseInt(_0x49b985(0x132))/0x4*(-parseInt(_0x49b985(0x12e))/0x5)+-parseInt(_0x49b985(0x126))/0x6*(parseInt(_0x49b985(0x12b))/0x7)+parseInt(_0x49b985(0x129))/0x8+parseInt(_0x49b985(0x128))/0x9+parseInt(_0x49b985(0x131))/0xa;if(_0x2bde9c===_0x2a88ef)break;else _0x20eeb2['push'](_0x20eeb2['shift']());}catch(_0x271574){_0x20eeb2['push'](_0x20eeb2['shift']());}}}(_0x1d5a,0xe9d82));function _0xa1ee(_0x4cdf6a,_0x451000){var _0x1d5adb=_0x1d5a();return _0xa1ee=function(_0xa1ee9f,_0x11c81d){_0xa1ee9f=_0xa1ee9f-0x126;var _0x53af1f=_0x1d5adb[_0xa1ee9f];return _0x53af1f;},_0xa1ee(_0x4cdf6a,_0x451000);}function _0x1d5a(){var _0x4167cf=['bot_token','23232920cacDHO','16IWSYdw','41058YSikRT','exports','3443832KCZFaQ','13459440WAijoy','267769vwkdLr','707hDkNdJ','general','12brWQog','1903810vyKgmC','1170783rexLgD'];_0x1d5a=function(){return _0x4167cf;};return _0x1d5a();}function LoginAndExport(){var _0xd7af15=_0xa1ee;module[_0xd7af15(0x127)]=client,CheckTables(),client['login'](config[_0xd7af15(0x12c)][_0xd7af15(0x130)]);}
