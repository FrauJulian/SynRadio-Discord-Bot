const { EmbedBuilder } = require("discord.js")
const moment = require("moment")

const config = require("../../CONFIGS/config.json")

function ERR(err = null, interaction = null) {
    console.error(" ")
    console.error(`  ______ _____  _____   ____  _____  \r\n |  ____|  __ \\|  __ \\ \/ __ \\|  __ \\ \r\n | |__  | |__) | |__) | |  | | |__) |\r\n |  __| |  _  \/|  _  \/| |  | |  _  \/ \r\n | |____| | \\ \\| | \\ \\| |__| | | \\ \\ \r\n |______|_|  \\_\\_|  \\_\\\\____\/|_|  \\_\\`)
    console.error(" ")

    if (err != null) {
        console.log(`Error occurred on ${moment().format("DD-MM-YYYY HH:mm:ss:ms")}!`);
        console.log(" ")
        console.error(err)
    } else {
        console.log(`Error occurred on ${moment().format("DD-MM-YYYY HH:mm:ss:ms")}!`);
        console.log(" ")
        console.error("An unhandled error has occurred!")
    }

    if (interaction != null) {
        let embed_author_text = config.general.error_embed.embed_author_text;
        let embed_author_icon = config.general.error_embed.embed_author_icon;
        let embed_description = config.general.error_embed.embed_description.replace("%error%", "" + err + "");
        let embed_footer_text = config.general.error_embed.embed_footer_text;
        let embed_footer_icon = config.general.error_embed.embed_footer_icon;
        let embed_color = config.general.error_embed.embed_color;

        const ErrEmbed = new EmbedBuilder()
            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
            .setDescription(embed_description)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
        interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
    }
}

module.exports = ERR;