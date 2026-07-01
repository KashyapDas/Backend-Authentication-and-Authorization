const tokenModel = require("../Model/token");

async function insertTokenInDB(refreshToken, userId){
    const result = await tokenModel.create({
        userId : userId,
        refreshToken : refreshToken
    });
    return result;
}


module.exports = insertTokenInDB;