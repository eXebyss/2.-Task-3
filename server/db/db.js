const mysql = require('mysql')
const config = require('config')

const db = mysql.createPool({
	host: process.env.host || config.get('host'),
	user: process.env.user || config.get('user'),
	password: process.env.password || config.get('password'),
	database: process.env.database || config.get('database'),
})

module.exports = db