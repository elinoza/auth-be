const express = require("express")

const mongoose = require("mongoose")

const services = require("./services")

const app = express()

const cors = require("cors")

app.use(cors())

app.use(express.json())

app.use("/api",services)

// deployed to atlas
const {MONGO_CONNECTION_STRING,PORT} = process.env

app.listen(PORT,()=>{
    mongoose.connect(MONGO_CONNECTION_STRING,{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true},(err)=>{
        if(err){
            console.log("Mongo connection is failed")
        }
        else{
            console.log("Database connection is ready.")
        }
    })
})

app.on("error",(error)=>console.log("App is  not running "))