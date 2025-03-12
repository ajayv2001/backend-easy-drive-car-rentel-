import {config} from "dotenv"
import mongose from "mongoose"

config()

const dbURI = process.env.MONGO_URI;

const connectToDB = async ()=>{
    try {
        await mongose.connect(dbURI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToDB;
