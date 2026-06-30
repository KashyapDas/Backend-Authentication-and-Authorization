const dotenv = require("dotenv");

dotenv.config();

if(!process.env.PORT){
    throw new Error("Port is not defined in the environment variable");
}

if(!process.env.MONGODB_URL){
    throw new Error("MongoDb URL is not defined in the environmental variable...");
}

if(!process.env.JWT_SECRET){
    throw new Error("Jwt secret is not defined in the environmental variable...");
}

const config = {
    PORT : process.env.PORT,
    MONGODB_URL : process.env.MONGODB_URL,
    JWT_SCERET : process.env.JWT_SCERET
}


module.exports = config;