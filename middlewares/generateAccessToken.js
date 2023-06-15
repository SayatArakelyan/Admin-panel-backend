const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

function generateAccessToken(id,image, Email,password,FirstName, LastName, BirthDate,country, phoneNumber, role,isVerify) {
    return jwt.sign({
        id,
        image,
        Email,
        password,
        FirstName,
        LastName,
        BirthDate,
        country,
        phoneNumber,
        role,
        isVerify
    }, SECRET, {expiresIn: "36000s"});
}

module.exports = {generateAccessToken}