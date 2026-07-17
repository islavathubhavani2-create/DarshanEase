const express = require("express");

const {

    bookTicket,

    getBookings,

    cancelBooking

} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Logged-in User
router.post("/", protect, bookTicket);

// Logged-in User
router.get("/", protect, getBookings);

// Logged-in User
router.put("/cancel/:id", protect, cancelBooking);

module.exports = router;