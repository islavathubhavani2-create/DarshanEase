const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// ===========================
// Book Darshan Ticket
// ===========================
const bookTicket = async (req, res) => {

    try {

        const {
    temple,
    slot,
    numberOfPersons
} = req.body;

const user = req.user._id;

        // Find Slot
        const slotData = await Slot.findById(slot);

        if (!slotData) {
            return res.status(404).json({
                message: "Slot not found"
            });
        }

        // Check Seat Availability
        const remainingSeats =
            slotData.availableSeats - slotData.bookedSeats;

        if (remainingSeats < numberOfPersons) {

            return res.status(400).json({
                message: "Not enough seats available"
            });

        }

        // Calculate Total Amount
        const totalAmount =
            slotData.price * numberOfPersons;

        // Create Booking
        const booking = await Booking.create({

            user,
            temple,
            slot,
            numberOfPersons,
            totalAmount

        });

        // Update booked seats
        slotData.bookedSeats += numberOfPersons;

        await slotData.save();

        res.status(201).json({

            message: "Booking Successful",

            booking

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===========================
// View All Bookings
// ===========================
const getBookings = async (req, res) => {

    try {

        let bookings;

        if (req.user.role === "ADMIN") {

            bookings = await Booking.find()

                .populate("user")

                .populate("temple")

                .populate("slot");

        }

        else {

            bookings = await Booking.find({

                user: req.user._id

            })

                .populate("user")

                .populate("temple")

                .populate("slot");

        }

        res.status(200).json(bookings);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// ===========================
// Cancel Booking
// ===========================

const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({
                message: "Booking not found"
            });

        }

        if (booking.bookingStatus === "CANCELLED") {

            return res.status(400).json({
                message: "Booking already cancelled"
            });

        }

        const slot = await Slot.findById(booking.slot);

        slot.bookedSeats -= booking.numberOfPersons;

        await slot.save();

        booking.bookingStatus = "CANCELLED";

        await booking.save();

        res.status(200).json({

            message: "Booking Cancelled Successfully",

            booking

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
module.exports = {

    bookTicket,

    getBookings,

    cancelBooking

};