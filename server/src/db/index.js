import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js'

dotenv.config({
    path: './.env'
})

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}`);
        console.log("Connection is Successfull!!!!");
    } catch (error) {
        console.error("Connection Error:::", error);
        process.exit(1);
    }
}

export default connectDB;