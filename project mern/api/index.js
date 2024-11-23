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
app.listen(5000 , ()=>{


    console.log('Server listening on Port 5000');
});

app.use("/api/user", userRoutes);
app.use("/api/auth",authRoutes);