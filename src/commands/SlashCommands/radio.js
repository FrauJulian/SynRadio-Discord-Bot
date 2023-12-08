const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json")
const { joinVoiceChannel,  createAudioPlayer,  createAudioResource, getVoiceConnection } = require("@discordjs/voice");
const clientC = require("../../../index");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("radio")
	.setDescription("🎵 | Hole dir mit diesen Befehl den SynRadio in deinen Kanal!"),
    run: async (client, interaction) => {
        const AudioPlayer = createAudioPlayer();
        const voiceChannel = interaction.member.voice.channel;

        let embed_author_text = config.radio_embed_theme.embed_author_text;
        let embed_author_icon = config.radio_embed_theme.embed_author_icon;
        let embed_footer_text = config.radio_embed_theme.embed_footer_text;
        let embed_footer_icon = config.radio_embed_theme.embed_footer_icon;
        let embed_color = config.radio_embed_theme.embed_color;

        if (!voiceChannel) {
            const voiceChannelEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text + "SPRACHKANAL", iconURL: embed_author_icon })
            .setDescription(`**Du musst in einem Sprachkanal sein um das Musik System zu nutzen!**`)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            return interaction.reply({ embeds: [voiceChannelEmbed], ephemeral: true });
        }

        if (interaction.guild.members.me.voice.channelId !== null) {
            if (interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
                const alreadyActiveEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text + "BEREITS AKTIV", iconURL: embed_author_icon })
                .setDescription(`## Der Bot ist auf diesen Server bereits aktiv! Du findest den Bot in <#${interaction.guild.members.me.voice.channelId}>!`)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                return interaction.reply({ embeds: [alreadyActiveEmbed], ephemeral: true });
            }
        }

        let Radio = config.generell.radio_link;
        const Audio = createAudioResource(Radio);
        AudioPlayer.play(Audio);

        const RadioPlay = new EmbedBuilder()
        .setAuthor({ name: embed_author_text + "GESTARTET", iconURL: embed_author_icon })
        .setDescription(`## Das Radio wurde für die beste Laune gestartet!`)
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)

        const connectionRadio = getVoiceConnection(interaction.guild.id);

        try {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            }).subscribe(AudioPlayer);
            interaction.reply({ embeds: [RadioPlay], ephemeral: true });
        } catch (err) {
            console.log(err)

            let eembed_author_text = config.fehler_embed.embed_author_text;
            let eembed_author_icon = config.fehler_embed.embed_author_icon;
            let eembed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
            let eembed_footer_text = config.fehler_embed.embed_footer_text;
            let eembed_footer_icon = config.fehler_embed.embed_footer_icon;
            let eembed_color = config.fehler_embed.embed_color;
    
            const ErrEmbed = new EmbedBuilder()
            .setAuthor({ name: eembed_author_text, iconURL: eembed_author_icon })
            .setDescription(eembed_description)
            .setTimestamp()
            .setFooter({ text: eembed_footer_text, iconURL: eembed_footer_icon })
            .setColor(eembed_color)
            interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
          }
    }
}
