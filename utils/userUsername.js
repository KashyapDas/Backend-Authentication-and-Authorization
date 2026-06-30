const userModel = require("../Model/user");

async function isEXistUsername(username){
    const result = await userModel.findOne({
        username,
    });
    return result;
}

module.exports = isEXistUsername;