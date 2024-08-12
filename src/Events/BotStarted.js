const { Events } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const moment = require("moment");

const { ERR } = require("../Manager/UtilsManager");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    const rest = new REST({ version: "10" }).setToken(client.token);

    console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] Logged in as '${client.user.username}'!`);

    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.slashdatas,
      });
    } catch (err) {
      ERR(err)
    }
  },
};
