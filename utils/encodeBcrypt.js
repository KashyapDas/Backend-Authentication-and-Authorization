const bcrypt = require("bcrypt");

async function encodedValue(value){
    const result = await bcrypt.hash(value, 10);
    return result; 
}


module.exports = encodedValue;