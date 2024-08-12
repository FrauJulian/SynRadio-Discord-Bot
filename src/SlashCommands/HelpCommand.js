const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const config = require("../../CONFIGS/config.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("hilfe")
	.setDescription("🎺 | Brauchst du Hilfe?"),
    run: async (client, interaction) => {
        let embed_author_text = config.general.general_embed.embed_author_text;
        let embed_author_icon = config.general.general_embed.embed_author_icon;
        let embed_footer_text = config.general.general_embed.embed_footer_text;
        let embed_footer_icon = config.general.general_embed.embed_footer_icon;
        let embed_color = config.general.general_embed.embed_color;

        let HelpEmbed = new EmbedBuilder()
        .setAuthor({ name: embed_author_text + "HILFE", iconURL: embed_author_icon })
        .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Contact@SynRadio.de`!\n## Du brauchst Hilfe?")
        .addFields(
            { name: "/start-radio [evtl. Kanal]", value: "So kannst du den Radio starten!", inline: true  },
            { name: "/stop-radio [evtl. Kanal]", value: "So kannst du den Radio stoppen!", inline: true  },
            { name: "/radio-stats", value: "So kannst du immer die aktuellen Statistiken sehen!", inline: true  },
        )
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)
        return interaction.reply({ embeds: [HelpEmbed], ephemeral: true });
    }
}
