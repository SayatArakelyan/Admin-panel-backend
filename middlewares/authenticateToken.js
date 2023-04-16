const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    
    if (token == null){
        return res.status(401).json({msg: 'Error: not authorized'});
    } 
    
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({msg: 'Error: token is not valid'});
      }    
      next();
    })
}

module.exports = { authenticateToken }