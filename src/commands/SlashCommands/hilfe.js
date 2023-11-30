const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("hilfe")
	.setDescription("🎵 | Du verstehst den Bot nicht? Schaue hier nach!"),
    run: async (client, interaction) => {
        let embed_author_text = config.radio_embed_theme.embed_author_text;
        let embed_author_icon = config.radio_embed_theme.embed_author_icon;
        let embed_footer_text = config.radio_embed_theme.embed_footer_text;
        let embed_footer_icon = config.radio_embed_theme.embed_footer_icon;
        let embed_color = config.radio_embed_theme.embed_color;

        var HilfeEmbed = new EmbedBuilder()
        .setAuthor({ name: embed_author_text + "SONGS", iconURL: embed_author_icon })
        .setDescription(`**Denk nicht kompliziert! Denk logisch!**\n\n[Melde dich bei Problemen Bitte auf unserer Webseite!](https://synradio.de/support/tickets)\n⠀`)
        .addFields(
            { name: "/Radio", value: "Gute Laune ist mit diesen Befehl garantiert!", inline: true  },
            { name: "/Stop", value: "Stoppe mit diesen Befehl Bitte nicht den SynRadio!", inline: true  },
        )
        .setTimestamp()
        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
        .setColor(embed_color)
        return interaction.reply({ embeds: [HilfeEmbed], ephemeral: true });
    }
}
