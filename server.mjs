if (process.env.NODE_ENV !== 'production'){
    require ('dotenv').config()
}


import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import flash from "express-flash";

import initializePassport  from "passport";

initializePassport(passport,email=>{
  passport,  
  email => users.find(user=>user.email===email),
  id => users.find(user=>user.id===id)
})


const app=express();
app.use(flash())

const users=[]
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveinitialized:false
}))

app.user(passport.initialize())
app.user(passport.session())

app.set("view-engine","ejs")
app.use(express.urlencoded({ extended:false}))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/login",passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))

app.get("/register",(req,res)=>{
    res.render("register.ejs")
})

app.post("/register",async(req,res)=>{
    try{
        const hashedPassword=bcrypt.hash(req.body.passwrod,10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            passwrod:hashedPassword

        })
        res.redirect("/login")
    }catch{
        res.redirect("/register")

    }
    console.log(users)


})