const { Events } = require("discord.js");
const moment = require("moment");
const { joinVoiceChannel,  createAudioPlayer,  createAudioResource, getVoiceConnection } = require("@discordjs/voice");
const config = require("../../CONFIGS/config.json");

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  execute: async (oldState, newState) => {
    const connectionRadio = getVoiceConnection(newState.guild.id);

    if(newState.member.id === config.generell.bot_id) {
      setTimeout(async () => {
        connectionRadio.destroy();
    }, 10800000)
  }}
}
