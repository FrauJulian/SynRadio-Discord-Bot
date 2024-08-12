const { Events, InteractionType } = require("discord.js");

const ERR = require("../Manager/UtilsManager");

module.exports = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    let client = interaction.client;
    if (interaction.type == InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;

      try {
        const command = client.slashcommands.get(interaction.commandName)
        command.run(client, interaction)
      } catch (err) {
        ERR(err, interaction)
      }
    }
  }
}