const express = require('express')
const cors = require('cors')
const config = require('config')
const path = require('path')
const emailRouter = require('./routes/email.routes')

const PORT = process.env.PORT || config.get('serverPort')
const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api', emailRouter)

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build/', 'index.html'))
})

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log('Server listening on port: ', PORT)
		})
	} catch (err) {
		console.log(err)
	}
}

start()
