const config = require("../config/config");
const jwt = require("jsonwebtoken");
const isUserIdExist = require("../utils/userId");
const userData = require("../utils/fetchUserData");

const home = async (req,res)=>{
    // get the access token
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        return res.status(411).json({
            msg : "Plz signIn..."
        });
    }
    // extra userID and check if the user exist in the database
    try{
        const result = jwt.verify(accessToken,config.JWT_SECRET);
        const isUserExist = await isUserIdExist(result.userId);

        if(!isUserExist){
            return res.status(411).json({
                msg : "Something went wrong...Plz try again later..."
            });
        }
        // if then - return the data of the user 
        const userResult = await userData();
        res.status(200).json({
            msg : "Data fetched successfully...",
            data : userResult
        });
    }catch(error)
    {
        if(error.name = "TokenExpiredError")
        {
            return res.status(411).json({
                msg : "Token Expired/Invalid",
                suggest : "SignIn Again..."
            });
        }
        return res.status(411).json({
                msg : "Something went wrong...Try again later...",
            });
    }
}

module.exports = home;