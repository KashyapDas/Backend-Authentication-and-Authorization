const userModel = require("../Model/user");

async function isUserIdExist(userId)
{   
    const result = await userModel.findById({
        _id : userId
    });
    return result;
}

module.exports = isUserIdExist;