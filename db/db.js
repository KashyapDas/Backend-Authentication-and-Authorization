const mongoose = require("mongoose");
const config = require("../config/config");

function setConnection(){
    mongoose.connect(config.MONGODB_URL);
}


module.exports = {
    mongoose,
    setConnection
};