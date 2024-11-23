import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { error } from 'console';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO)
.then(()=> {

console.log("Connect to the MONOGODB")

})
.catch((err) =>{

    console.log(err);
})
app.listen(5000 , ()=>{


    console.log('Server listening on Port 4000');
});

app.use("/api/user", userRoutes);