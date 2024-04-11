const zod = require("zod");

const usernameAuthenticationSchema = zod.string();

function usernameAuthentication(req, res, next){
    const username = req.body.username;
    if(!usernameAuthenticationSchema.safeParse(username).success){
        return res.status(400).json({
            msg: "Bad Request. Username Validation Failed."
        })
    }

    return next();
}

module.exports = usernameAuthentication;