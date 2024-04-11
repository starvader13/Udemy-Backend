const jwt = require("jsonwebtoken")
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

function signatureAuthorization(req, res, next){
    const signature = req.headers.authorization;
    const token = signature.slice(7, signature.length);

    try{
        const response = jwt.verify(token, secretKey);
        next();
    }
    catch(err){
        return res.status(401).json({
            msg: "User is unauthorized."
        });
    }
}

module.exports = signatureAuthorization;