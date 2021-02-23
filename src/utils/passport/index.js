const passport = require('passport')

const {jwtStrategy,refreshStrategy} = require("./jwt")



passport.use(jwtStrategy)

passport.use("refresh",refreshStrategy)

passport.serializeUser(function(user,next){
    next(null,user)
})


module.exports =passport