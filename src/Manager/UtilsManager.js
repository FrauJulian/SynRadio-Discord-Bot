const ERR = require("../Utils/ErrorFunction.js")
const RunSQLInDatabase = require("../Utils/RunSQLInDatabase.js")
const FetchData = require("../Utils/FetchData.js")
const ValidateLicense = require("../Utils/CommandAnalyzer.js")
const CheckTables = require("../Utils/CheckTables.js")

module.exports = {
    ERR: ERR,
    RunSQLInDatabase: RunSQLInDatabase,
    FetchData: FetchData,
    ValidateLicense: ValidateLicense,
    CheckTables: CheckTables
}