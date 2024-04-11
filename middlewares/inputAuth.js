const zod = require("zod");

const inputAuthenticationSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

function inputAuthentication(req, res, next){
    const jsonData = {
        email: req.body.email,
        password: req.body.password
    };
    if(!inputAuthenticationSchema.safeParse(jsonData).success){
        return res.status(400).json({
            msg: "Bad Request. Input Validation Failed."
        })
    }

    return next();
}

module.exports = inputAuthentication;