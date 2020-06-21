const { Pool } = require("pg")

module.exports = new Pool({
    user: "postgres",
    password: "micromaxpal",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})