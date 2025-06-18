import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add fooditem

const addFood=async(req,res)=>{
  console.log("please:",req.body);
  console.log("hiiiii:",req.file);

  let image_filename=`${req.file.filename}`;

  const price=Number(req.body.price);

  const food=new foodModel({
    name:req.body.name, 
    description:req.body.description,
    price:price,  
    category:req.body.category,
    image:image_filename
  })
  try{
    const savedfood=await food.save();
    res.json({success:true,message:"Food Added"});
    console.log("food saved successfully:",savedfood);
  }catch(error){
    console.log(error)
    res.status(500).json({success:false,message:"Error",error:error.message});
  }
}

//all food list
const  listFood= async(req,res)=>{
  try {
    const foods=await foodModel.find({});
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

//remove food item
const removeFood=async(req,res)=>{
try {
  const food=await foodModel.findById(req.body.id);
  fs.unlink(`uploads/${food.image}`,()=>{})

  await foodModel.findByIdAndDelete(req.body.id);
  res.json({success:true,message:"Food Removed"})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}

export {addFood,listFood,removeFood}