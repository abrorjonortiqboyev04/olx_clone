const { Router } = require('express')
const { homePage, homeSearch, oneProductById, homePageCategory } = require('../controllers/home.controllar')

const router = Router()

router.get('/', homePage)
router.post('/search', homeSearch)
router.get('/one/:id', oneProductById)
router.get('/category', homePageCategory)

module.exports = router