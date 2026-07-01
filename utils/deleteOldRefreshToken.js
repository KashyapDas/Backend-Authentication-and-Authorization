const tokenModel = require("../Model/token");
const bcrypt = require("bcrypt");

async function deleteOldRefreshToken(token, id) {
    const userTokens = await tokenModel.find({
        userId: id
    });

    for (const obj of userTokens) {
        const perResult = await bcrypt.compare(
            token,
            obj.refreshToken
        );

        if (perResult) {
            await tokenModel.deleteOne({
                _id: obj._id
            });

            return true;
        }
    }

    return false;
}

module.exports = deleteOldRefreshToken;