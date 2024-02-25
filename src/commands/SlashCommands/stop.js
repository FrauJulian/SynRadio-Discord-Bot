const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json")
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("stop")
	.setDescription("🎺 | Stoppe den Radio für die schlechteste Laune!"),
    run: async (client, interaction) => {
        const connection = getVoiceConnection(interaction.guild.id);
        const voiceChannel = interaction.member.voice.channel;
        
        let embed_author_text = config.radio_embed_theme.embed_author_text;
        let embed_author_icon = config.radio_embed_theme.embed_author_icon;
        let embed_footer_text = config.radio_embed_theme.embed_footer_text;
        let embed_footer_icon = config.radio_embed_theme.embed_footer_icon;
        let embed_color = config.radio_embed_theme.embed_color;

        if (!voiceChannel) {
            const voiceChannelEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text + "SPRACHKANAL", iconURL: embed_author_icon })
            .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Du musst in einem Sprachkanal sein um das Musik System zu nutzen!**")
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            return interaction.reply({ embeds: [voiceChannelEmbed], ephemeral: true });
        }

        if (interaction.guild.members.me.voice.channelId !== null) {
            if (interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
                const alreadyActiveEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text + "BEREITS AKTIV", iconURL: embed_author_icon })
                .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Der Bot ist auf diesen Server bereits aktiv! Du findest den Radio in <#${"+interaction.guild.members.me.voice.channelId+"}>!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                return interaction.reply({ embeds: [alreadyActiveEmbed], ephemeral: true });
            }
        }

        try {
            connection.destroy();

            const stoppedRadio = new EmbedBuilder()
            .setAuthor({ name: embed_author_text + "GESTOPPT", iconURL: embed_author_icon })
            .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Der Radio wurde leider gestoppt.")
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            return interaction.reply({ embeds: [stoppedRadio], ephemeral: true });

        } catch (err) {
            const NotActive = new EmbedBuilder()
            .setAuthor({ name: embed_author_text + "NICHT AKTIV", iconURL: embed_author_icon })
            .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Das Radio ist aktuell auf diesen Server nicht aktiv!")
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            return interaction.reply({ embeds: [NotActive], ephemeral: true });
        }
    }
}
