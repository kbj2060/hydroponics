const DB_CONF_PATH = "./values/db_conf.json";

const fs = require('fs')
const data = fs.readFileSync(DB_CONF_PATH)
const conf = JSON.parse(data)
const mysql = require('mysql');
const connection = mysql.createConnection({
		host: process.env.host,
		user: process.env.user,
		password: process.env.password,
		port: process.env.port,
		database: process.env.database,
		multipleStatements: true
	});

module.exports = {connection}

