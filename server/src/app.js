import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: "https://wedease-client.onrender.com",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import guestRoutes from "./routes/guest.route.js";
import budgetRouter from "./routes/budget.route.js";
import checkListRouter from "./routes/checkList.route.js";
import bookingRouter from "./routes/booking.route.js";
import notificationRouter from "./routes/notification.route.js";
import serviceRouter from "./routes/services.route.js";

// import 
app.use("/api", authRoutes);
app.use("/api", guestRoutes);
app.use("/api", budgetRouter);
app.use("/api", checkListRouter);
app.use("/api", bookingRouter);
app.use("/api", notificationRouter);
app.use("/api", serviceRouter);

export { app };
