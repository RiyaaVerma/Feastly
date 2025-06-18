import mongoose from "mongoose";

export const connectDB=async()=>{
  await mongoose.connect('mongodb+srv://RiyaVerma:Riya27nov03@cluster0.rnuczv6.mongodb.net/feastly').then(()=>console.log("DB CONNECTED"));
}