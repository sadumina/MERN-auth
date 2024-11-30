import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { error } from 'console';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB)
.then(()=> {

console.log("Connect to the MONOGODB");

})
.catch((err) =>{

    console.log(err);
})
app.listen(3000 , ()=>{


    console.log('Server listening on Port 3000');
});

app.use("/api/user", userRoutes);
app.use("/api/auth",authRoutes);

app.use((err,req,res,next) => {

 const statusCode = err.statusCode || 500;
 const message = err.message || 'Internel Server Error';
 return res.status(statusCode).json({
 success:false,
 error:message,
 statusCode:statusCode,

 });

});