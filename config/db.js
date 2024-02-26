const mongoose = require('mongoose')

const mongodbConnect = async ()=>{
    const connect = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connect on port: ${connect.connection.host}`.italic.blue)
}


module.exports = mongodbConnect