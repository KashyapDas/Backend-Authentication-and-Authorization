const isExistEmail = require("../utils/userEmail");
const isEXistUsername = require("../utils/userUsername");
const userModel = require("../Model/user");


const signup = async (req,res)=>{
    // email, username, password
    const {email, username, password} = req.body;
    // check if email or username exist or not
    
    const result1 = await isExistEmail(email);
    const result2 = await isEXistUsername(username);

    if(result1 || result2){
        return res.status(401).json({
            msg : "User already exist..."
        });
    }
    const newUser = await userModel.create({
        email, username, password
    });

    res.status(200).json({
        msg : "User created successfully...",
    });
}


module.exports = signup;