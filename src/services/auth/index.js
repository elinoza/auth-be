const { checkRefreshToken } = require("../../middlewares/auth");

const {TokenPairs} = require("../../utils/jwt")
const router = require("express").Router();

const Users = require("../users/users.schema")

const passport = require("../../utils/passport")

router.post("/refreshToken",passport.authenticate("refresh"),async(req,res,next)=>{
    try {
        const {tokens} = req.user;
        res.cookie("accessToken",tokens.accessToken)
        res.cookie("refreshToken",tokens.refreshToken)
        res.send("OK")
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.post("/login",async(req,res,_next)=>{
    try {
    
        const {email,password} = req.body;

        const user = await Users.findByCredentials(email,password)

        if(user){

            const tokenPairs = await TokenPairs({_id:user._id})

            res.cookie("accessToken",tokenPairs.accessToken)

            res.cookie("refreshToken",tokenPairs.refreshToken)

            res.send(tokenPairs)
        }

        else{

            res.status(401).send("Who are you ?")
        }

    } catch (error) {

        res.status(500).send(error.message)
    }
})

router.get("/logout",async(req,res,_next)=>{
    res.clearCookie("refreshToken")
    res.clearCookie("accessToken")
    res.redirect("http://localhost:3000/auth/login")
})

module.exports = router;