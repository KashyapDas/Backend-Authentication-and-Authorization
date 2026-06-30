const isEXistUsername = require("../utils/userUsername");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const signin = async (req,res)=>{
    // get user data from signin form
    const {username, password} = req.body;
    // check if the user exist 
    const result = await isEXistUsername(username);
    if(!result){
        return res.status(411).json({
            msg : "User not exist..."
        });
    }
    // if then create the access and refresh token
    const accessToken = jwt.sign(
        { userId: result._id},
        config.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId: result._id },
        config.REFRESH_SECRET,
        { expiresIn: "7d" }
    );
    
    // set the token in the cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "strict",
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
       msg : "Sign In Successfull..." 
    });
}

module.exports = signin;