const zod = require("zod");

const courseInputAuthenticationSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    owner: zod.string(),
    imageLink: zod.string(),
    price: zod.number()
})

function courseInputAuthentication(req, res, next){
    const jsonData = req.body;

    if(!courseInputAuthenticationSchema.safeParse(jsonData).success){
        return res.status(400).json({
            msg: "Bad Request. Input Validation Failed."
        })
    }

    return next();
}

module.exports = courseInputAuthentication;