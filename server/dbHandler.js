const DB_CONF_PATH = "./values/db_conf.json";

const fs = require('fs')
const data = fs.readFileSync(DB_CONF_PATH)
const conf = JSON.parse(data)
const mysql = require('mysql');
const connection = mysql.createConnection({
		host: conf.host,
		user: conf.user,
		password: conf.password,
		port: conf.port,
		database: conf.database,
		multipleStatements: true
	});

module.exports = {connection}

