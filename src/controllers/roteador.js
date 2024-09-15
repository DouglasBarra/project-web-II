const express = require('express')
const router = express.Router()
const Professores = require('./controller_professores.js')

router.use(express.json())
router.use('/professores', Professores)

module.exports = router
