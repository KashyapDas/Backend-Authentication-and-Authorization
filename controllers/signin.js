const isEXistUsername = require("../utils/userUsername");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const insertTokenInDB = require("../utils/insertTokenDB");
const encodedValue = require("../utils/encodeBcrypt");
const NoOfRefreshToken = require("../utils/findNoOfToken");

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
        { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
        { userId: result._id },
        config.REFRESH_SECRET,
        { expiresIn: "7d" }
    );
    
    // set the token in the cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // true in production (HTTPS)
        sameSite: "strict",
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    // limit device to create the refresh token for 4 device only - desktop, laptop, mobile,tablet
    const device = await NoOfRefreshToken(result._id);
    if(device >= 4){
        return res.status(411).json({
            msg : "Maximum Device Login Reached..."
        });
    }

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, // true in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // first encode the refresh token using bcrypt package
    const hashToken = await encodedValue(refreshToken);
    // add the new encoded Refresh Token in the database when doing signin
    const insertTokenResult = await insertTokenInDB(hashToken, result._id);
    if(!insertTokenResult){
        return res.status(411).json({
            msg : "Something went wrong...Plz try again later..."
        });
    }

    // send the response to the client
    res.status(200).json({
       msg : "Sign In Successfull..." 
    });
}

module.exports = signin;