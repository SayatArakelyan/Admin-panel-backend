const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

function generateAccessToken(image, Email,password,FirstName, LastName, BirthDate,country, phoneNumber, role) {
    return jwt.sign({
        image,
        Email,
        password,
        FirstName,
        LastName,
        BirthDate,
        country,
        phoneNumber,
        role
    }, SECRET, {expiresIn: "36000s"});
}

module.exports = {generateAccessToken}