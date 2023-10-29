//=================================================================
const express=require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt=require('bcryptjs');
const bcryptSlt=bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwtSecret='fasefrawsdfgfg';
const cookieParser =require('cookie-parser');
//==================================================================
//import files
const User = require('./models/User.js');
 
//==================================================================
const App =express();
App.use(express.json());
App.use(cookieParser());
//===================================================================
//frontend connection
App.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));
//====================================================================
//database connection
const connectDB = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connected :${con.connection.host}`);

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
connectDB();
//=======================================================================
//routes-Register
App.post('/register',async(req,res)=>{
    const{name,email,password}=req.body;
    try{
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSlt),
         });
         res.json(userDoc);
    } catch (e){
        res.status(422).json(e);
    }   
})
//=========================================================================
//routes-Login
App.post('/login',async (req,res)=>{
    const{email,password}=req.body;
    const userDoc=await User.findOne({email})
    if(userDoc)
    {
        const passOk=bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
            },jwtSecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userDoc);
            });
        }
        else{
            res.status(422).json('pass not ok');
        }
    }else{
        res.json('not found ');

    }
});
//=========================================================================
//routes-Profile
App.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token)
    {
        jwt.verify(token,jwtSecret,{},async(err, userData)=>{
            if(err) throw err;
            const {name,email,_id}=await User.findById(userData.id)
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
})
//=======================================================================
//server
const port = process.env.PORT;
App.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
//=======================================================================