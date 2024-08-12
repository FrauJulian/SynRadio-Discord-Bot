const { Events, ActivityType } = require("discord.js");

const { FetchData } = require("../Manager/UtilsManager.js");
const config = require("../../CONFIGS/config.json")

module.exports = {
  name: Events.ClientReady,
  once: false,
  execute: async (client) => {
    setInterval(async () => {
      var songData = await FetchData(config.general.radio_information.current_song)

      client.user.setPresence({
        activities: [
          {
            name: `🎺 ${"'" + songData.title + "' von " + songData.artist.name || "Akutell spielt kein Song!"}`,
            type: ActivityType.Custom,
          },
        ],
        status: `🎺 ${"'" + songData.title + "' von " + songData.artist.name || "Akutell spielt kein Song!"}`,
      });
    }, 3500);
  },
};
