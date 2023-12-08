const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json")
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("stop")
	.setDescription("🎵 | Stoppe mit diesen Befehl Bitte nicht den Bot!"),
    run: async (client, interaction) => {
        const connection = getVoiceConnection(interaction.guild.id);
        const voiceChannel = interaction.member.voice.channel;

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

        try {
            connection.destroy();

            let embed_author_text = config.radio_embed_theme.embed_author_text;
            let embed_author_icon = config.radio_embed_theme.embed_author_icon;
            let embed_footer_text = config.radio_embed_theme.embed_footer_text;
            let embed_footer_icon = config.radio_embed_theme.embed_footer_icon;
            let embed_color = config.radio_embed_theme.embed_color;

            const stoppedRadio = new EmbedBuilder()
            .setAuthor({ name: embed_author_text + "GESTOPT", iconURL: embed_author_icon })
            .setDescription(`## Der Radio wurde leider gestoppt.`)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            return interaction.reply({ embeds: [stoppedRadio], ephemeral: true });

        } catch (err) {
            const NotActive = new EmbedBuilder()
            .setAuthor({ name: embed_author_text + "GESTOPT", iconURL: embed_author_icon })
            .setDescription(`## Der Radio ist auf diesen Server nicht aktiv!`)
            .setTimestamp()
            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
            .setColor(embed_color)
            return interaction.reply({ embeds: [NotActive], ephemeral: true });
        }
    }
}
