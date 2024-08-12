const { EmbedBuilder, ChannelType } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const AudioStream = require("discord-audio-stream");

const config = require("../../CONFIGS/config.json");
const { ERR, RunSQLInDatabase } = require("../Manager/UtilsManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop-radio")
        .setDescription("🎺 | Stoppe den Radio!")
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
                        .setDescription(`[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter ` + "`Contact@SynRadio.de`" + `!\n## Du kannst das Radio nicht stoppen, daher du dich nicht im selben Kanal befindest!\n\n*Du findest den Radio in <#` + interaction.guild.members.me.voice.channelId + `>!*`)
                        .setTimestamp()
                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                        .setColor(embed_color)
                    return interaction.reply({ embeds: [RadioAlreadyActiveEmbed], ephemeral: true });
                }
            } else {
                let RadioNotActiveEmbed = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text + "NICHT AKTIV", iconURL: embed_author_icon })
                    .setDescription(`[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter ` + "`Contact@SynRadio.de`" + `!\n## Das Radio kann nicht gestoppt werden, wenn dieser nicht aktiv ist!`)
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                return interaction.reply({ embeds: [RadioNotActiveEmbed], ephemeral: true });
            }

            AudioStream.stop({
                GuildID: interaction.guild.id
            })

            let DeleteDataSQL = "DELETE FROM `Connections` WHERE GuildID = '" + interaction.guild.id + "';";
            RunSQLCode(DeleteDataSQL, interaction);

            let StoppedRadio = new EmbedBuilder()
                .setAuthor({ name: embed_author_text + "HILFE", iconURL: embed_author_icon })
                .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Contact@SynRadio.de`!\n## Das Radio wurde leider gestoppt!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
            return interaction.reply({ embeds: [StoppedRadio], ephemeral: true });
        } catch (err) {
            ERR(err, interaction)
        }
    }
}
