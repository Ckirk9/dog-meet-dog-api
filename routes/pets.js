const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/:id', ctrl.pets.index)
router.post('/', ctrl.pets.create)
router.put('/:id', ctrl.pets.update)
router.delete('/:id', ctrl.pets.destroy)

module.exports = router