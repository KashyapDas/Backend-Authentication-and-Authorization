const {mongoose} = require("../db/db");

const tokenSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    refreshToken : String 
})

const tokenModel = mongoose.model("refreshToken",tokenSchema);

module.exports = tokenModel;