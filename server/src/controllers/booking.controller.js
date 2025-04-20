import { Booking } from "../models/booking.models.js";

const bookService = async (req, res) => {
    try {
        const user = req.user;
        const {serviceId, ownerId,startDate, endDate, purpose} = req.body;

        const conflicts = await Booking.findOne({
            serviceId: serviceId,
            $or: [
                {startDate: {$lte: endDate}},
                {endDate: {$gte: startDate}}
            ]
        })

        if (conflicts){
            return res.status(404).json({message: "This date is already booked"});
        }

        const booking = await Booking.create({
            serviceId,
            ownerId,
            userId: user._id,
            startDate,
            endDate,
            purpose
        })

        return res.status(201).json({message: "Booking Confirmed", booking});
    } catch (error) {
        console.log("Error:::", error);
    }
}

const getBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const allBookings = await Booking.find({
            $or: [{userId}]
        })
        if (allBookings.length == 0){
            return res.status(404).json({message: "No Bookings"});
        }

        return res.status(200).json({message: "Success", allBookings});
    } catch (error) {
        
    }
}

export {bookService, getBookings};