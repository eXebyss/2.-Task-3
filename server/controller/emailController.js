const fs = require('fs')
const path = require('path')
const Json2csvParser = require('json2csv').Parser
const db = require('../db/db')

class EmailController {
	getEmails = (req, res) => {
		const limitQuery = Math.round(req.query._limit)
		const pageQuery = limitQuery * Math.round(req.query._page) - limitQuery

		if (!req.query._limit && !req.query._page) {
			const sqlSelect = 'SELECT * FROM Emails'

			db.query(sqlSelect, (err, result) => {
				if (err) {
					console.error(err)
				}
				console.log(result)
				res.set({
					'X-Total-Count': result.length,
					'Access-Control-Expose-Headers': 'X-Total-Count',
				})
				res.status(200).send(result)
			})
		} else {
			const sqlSelectLimited =
				'SELECT * FROM Emails ORDER BY id ASC LIMIT ? OFFSET ?'

			db.query(sqlSelectLimited, [limitQuery, pageQuery], (err, result) => {
				console.log(result)
				if (err) {
					console.error(err)
				}
				res.status(200).send(result)
			})
		}
	}

	createNewEmail = (req, res) => {
		const email = req.body.email
		const date = req.body.date

		const re1 =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const re2 = /\.co$/
		if (!email) {
			res.status(400).json({ message: `Email address is required` })
		} else if (!re1.test(String(email).toLowerCase())) {
			res.status(400).json({ message: `Please provide a valid e-mail address` })
		} else if (re2.test(String(email).toLowerCase())) {
			res.status(400).json({
				message: `We are not accepting subscriptions from Colombia emails`,
			})
		} else {
			const sqlInsert = 'INSERT INTO Emails (email, date) VALUES (?, ?)'
			db.query(sqlInsert, [email, date], (err, result) => {
				console.log(err, result)
			})
			res.status(201).json({ message: `${email} has been inserted` })
		}
		console.log(email)
	}

	deleteAnEmail = (req, res) => {
		const id = req.params.id
		const sqlDelete = 'DELETE FROM Emails WHERE id = ?'

		db.query(sqlDelete, id, (err, result) => {
			if (err) {
				console.error(err)
			}
			console.log(result)
			res.status(200).json({ message: `${id} has been deleted` })
		})
	}

	getCSV = (req, res) => {
		const sqlSelect = 'SELECT * FROM Emails'

		db.query(sqlSelect, (err, result) => {
			if (err) throw err
			// console.log('emails:')

			const jsonEmails = JSON.parse(JSON.stringify(result))
			// console.log(jsonEmails)

			const csvFields = ['id', 'email', 'date']
			const json2csvParser = new Json2csvParser({ csvFields })
			const csv = json2csvParser.parse(jsonEmails)

			// console.log(csv);

			fs.writeFile('emails.csv', csv, function (err) {
				if (err) throw err
				console.log('File saved.')
			})

			const options = {
				root: path.join('./'),
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true,
				},
			}

			const fileName = 'emails.csv'
			res.status(200).sendFile(fileName, options, function (err) {
				if (err) {
					console.log(err)
				} else {
					console.log('Sent:', fileName)
				}
			})
		})
	}
}

module.exports = new EmailController()
