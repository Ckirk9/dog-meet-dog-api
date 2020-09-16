const router = require('express').Router()
const passport = require('../passport')
const ctrl = require('../controllers')

// PATH = /api/v1/auth
router.post('/login', passport.authenticate('local'), ctrl.auth.login)
router.post('/signUp', ctrl.auth.signUp)
router.delete('/signOut', ctrl.auth.signOut)

module.exports = router