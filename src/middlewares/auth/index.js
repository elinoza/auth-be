
const { verifyAccessToken,verifyRefreshToken,TokenPairs } = require("../../utils/jwt")

const Users = require("../../services/users/users.schema")

const checkBearerToken = async (req, res, next) => {
    if (req.headers.authorization) {

        const [method, jwt] = req.headers.authorization.split(" ")
    

        if (method === "Bearer" && jwt) {
            try {

                const { _id } = await verifyAccessToken(jwt);

                const user = await Users.findById(_id)

                if(user){
                    req.user = user;
                    next()
                }
                else{
                    res.status(401).send("id is bad")
                }
                

            } catch (error) {
                
                res.status(401).send("Token is bad")
            }
        }
        else {
            res.status(401).send("Auth method is bad")
        }

    }
    else {
        res.status(401).send("Header is bad")
    }
}

const checkRefreshToken = async (req, res, next) => {

    const {refreshToken} = req.body;
    console.log({refreshToken})
    try {

        const {_id} = await verifyRefreshToken(refreshToken);
       
        const tokenPairs = await TokenPairs({_id})

        res.send(tokenPairs)

    } catch (error) {
        console.log(error)
        res.status(401).send("Refresh token is not valid")
    }
}

module.exports = {checkBearerToken,checkRefreshToken}