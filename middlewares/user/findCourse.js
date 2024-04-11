const { Course } = require("../../db/schema")

async function findCourse(req, res, next){
    const courseId = req.params.courseId;

    const response = await Course.findOne({_id: courseId});

    if(!response){
        return res.status(409).json({
            msg: "Course does not exists"
        });
    }

    return next();
}

module.exports = findCourse;