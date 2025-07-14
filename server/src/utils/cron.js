import cron from "node-cron";
import { Booking } from "../models/booking.models.js";

cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();
    const result = await Booking.deleteMany({ endDate: { $lt: now } });
    console.log(`${result.deletedCount} expired bookings removed`);
  } catch (err) {
    console.error("Failed to delete expired bookings:", err);
  }
});
