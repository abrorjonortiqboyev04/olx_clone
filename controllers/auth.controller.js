const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { errorMessage } = require('../utils/errorMessage')


// @ Description         Registration User Page
// @ Route               GET  /auth/registr
// @ Access              Public
exports.getRegistrationPage = (req,res)=>{
 try {
    res.render('registrPage', {
        title: "Registration"
    })
 } 
 catch (error) {  console.log(error)   }
}


// @ Description         Registration User 
// @ Route               POST  /auth/registruser
// @ Access              Private
exports.registrUser = async (req,res)=>{
 try {
    const { name, email, telNumber, password, password2 } = req.body

    const validation = validationResult(req)

    // Empty Validation
    if(!validation.isEmpty()){
       return errorMessage(res, 'registrPage', "Registration", validation.array()[0].msg, { name, email, telNumber })
    }

    const  user = await User.findOne({email})

    if(user){
       return errorMessage(res, 'registrPage', "Registration", "Foydalanilgan elektron pochta!!", { name, email, telNumber })
    }

    if(!(password===password2)){
        return errorMessage(res, 'registrPage', "Registration", "Parol kiritishda hatolik!", { name, email, telNumber })
    }

    // Hash Password Generate
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    const u = await User.create({
        name, email, telNumber, 
        password: hashpassword
    })

    res.redirect('/auth/login')

 } catch (error) {
    console.log(error)
 }
}


// @ Description         Login User Page
// @ Route               GET  /auth/login
// @ Access              Public
exports.getLoginPage = (req,res)=>{
    try {
       res.render('loginPage', {
           title: "Login"
       })
    } 
    catch (error) {  console.log(error)   }
}



// @ Description         Login User
// @ Route               POST  /auth/loginuser
// @ Access              Private
exports.loginUser = async (req,res)=>{
 try {
    const { email, password } = req.body

    const validate = validationResult(req)

    if(!validate.isEmpty()){
        return errorMessage(res, 'loginPage', "Login", validate.array()[0].msg, email)
    }

    const user = await User.findOne({email})

    if(!user){
        return errorMessage(res, 'loginPage', "Login", "Email yoki parol kiritishda hatolik!", email)
    }

    const hashpassword = await bcrypt.compare(password, user.password)

    if(!hashpassword){
        return errorMessage(res, 'loginPage', "Login", "Email yoki parol kiritishda hatolik!", email)
    }

    req.session.isAuth = true
    req.session.user = user 
    req.session.save((err)=>{
        if(err) throw err
        res.redirect('/user/allproduct')
    })

 } 
 catch (error) {
    console.log(error)
 }
}
 

// @ Description         Logout
// @ Route               GET  /auth/logout
// @ Access              Private
exports.logout = async (req,res)=>{
 try {
    await req.session.destroy((err)=>{
        if(err) throw err
        res.redirect('/auth/login')
    })
 } catch (error) {
    console.log(error)
 }
}