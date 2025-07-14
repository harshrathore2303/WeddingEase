import { Booking } from "../models/booking.models.js";
import { Service } from "../models/service.models.js";

const bookService = async (req, res) => {
  try {
    const userId = req.user._id;
    const { serviceId, startDate, endDate, purpose } = req.body;

    if (!serviceId || !startDate || !endDate || !purpose) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const conflict = await Booking.findOne({
      serviceId,
      status:"Confirmed",
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (conflict) {
      return res
        .status(409)
        .json({ message: "Service is already booked for these dates" });
    }
    console.log(service.adminId)

    const booking = await Booking.create({
      serviceId,
      userId: userId,
      adminId: service.adminId,
      startDate,
      endDate,
      purpose,
    });

    console.log(booking);

    return res.status(201).json({ message: "Booking Confirmed" });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const allBooking = await Booking.find({ userId });

    return res.status(200).json({ data: allBooking });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAdminBookings = async (req, res) => {
  try {
    const adminId = req.user._id;
    console.log(await Booking.find({adminId}))
    const bookings = await Booking.find({ adminId })
      .populate("userId", "fullname phone")
      .populate("serviceId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch owned bookings" });
  }
};


const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const adminId = req.user._id;
    const {status} = req.body;

    const exist = await Booking.findOne({_id: bookingId});
    if (!exist){
      return res.status(404).json({message: "This booking does not existed"});
    }

    if (status === "Rejected"){
      await Booking.findOneAndDelete({_id: bookingId});
      return res.status(200).json({message: "Deleted successfully"});
    }

    await Booking.findOneAndUpdate({_id:bookingId}, {status: status});

    return res.status(200).json({message: "Booking status changed"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch owned bookings" });
  }
}

const getConflictedDates = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const bookings = await Booking.find({
      serviceId,
      status:"Confirmed",
    }).select("startDate endDate -_id");
    
    return res.status(200).json({data: bookings});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch booked dates" });
  }
}

export { bookService, getUserBooking, getAdminBookings, updateBooking, getConflictedDates };
