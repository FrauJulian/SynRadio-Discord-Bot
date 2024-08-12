const { EmbedBuilder, ChannelType } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const AudioStream = require("discord-audio-stream");

const config = require("../../CONFIGS/config.json");
const { ERR, RunSQLInDatabase } = require("../Manager/UtilsManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("start-radio")
        .setDescription("🎺 | Starte den Radio!")
        .addChannelOption(option =>
            option.setName("kanal")
                .setDescription("🎺 | Gib den Kanal Namen an!")
                .addChannelTypes(ChannelType.GuildVoice)
                .setRequired(false)
        ),
    run: async (client, interaction) => {

        async function RunSQLCode(sql, interaction) {
            return await RunSQLInDatabase(sql, interaction);
        }

        async function SetMaxListeners(interaction) {
            AudioStream.setMaxListeners({
                GuildID: interaction.guild.id,
                MaxListeners: client.guilds.cache.size
            })
        }

        async function HoldAudio(interaction) {
            try {
                AudioStream.stop({
                    GuildID: interaction.guild.id
                })

                let searchConnectionDataSQL = "SELECT * FROM `Connections` WHERE GuildID = " + interaction.guild.id + ";";
                let connectionData = await RunSQLCode(searchConnectionDataSQL, interaction);

                let imvci = connectionData[0].VoiceChannelID;
                let igi = connectionData[0].GuildID;
                let igv = interaction.guild.voiceAdapterCreator;

                StartRadio(imvci, igi, igv, interaction);
            } catch (err) {
                return err;
            }
        }

        async function StartRadio(imvci, igi, igv, interaction) {

            let searchConnectionDataSQL = "SELECT * FROM `Connections` WHERE GuildID = " + igi + ";";
            let connectionData = await RunSQLCode(searchConnectionDataSQL, interaction);

            if (connectionData.length > 0) {
                let DeleteDataSQL = "DELETE FROM `Connections` WHERE GuildID = '" + igi + "';";
                RunSQLCode(DeleteDataSQL, interaction);
            }

            let insertConnectionDataSQL = "INSERT INTO `Connections` (VoiceChannelID, GuildID) VALUES (" + imvci + ", " + igi + ")";
            await RunSQLCode(insertConnectionDataSQL, interaction);

            AudioStream.start({
                VoiceChannelID: imvci,
                GuildID: igi,
                VoiceAdapter: igv,
                Type: "Link",
                Resource: config.general.radio_information.audio_link
            })

            setTimeout(async () => {
                SetMaxListeners(interaction);
            }, 600000);

            setTimeout(async () => {
                HoldAudio(interaction);
            }, 5400000);
        }

        try {
            let embed_author_text = config.general.general_embed.embed_author_text;
            let embed_author_icon = config.general.general_embed.embed_author_icon;
            let embed_footer_text = config.general.general_embed.embed_footer_text;
            let embed_footer_icon = config.general.general_embed.embed_footer_icon;
            let embed_color = config.general.general_embed.embed_color;

            let voiceChannel = interaction.member.voice.channelId;
            let chosenChannel = interaction.options.getChannel("kanal");

            if (voiceChannel == null && chosenChannel == null) {
                let NoVoiceChannelEmbed = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text + "SPRACHKANAL", iconURL: embed_author_icon })
                    .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Contact@SynRadio.de`!\n## Du musst in einen Sprachkanal auswählen oder in einem sein um den Radio zu hören!")
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                return interaction.reply({ embeds: [NoVoiceChannelEmbed], ephemeral: true });
            }

            if (interaction.guild.members.me.voice.channelId) {
                if (voiceChannel !== interaction.guild.members.me.voice.channelId) {
                    let RadioAlreadyActiveEmbed = new EmbedBuilder()
                        .setAuthor({ name: embed_author_text + "BEREITS AKTIV", iconURL: embed_author_icon })
                        .setDescription(`[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter ` + "`Contact@SynRadio.de`" + `!\n## Der Bot ist auf diesen Server bereits aktiv!\n*Du findest den Radio in <#` + interaction.guild.members.me.voice.channelId + `>!*`)
                        .setTimestamp()
                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                        .setColor(embed_color)
                    return interaction.reply({ embeds: [RadioAlreadyActiveEmbed], ephemeral: true });
                }
            }

            if (chosenChannel) {
                StartRadio(
                    chosenChannel.id,
                    interaction.guild.id,
                    interaction.guild.voiceAdapterCreator,
                    interaction
                );
            } else {
                StartRadio(
                    voiceChannel,
                    interaction.guild.id,
                    interaction.guild.voiceAdapterCreator,
                    interaction
                );
            }

            let RadioStarted = new EmbedBuilder()
                .setAuthor({ name: embed_author_text + "NICHT AKTIV", iconURL: embed_author_icon })
                .setDescription(`[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter ` + "`Contact@SynRadio.de`" + `!\n## Das Radio wurde gestartet!`)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
            return interaction.reply({ embeds: [RadioStarted], ephemeral: true });

        } catch (err) {
            ERR(err, interaction);
        }
    }
}