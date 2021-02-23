const jwt = require("jsonwebtoken")

const {JWT_ACCESS_SECRET,JWT_REFRESH_SECRET,JWT_ISSUER,JWT_AUDIENCE} = process.env

const AccessToken = async (payload) => {
    try {
        const token = await jwt.sign(payload,JWT_ACCESS_SECRET,{expiresIn:"10000",issuer:JWT_ISSUER,audience:JWT_AUDIENCE})
        return token
    } catch (error) {
        console.log(error)
    }
}

const RefreshToken = async(payload) => {
    try {
        const token = await jwt.sign(payload,JWT_REFRESH_SECRET,{expiresIn:"1h",issuer:JWT_ISSUER,audience:JWT_AUDIENCE})
        return token
    } catch (error) {
        console.log(error)
    }
}

const verifyAccessToken = async (token) => {
    try {
        const payload = await jwt.verify(token,JWT_ACCESS_SECRET)
        return payload
    } catch (error) {
        
    }
}

const verifyRefreshToken = async (token) => {
    try {
        const payload = await jwt.verify(token,JWT_REFRESH_SECRET)
        return payload
    } catch (error) {
        console.log(error.message)
    }
}


const TokenPairs = async (payload) => {
    const accessToken = await  AccessToken(payload)
    const refreshToken = await RefreshToken(payload)
    return {accessToken, refreshToken}
}

module.exports = {TokenPairs, verifyRefreshToken,verifyAccessToken}