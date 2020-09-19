const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/:username', ctrl.pets.index)
router.post('/', ctrl.pets.create)
router.put('/:username', ctrl.pets.update)
router.delete('/:username', ctrl.pets.destroy)

module.exports = router