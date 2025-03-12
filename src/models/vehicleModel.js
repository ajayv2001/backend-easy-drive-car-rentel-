import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:["two wheeler","four wheeler"],
        required:true
    },
    model:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    availabilityStatus:{
        type:Boolean,
        required:true,
        default:true
    },
},{timestamps:true})

export default mongoose.model("Vehicle", vehicleSchema);