const tokenModel = require("../Model/token");

async function NoOfRefreshToken(id) {
    const userTokens = await tokenModel.find({
        userId: id
    });

    return userTokens.length;
}

module.exports = NoOfRefreshToken;