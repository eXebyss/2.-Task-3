const Router = require('express')
const emailController = require('../controller/emailController')

const router = new Router()

router.get('/get', emailController.getEmails)

router.post('/post', emailController.createNewEmail)

router.delete('/delete/:id', emailController.deleteAnEmail )

router.get('/export-csv', emailController.getCSV)

module.exports = router
