import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config();
mongoose.connect(process.env.MONGO).
then(()=> {console.log("connected")}).
catch((err)=>{
    console.log(err);
});
// FPRuWlth5E9cVFtT
const app= express();

app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server is running on port 3000 !");
});

app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes)