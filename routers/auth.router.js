const { Router } = require('express')
const { getRegistrationPage, getLoginPage, 
        registrUser, loginUser, logout 
      } = require('../controllers/auth.controller')
const { body } = require('express-validator')

const router = Router()

router.get('/registr',  getRegistrationPage)
router.get('/login', getLoginPage)
router.post('/registruser',[
     body('email', 'Email kiritishda hatoli!!').isEmail(),
     body('name', 'Ism maydoni bosh qoldirildi!!').notEmpty(),
     body('telNumber', 'Tefon raqam kiritishda hatolik!!').notEmpty(),
     body('password', "Parolda kamida 6 ta belgi bo'lishi zarur!!").isLength({min: 6}),
     body('password2', "Parolda kamida 6 ta belgi bo'lishi zarur!!").isLength({min: 6})
    ], registrUser)

router.post('/loginuser',[
     body('email', 'Email kiritishda hatoli!!').isEmail(),
     body('password', "Parolda kamida 6 ta belgi bo'lishi zarur!!").isLength({min: 6}),
    ], loginUser)

router.get('/logout', logout)

module.exports = router