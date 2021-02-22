const {Schema,model} = require("mongoose")

const bcrypt = require("bcrypt")

const schema = new Schema({
    googleId:String,
    first:{
        givenName:String,
        familyName:String
    },
    displayName:String,
    email:{type:String,unique:true},
    password:String,
    photos:Array
},{timestamps:true})



schema.methods.toJSON = function () {

    const user = this

    const userObject = user.toObject()
  
    delete userObject.password

    delete userObject.__v
  
    return userObject
  }
  
  schema.statics.findByCredentials = async function (email, plainPW) {
      
    const user = await this.findOne({ email })
    if (user) {
      const isMatch = await bcrypt.compare(plainPW, user.password)
      if (isMatch) return user
      else return null
    } else {
      return null
    }
  }
  
  schema.pre("save", async function (next) {

    const user = this

    const plainPW = user.password
  
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(plainPW, 10)
    }
    next()
  })
  



module.exports = model("Users",schema)