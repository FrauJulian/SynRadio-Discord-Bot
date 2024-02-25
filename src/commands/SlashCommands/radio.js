let { EmbedBuilder } = require("discord.js");
let { SlashCommandBuilder } = require("@discordjs/builders");
let config = require("../../../CONFIGS/config.json")
let { joinVoiceChannel,  createAudioPlayer,  createAudioResource, getVoiceConnection } = require("@discordjs/voice");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("radio")
	.setDescription("🎺 | Starte den Radio für die beste Laune!"),
    run: async (client, interaction) => {
        let AudioPlayer = createAudioPlayer();
        let voiceChannel = interaction.member.voice.channel;

        let embed_author_text = config.radio_embed_theme.embed_author_text;
        let embed_author_icon = config.radio_embed_theme.embed_author_icon;
        let embed_footer_text = config.radio_embed_theme.embed_footer_text;
        let embed_footer_icon = config.radio_embed_theme.embed_footer_icon;
        let embed_color = config.radio_embed_theme.embed_color;

        if (!voiceChannel) {
            let voiceChannelEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text + "SPRACHKANAL", iconURL: embed_author_icon })
            .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Du musst in einem Sprachkanal sein um das Musik System zu nutzen!")
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            return interaction.reply({ embeds: [voiceChannelEmbed], ephemeral: true });
        }

        if (interaction.guild.members.me.voice.channelId !== null) {
            if (interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
                let alreadyActiveEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text + "BEREITS AKTIV", iconURL: embed_author_icon })
                .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Der Bot ist auf diesen Server bereits aktiv! Du findest den Radio in <#${"+interaction.guild.members.me.voice.channelId+"}>!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                return interaction.reply({ embeds: [alreadyActiveEmbed], ephemeral: true });
            }
        }

        let Radio = config.generell.radio_link;
        let Audio = createAudioResource(Radio);
        AudioPlayer.play(Audio);

        let RadioPlay = new EmbedBuilder()
        .setAuthor({ name: embed_author_text + "GESTARTET", iconURL: embed_author_icon })
        .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Die beste Laune ist garantiert!")
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)


        try {

            function Sub() {
                setTimeout(async () => {
                    let igi = myCache.get("igiC");
                    let connection = getVoiceConnection(igi);

                    connection.destroy();

                    ConnectVoice();
                }, 1800000);
            }

            function setMax() {
                let igi = myCache.get("igiC");
                let connection = getVoiceConnection(igi);

                connection.setMaxListeners(75);
            }

            function GetCache() {
                myCache.set("imvciC", interaction.member.voice.channel.id);
                myCache.set("igiC", interaction.guild.id);
                myCache.set("igvC", interaction.guild.voiceAdapterCreator);
            }

            function ConnectVoice() {

                let imvci = myCache.get("imvciC");
                let igi = myCache.get("igiC");
                let igv = myCache.get("igvC");

                joinVoiceChannel({
                    channelId: imvci,
                    guildId: igi,
                    adapterCreator: igv
                }).subscribe(AudioPlayer);

                setMax();
                Sub();
            }
            
            GetCache();
            ConnectVoice();
            interaction.reply({ embeds: [RadioPlay], ephemeral: true });

        } catch (err) {
            console.log(err)

            let embed_author_text = config.fehler_embed.embed_author_text;
            let embed_author_icon = config.fehler_embed.embed_author_icon;
            let embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
            let embed_footer_text = config.fehler_embed.embed_footer_text;
            let embed_footer_icon = config.fehler_embed.embed_footer_icon;
            let embed_color = config.fehler_embed.embed_color;
    
            let ErrEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
            .setDescription(embed_description)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
          }
    }
}
