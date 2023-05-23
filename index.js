import  express from "express";
import dbConnect from "./config/dbConfig.js";
import indexRouter from "./routes/indexRouter.js";
const app=express();
const PORT=4000
dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// app.use('/',(req,res)=>{
//     res.send("welcome to auth backend")
// })

app.use("/api/v1",indexRouter);

app.listen(PORT,(req,res)=>{
    console.log("App is listening on PORT=",PORT);
})