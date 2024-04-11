const zod = require("zod");

const adminInputAuthenticationSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

function adminInputAuthentication(req, res, next){
    const jsonData = {
        email: req.body.email,
        password: req.body.password
    };
    if(!adminInputAuthenticationSchema.safeParse(jsonData).success){
        return res.status(400).json({
            msg: "Bad Request. Input Validation Failed."
        })
    }

    return next();
}

module.exports = adminInputAuthentication;