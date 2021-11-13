const mongoose= require('mongoose')

const mongooseURI = 'mongodb://localhost:27017/Eventgo?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connectToMongo = () => {
    mongoose.connect(mongooseURI , ()=>{
        console.log("Connect to mangoose Successfully")
    })
}

module.exports = connectToMongo  ;