const { Events } = require("discord.js");
const moment = require("moment");
const { joinVoiceChannel,  createAudioPlayer,  createAudioResource, getVoiceConnection } = require("@discordjs/voice");
const config = require("../../CONFIGS/config.json");

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  execute: async (oldState, newState) => {
    const AudioPlayer = createAudioPlayer();

    let Radio = config.generell.radio_link;
    const Audio = createAudioResource(Radio);
    AudioPlayer.play(Audio);

    const connectionRadio = getVoiceConnection(newState.guild.id);

    function LeaveStop() {
      connectionRadio.destroy();
      connectionRadio.disconnect();
    }
    
    if(newState.member.id === config.generell.bot_id) {
      setTimeout(async () => {
        try {
          LeaveStop();
        } catch (err) {};

        const connection = await joinVoiceChannel({
            channelId: newState.member.voice.channel.id,
            guildId: newState.guild.id,
            adapterCreator: newState.guild.voiceAdapterCreator
        }).subscribe(AudioPlayer);
    }, 5400000)
  }}
}
