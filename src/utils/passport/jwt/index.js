require("dotenv").config()
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require("../../../services/users/users.schema")

const {TokenPairs} = require("../../jwt")
const cookieExtractor = function(req) {
    var token = null;

    if (req && req.cookies)
    {
       
        token = req.cookies['accessToken'];
    }
    return token;
};

const extractRefreshToken = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['refreshToken'];
    }
    return token;
};
const jwtStrategy = new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor,extractRefreshToken,ExtractJwt.fromAuthHeaderAsBearerToken]),
    secretOrKey:process.env.JWT_ACCESS_SECRET,
    issuer:process.env.JWT_ISSUER,
    audience:process.env.JWT_AUDIENCE,
    passReqToCallback:true,
}, async function(req,jwt_payload, done) {
    try {
    
        const user  = await Users.findById(jwt_payload._id);
        done(null,user)
    } catch (error) {
        console.log(error)
        done(error,null)
    }
})


const refreshStrategy = new JwtStrategy({
    jwtFromRequest:extractRefreshToken,
    secretOrKey:process.env.JWT_REFRESH_SECRET,
    issuer:process.env.JWT_ISSUER,
    audience:process.env.JWT_AUDIENCE,
    passReqToCallback:true,
}, async function(req,jwt_payload, done) {
    try {
        const tokens = await TokenPairs({_id:jwt_payload._id})
        done(null,{tokens})
    } catch (error) {
        console.log(error)
        done(error,null)
    }
})


module.exports = {jwtStrategy,refreshStrategy}