const User = require('../models/user.model')
const Product = require('../models/product.model')

// @ Description       User Profile
// @ Route             GET   /user/profile
// @ Access            Private
exports.getUserProfilePage = async (req,res)=>{
 try {

    const products = await Product.find({user: req.session.user._id}).lean()

    res.render('user/userProfile',{
        title: 'User',
        isAuth: req.session.isAuth,
        user: req.session.user,
        product: products.reverse(),
        productSize: products.length
    })
 } catch (error) { 
    console.log(error) 
 }
} 

// @ Description       Update User Profile Page
// @ Route             GET   /user/update/:id
// @ Access            Private
exports.getUpdatePage = async (req,res)=>{
 try {
    const user = await User.findById(req.params.id)

    const { _id, name, email, telNumber } = user 

    res.render('user/update',{
        title: "Update",
        isAuth: req.session.isAuth,
        oldText: { _id, name, email, telNumber }
    })
 } catch (error) {
    console.log(error)
 }
}


// @ Description       Update User Profile
// @ Route             POST  /user/update/:id
// @ Access            Private
exports.updateProfile = async (req,res)=>{
 try {
    const user = await User.findById(req.params.id)

    const editUser = {
        name:   req.body.name   || user.name,
        email:  req.body.email  || user.email,
        telNumber: req.body.telNumber || user.telNumber
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, editUser, {new: true})
    req.session.user = updateUser
    req.session.save((err)=>{
        if(err) throw err
        res.redirect('/user/profile')
    })
 } catch (error) {
    console.log(error)
 }
}


// @ Description       Add Product Page
// @ Route             POST  /user/product
// @ Access            Private
exports.addProductPage = async (req,res)=>{
 try {
    res.render('product/add',{
        title: 'Add Product',
        isAuth: req.session.isAuth
    })
 } catch (error) {
    console.log(error)
 }
}


// @ Description       Add Product
// @ Route             POST  /user/addproduct
// @ Access            Private
exports.productAdd = async (req,res)=>{
 try {
    const { name, price, description, category } = req.body
    

    const product = await Product.create({
         name, price, description,
         image: '/uplods/' + req.file.filename,
         user: req.session.user._id,
         category
    })

    const user = await User.findById(req.session.user._id)

    const userId = user.product

    userId.push(product._id)

    await  User.findByIdAndUpdate(req.session.user._id, {product: userId})

    res.redirect('/user/profile')

 } catch (error) {
    console.log(error)
 }
}


// @ Description       All Product
// @ Route             GET  /user/allproduct
// @ Access            Private
exports.productAllPage = async (req,res)=>{
 try {
    const product = await Product.find().lean() 
    
    res.render('product/all',{
        title: "Barcha E'lonlar",
        isAuth: req.session.isAuth,
        product: product.reverse()
    })
 } catch (error) {
    console.log(error)
 }
}


// @ Description       Update Product  Page
// @ Route             GET  /user/product/update/:id
// @ Access            Private
exports.getProductUpdatePage = async (req,res)=>{
 try {
    const product = await Product.findById(req.params.id).lean()

    res.render('product/update',{
        title: "Edit Product",
        isAuth: req.session.isAuth,
        product
    })
 } catch (error) {
    console.log(error)
 }
}

// @ Description       Update Product
// @ Route             Post  /user/product/update/:id
// @ Access            Private

exports.updateProduct = async (req,res)=>{
 try {

    const product = await Product.findById(req.params.id)

    const name = req.body.name || product.name
    const price = req.body.price || product.price
    const description = req.body.description || product.description

    await Product.findByIdAndUpdate(req.params.id, {name,price,description})

    res.redirect('/user/profile')
 } catch (error) {
    console.log(error)
 }
}


// @ Description       Delete Product
// @ Route             GET  /user/product/dalete/:id
// @ Access            Private
exports.deleteProduct = async (req,res)=>{
 try {
    await Product.findByIdAndDelete(req.params.id)

    res.redirect('/user/profile')
 } catch (error) {
    console.log(error)
 }
}

// @ Description       Filter Product
// @ Route             GET  /user/filter
// @ Access            Private
exports.filter = async (req,res)=>{
 try {
   const { name, price } = req.body
   
   const product = await Product.find({

      user: req.session.user._id, 
      name: { $regex: `${name}`, $options: 'i' }

   }).lean()

   res.render('product/all',{
       title: "Barcha E'lonlar",
       isAuth: req.session.isAuth,
       product: product.reverse()
   })

 } catch (error) {
   console.log(error)
 }
}

// @ Description       Open By Find Category
// @ Route             GET   /user/category?category=(CaregoryName)
// @ Access            Public
exports.userPageCategory = async (req,res)=>{
   try {
     console.log(req.query)
      const product = await Product.find({category: req.query.category}).lean()
      await req.session.destroy((err)=>{
          if(err) throw err
          res.render('home/homePage',{
              title: "Olx",
              product
          })  
      })
   } 
   catch (error) {  console.log(error)  }
  }


// @ Description       One Product By Id
// @ Route             GET   /one/:id
// @ Access            Public
exports.oneProductById = async (req,res)=>{
   try {
     const product = await Product.findById(req.params.id).lean()
  
     const user = await User.findById(product.user).lean()
     
     res.render('home/oneProduct',{
      title: `${product.name}`,
      isAuth: req.session.isAuth,
      product,
      user
     })
   } catch (error) {
     console.log(error)
   }
  } 