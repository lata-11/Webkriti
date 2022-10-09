const express=require("express");
const app=express();

app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/views/index.html`);
});
app.get('/aboutus', (req, res)=>
{
    res.sendFile(`${__dirname}/views/aboutus.html`);
});
app.get('/contactus', (req, res)=>
{
    res.sendFile(`${__dirname}/views/contactus.html`);
});

app.listen('3000', (req, res)=>
{
    console.log("Port is running on 3000");
})