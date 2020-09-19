const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/:username', ctrl.pet.show)

module.exports = router