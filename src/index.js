const express = require("express")

const mongoose = require("mongoose")

const services = require("./services")

const app = express()

const cors = require("cors")

const cookieParser = require("cookie-parser")

const passport= require("./utils/passport")

const whitelist = ["http://localhost:3000"]

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json())

app.use(passport.initialize())

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