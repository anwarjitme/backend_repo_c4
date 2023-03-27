const express=require("express")
const {connection}=require("./config/db")
const { postRouter}=require("./routes/postRoute")
const { userRoute}=require("./routes/userRoute")
require("dotenv").config();
const app=express()
app.use(express.json());
app.use("/users",userRoute)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
try{
await connection
console.log("connected with db")
}catch(err){
console.log({"error":"something wrong"})
}
})