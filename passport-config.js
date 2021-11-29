import LocalStrategy from"passport-local";
import bcrypt from "bcrypt";

function initialize(passport, getUserByEmail,getUserByid){
    const authenticateUser= async ( email,password,done)=>{
        const user = getUserByEmail(email)
        if (user==null){
            return done(null,false,{message:"No user woth that email"})
        }
        try{
            if (await bcrypt.compare(password,user.password)){
                return done (null,user)
            }else{
                return done (null,false,{message:"Password Incorrent "})
            }
        }
        catch(E){
            return(E)
        }
    }
}

function initialize(passport){
    passport.use(new LocalStrategy({ usernameField:"email"}),
    authenticationUser)
    passport.serializeUser((user,done)=> done (null,user.id))

    passport.deserializeUser((user,done)=>{
        return done (null,getUserByid(id))
})
    

} 
module.exports=initialize