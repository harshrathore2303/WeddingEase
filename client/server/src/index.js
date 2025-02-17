import dotenv from 'dotenv'
import {app} from './app.js'
import connectDB from './db/index.js'

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connection is established on port: ", process.env.PORT);
    });
})
.catch((error) => {
    console.log("Connection Error !! ", error);
})