const { checkRefreshToken } = require("../../middlewares/auth");

const {TokenPairs} = require("../../utils/jwt")
const router = require("express").Router();

const Users = require("../users/users.schema")

router.post("/refreshToken",checkRefreshToken)

router.post("/login",async(req,res,_next)=>{
    try {
    
        const {email,password} = req.body;

        const user = await Users.findByCredentials(email,password)

        if(user){

            const tokenPairs = await TokenPairs({_id:user._id})

            res.send(tokenPairs)
        }

        else{

            res.status(401).send("Who are you ?")
        }

    } catch (error) {

        res.status(500).send(error.message)
    }
})

module.exports = router;