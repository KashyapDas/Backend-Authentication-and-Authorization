const jwt = require("jsonwebtoken");
const config = require("../config/config");
const encodedValue = require("../utils/encodeBcrypt");
const deleteOldRefreshToken = require("../utils/deleteOldRefreshToken");
const insertTokenInDB = require("../utils/insertTokenDB");


const refreshToken = async (req,res)=>{
    // get the refresh token
    const oldRefreshToken = req.cookies.refreshToken;
    if(!oldRefreshToken){
        return res.status(411).json({
            msg : "Something went wrong..."
        });
    }
    // extract the info and check if present or not
    const refreshTokenDecoded = jwt.verify(oldRefreshToken,config.REFRESH_SECRET);
    if(!refreshTokenDecoded){
        return res.status(411).json({
            msg : "Something went wrong..."
        })
    };
    // create the access token 
    const accessToken = jwt.sign({
        userId : refreshTokenDecoded.userId
    },config.JWT_SECRET,{
        expiresIn : "15m"
    });
    // also update the new refresh token
    const newRefreshToken = jwt.sign({
        userId : refreshTokenDecoded.userId
    },config.REFRESH_SECRET,{
        expiresIn : "7d"
    });
    // replace both token in the cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000 
    });

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    // encode the new refresh token
    const hashToken = await encodedValue(newRefreshToken);
    // add the new encoded Refresh Token in the database after creating it
    const insertTokenResult = await insertTokenInDB(hashToken, refreshTokenDecoded.userId);
    if(!insertTokenResult){
        return res.status(411).json({
            msg : "Something went wrong...Plz try again later..."
        });
    }
    // remove the oldRefreshToken from the database for that specfic user and newOne
    await deleteOldRefreshToken(oldRefreshToken, refreshTokenDecoded.userId);
    

    res.json({
        msg : "Refresh token router..."
    });
}

module.exports = refreshToken;