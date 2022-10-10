const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
const {pool}=require("./DBconfig");
const session=require("express-session");
const flash=require("express-flash");
const passport=require("passport");
const initializePassport=require("./passportConfig");
initializePassport(passport);


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
app.get('/login', (req, res)=>
{
    res.render(`${__dirname}/views/login.ejs`);
});
app.get('/signup', (req, res)=>
{
    res.render(`${__dirname}/views/signup.ejs`);
});

app.post('/signup', async (req, res)=>
{
    let {name, email, password, password2}=req.body;
    console.log(
        name, 
        email,
        password,
        password2
    );
    let errors=[];
    if (!name || !email || !password || !password2)
    {
        errors.push({message: "Please Enter all credentail"});
    }
    if(password.length<6)
    {
        errors.push({message: "Password should be atleast of 6 character"});
    }
    if(password!=password2)
    {
        errors.push({message: "passwords do not match"});
    }
    if(errors.length>0)
    {
        res.render("signup", {errors});
    }
    else
    {
        let hashPassword= await bcrypt.hash(password, 10);
        console.log(hashPassword);
        pool.query(
            `Select * from users
            where email=$1`, [email], (err, results)=>{
                if(err){
                    throw err;
                }
                console.log("reaches here");
                console.log(results.rows);
                if(results.rows.length>0){
                    errors.push({message:"Email already registered"});
                    res.render("signup", {errors});
                }
                else
                {
                    pool.query(
                        `insert into users(name, email, password)
                        values ($1, $2, $3)
                        returning id, password`, [name, email, hashPassword], (err, results)=>{
                            if(err)
                            {
                                throw(err)
                            }
                            console.log(results.row);
                            req.flash('success_msg', "You are now registered. Please Log In");
                            res.redirect('login');
                        }
                    )
                }
            }
  
        )
    }
});

app.post("/login", (passport.authenticate('local', {
    successRedirect:"/", 
    failureRedirect:"/login",
    failureFlash:true
})));

app.listen('3000', (req, res)=>
{
    console.log("Port is running on 3000");
});