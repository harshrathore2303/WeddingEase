import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import "./utils/cron.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connection is established on port: ", process.env.PORT || 5100);
    });
  })
  .catch((error) => {
    console.log("Connection Error !! ", error);
  });
