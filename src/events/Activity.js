const { Events, ActivityType } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: Events.ClientReady,
  once: false,
  execute: async (client) => {

    setInterval(async () => {
        const url = await fetch("https://api.laut.fm/station/synradiode/current_song");
        if(url.ok) {
            var RadioData = await url.json(); 

                client.user.setPresence({
                    activities: [{ name: `🎵 ${RadioData.artist.name + " - " + RadioData.title || "Akutell Spielt kein Song!"}`, type: ActivityType.Custom }],
                    status: `🎵 ${RadioData.artist.name + " - " + RadioData.title || "Akutell Spielt kein Song!"}`,
                });
        }}, 2500)
    }
}
