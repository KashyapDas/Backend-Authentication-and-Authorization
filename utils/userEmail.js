const userModel = require("../Model/user");

async function isExistEmail(email)
{
    const result = await userModel.findOne({
        email,
    });
    return result;
}


module.exports = isExistEmail;