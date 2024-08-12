const RunSQLInDatabase = require("./RunSQLInDatabase");

async function CheckTables() {
    //Connection Table
    let ConnectionTableSQL = "CREATE TABLE IF NOT EXISTS `Connections` (`VoiceChannelID` VARCHAR(255) NULL DEFAULT NULL , `GuildID` VARCHAR(255) NULL DEFAULT NULL) ENGINE = InnoDB;";
    RunSQLInDatabase(ConnectionTableSQL);
}

module.exports = CheckTables;