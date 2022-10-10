const express=require("express");
const app=express();
require("./db/connect");
const port =process.env.PORT ||3000;
app.get("/",(req, res) =>{
    res.send("hello")
});
app.listen(port,()=>{
    console.log('server running at port' , port);
});