const ERR = require("./ErrorFunction");
const mysql = require("mysql2");

const config = require("../../CONFIGS/config.json")

async function RunSQLInDatabase(commandString, interaction = null) {
    return new Promise((resolve, reject) => {
        const DatabaseConnection = mysql.createConnection({
            host: config.general.database_data.host,
            port: config.general.database_data.port,
            user: config.general.database_data.username,
            password: config.general.database_data.password,
            database: config.general.database_data.database,
        })
    
        DatabaseConnection.query(commandString, async function (err, results, fields) {
            if (
                err &&
                interaction != null
            ) {
                ERR(err, interaction)
            } else if (
                err &&
                interaction == null
            ) {
                ERR(err)
            }
            
            resolve(results);
        });
    })
}

module.exports = RunSQLInDatabase;