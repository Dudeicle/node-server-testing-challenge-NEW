const knex = require("knex");

const config = require("../knexfile.js");

const envirnonment = process.env.DN_ENV || "development";

module.exports = knex(config[envirnonment]);
