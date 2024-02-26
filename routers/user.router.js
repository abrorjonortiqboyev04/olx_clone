const { Router } = require('express')
const { getUserProfilePage, getUpdatePage, updateProfile,
        addProductPage, productAdd, productAllPage, 
        getProductUpdatePage, updateProduct, deleteProduct,
        filter, userPageCategory, oneProductById 
      } = require('../controllers/user.controller')

const upload = require('../utils/uploadFile')

const router = Router()


router.get('/profile', getUserProfilePage)
router.get('/update/:id', getUpdatePage)
router.get('/product/update/:id', getProductUpdatePage)
router.get('/product/delete/:id', deleteProduct)
router.get('/category', userPageCategory)
router.get('/product', addProductPage)
router.get('/allproduct', productAllPage)
router.get('/product/open/:id', oneProductById)

router.post('/addproduct', upload.single('image'), productAdd)
router.post('/update/:id', updateProfile)
router.post('/filter', filter)
router.post('/product/update/:id', updateProduct)


module.exports = router