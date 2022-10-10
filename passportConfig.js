const LocalStrategy=require("passport-local").Strategy;
const {pool}=require("./DBConfig");
const bcrypt=require("bcrypt");
const { authenticate } = require("passport");
function initialize(passport){
    const authenticateUser=(email, password, done)=>{
        pool.query(
            `select * from users where email $1`, [email],
            (err, results)=>{
                if(err){
                    throw err;
                }
                console.log(results.row);
                if(results.rows.length>0)
                {
                    const user=results.row[0];
                    bcrypt=bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if(err){
                            throw err;
                        }
                        if(!isMatch)
                        {
                            return done(null, user);
                        }
                        else
                        {
                            return done(null, false, {message: "Password is not correct"});
                        }
                    });
                }
                else{
                    return done(null, false, {message:"Email is not registerd"});
                }
            }
        )
    }
    passport.use(
        new LocalStrategy(
            {
        usernameField:"email",
        passwordField:"password"
    },
    authenticateUser
        )
    );
    passport.serializeUser((user, done)=>done(null, user.id));
    passport.deserializeUser((id, done)=>{
        pool.query(
            `select * from users where id=$1`, [id], (err, results)=>{
                if(err){
                    return done(err);
                }
                console.log(`ID is ${reustls.row[0].id}`)
                return done(null, results[0]);
            }
        );
    }
    );
};
module.exports=initialize