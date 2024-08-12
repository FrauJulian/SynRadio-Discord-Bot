const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const config = require("../../CONFIGS/config.json");
const { FetchData } = require("../Manager/UtilsManager.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("radio-stats")
        .setDescription("🎺 | Sehe die aktuellsten Stats von dem Radio!"),
    run: async (client, interaction) => {
        let embed_author_text = config.general.general_embed.embed_author_text;
        let embed_author_icon = config.general.general_embed.embed_author_icon;
        let embed_footer_text = config.general.general_embed.embed_footer_text;
        let embed_footer_icon = config.general.general_embed.embed_footer_icon;
        let embed_color = config.general.general_embed.embed_color;

        let listenersData = await FetchData(config.general.radio_information.web_listeners)
        let songData = await FetchData(config.general.radio_information.current_song)

        let StatsEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text + "STATS", iconURL: embed_author_icon })
            .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Contact@SynRadio.de`!\n## Die wichtigsten Stats!")
            .addFields(
                { name: "aktive Discord Server", value: `${client.guilds.cache.size}`, inline: false },
                { name: "aktive Discord Nutzer", value: `${client.users.cache.size}`, inline: false },
                { name: "aktive Discord Radio Verbindungen", value: `${client.voice.adapters.size}`, inline: false },
                { name: "aktive Web-Radio Verbindungen", value: `${listenersData}`, inline: false },
                { name: "aktueller Song", value: `${"'" + songData.title + "' von " + songData.artist.name || "Akutell spielt kein Song!"}`, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
        interaction.reply({ embeds: [StatsEmbed], ephemeral: true });
    }
}
