const User = require('../models/user.model')
const Product = require('../models/product.model')

// @ Description       Home Page and All Product
// @ Route             GET   /
// @ Access            Public
exports.homePage = async (req,res)=>{
 try {
    const product = await Product.find().lean()
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


// @ Description       Home Page and All Product
// @ Route             GET   /search
// @ Access            Public
exports.homeSearch = async (req,res)=>{
 try {
   const {name} = req.body
   const product = await Product.find({name: { $regex: `${name}`, $options: 'i' }}).lean()
   res.render('home/homePage',{
     title: "Olx",
     product
   })
 } catch (error) {
    console.log(error)
 }
}


// @ Description       Home Page One Product By Id
// @ Route             GET   /one/:id
// @ Access            Public
exports.oneProductById = async (req,res)=>{
 try {
   const product = await Product.findById(req.params.id).lean()

   const user = await User.findById(product.user).lean()
   
   res.render('home/oneProduct',{
    title: `${product.name}`,
    product,
    user
   })
 } catch (error) {
   console.log(error)
 }
} 

// @ Description       Open By Category
// @ Route             GET   /category?category=(CaregoryName)
// @ Access            Public
exports.homePageCategory = async (req,res)=>{
  try {
    
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