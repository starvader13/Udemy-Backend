const express = require("express")
const cors = require("cors");
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/*", (req,res)=>{
    return res.status(404).json({
        msg: "Route does not exist"
    });
})

app.use((err, req, res, next)=>{
    console.log(err);

    return res.status(500).json({
        msg: "Something Broke at Server Side"
    })
})

app.listen(port, ()=>{
    console.log(`listening on PORT ${port}`);
})